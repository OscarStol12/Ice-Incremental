function E(x) {return ExpantaNum(x)}

const PLAYER = {
    ice: {
        value: E(0),
        gain() {
            let x = E(1)

            if (PLAYER.water.value.gte(1)) x = x.add(E(1).add(PLAYER.water.value.pow(0.5)))
            if (PLAYER.snowflakes.amount.gte(2)) x = x.mul(PLAYER.snowflakes.amount.pow(PLAYER.snowflakes.exponent))
            return x
        },
        hypervolume() {return PLAYER.ice.value.pow(4)},
    },

    water: {
        reset(boosts = true) {
            if (PLAYER.ice.value.gte(100) && boosts) {
                PLAYER.water.value = PLAYER.water.value.add(PLAYER.water.gain()) 
                PLAYER.ice.value = E(0)
            } else if (!boosts) {
                PLAYER.ice.value = E(0)
            }

            TMP.water.update()
            TMP.ice.update()
            TMP.ice.updateHyper()
            TMP.water.updateGain()
        },
        gain() {
            let x = PLAYER.ice.value
            x = x.div(100)
            return x.floor()
        },
        value: E(0),
    },

    snowflakes: {
        amount: E(1),
        exponent: E(1),
        cost() {return E('1e4').pow(PLAYER.snowflakes.amount.add(1))},
        buy() {
            if (PLAYER.ice.hypervolume().gte(PLAYER.snowflakes.cost())) {
                PLAYER.snowflakes.amount = PLAYER.snowflakes.amount.add(1)
                TMP.snowflakes.update()
                TMP.snowflakes.updateBoost()
                TMP.snowflakes.updateCost()
            }
        },
        boost() {return PLAYER.snowflakes.amount.pow(PLAYER.snowflakes.exponent)},
    },
}

function increment() {
    PLAYER.ice.value = PLAYER.ice.value.add(PLAYER.ice.gain())
    TMP.ice.update()
    TMP.ice.updateHyper()
    TMP.water.updateGain()
}
