const HYPERBOOSTERS = {
    water: {
        eff() {
            return E(HYPERBOOSTERS.water.amount.add(2)).div(HYPERBOOSTERS.water.amount.add(4))
        },
        buy() {
            if (PLAYER.water.value.gte(HYPERBOOSTERS.water.cost())) {
                PLAYER.water.value = PLAYER.water.value.sub(HYPERBOOSTERS.water.cost())
                HYPERBOOSTERS.water.amount = HYPERBOOSTERS.water.amount.add(1)

                TMP.water.update()

                TMP.hyperboosters.updateWaterEff()
                TMP.hyperboosters.updateWaterCost()
            }
        },
        cost() {
            return E(100).pow(2).pow(E(2).pow(HYPERBOOSTERS.water.amount.sub(1)))
        },
        amount: E(0),
    },

    snowflakes: {
        buy() {
            if (PLAYER.snowflakes.amount.gte(HYPERBOOSTERS.snowflakes.cost())) {
                PLAYER.snowflakes.amount = PLAYER.snowflakes.amount.sub(HYPERBOOSTERS.snowflakes.cost())
                HYPERBOOSTERS.snowflakes.amount = HYPERBOOSTERS.snowflakes.amount.add(1)

                TMP.snowflakes.update()
                TMP.snowflakes.updateCost()
                TMP.snowflakes.updateBoost()

                TMP.hyperboosters.updateSFEff()
                TMP.hyperboosters.updateSFCost()
            }
        },
        cost() {
            return E(10).pow(HYPERBOOSTERS.snowflakes.amount.add(1))
        },
        amount: E(0),
    },
}

const UPGRADES = {
    '1': {
        unlocked() { return CHALS[1].completions > 0},
        eff() {
           return E(2).pow(E(1).add(CHALS[1].completions).add(CHALS[2].completions))
        },
        bought: 0,
        cost() {return E(5)},
        buy() {
            if (PLAYER.water.value.gte(UPGRADES[1].cost())) {
                PLAYER.water.value = PLAYER.water.value.sub(UPGRADES[1].cost())
                UPGRADES[1].bought = 1
            }
        },
    },
}

let hasUpgrade = (upg) => UPGRADES[upg].bought == 1