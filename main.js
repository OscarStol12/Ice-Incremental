const STORAGE = {
    ice: Number(localStorage.getItem("Ice")),
    water: Number(localStorage.getItem("Water")),
    hypervolume: Number(localStorage.getItem("Hypervolume")),
    snowflakes: Number(localStorage.getItem("Snowflakes")) || 1,

    upgrades: {

    },
}

const UPGRADES = {

}

const PLAYER = {
    ice: {
        gain() {
            let x = 1

            if (PLAYER.water.value > 0) {
                let watergainformula = 1+(Math.pow(PLAYER.water.value,0.5))
                x += watergainformula
            }

            if (PLAYER.snowflakes.amount > 0) {
                x *= Math.pow(PLAYER.snowflakes.amount,2)
            }

            PLAYER.ice.hypervolume.value = PLAYER.ice.hypervolume.get()
            PLAYER.ice.hypervolume.update()
            return x
        },

        update() {
            document.getElementById("ice-counter").innerText = `Ice Count: ${Math.trunc(PLAYER.ice.value)}`
            PLAYER.water.update.gainOnReset()
        },

        hypervolume: {
            get() {
                return Math.pow(PLAYER.ice.value,4)
            },

            update() {
                document.getElementById("hypervolume").innerText = `Ice Hypervolume: ${Math.trunc(PLAYER.ice.hypervolume.value)} (Ice^4)`
            },

            value: 0
        },

        value: 0,
    }, 

    water: {
        gain() {
            let x = 0

            let baseformula = Math.floor(PLAYER.ice.value/100)
            x += baseformula

            return x
        },

        reset() {
            if (PLAYER.ice.value >= 100) {
                PLAYER.water.value += PLAYER.water.gain()
                PLAYER.ice.value = 0
                PLAYER.ice.update()
                PLAYER.water.update.value()
            }
        },

        update: {
            gainOnReset() {
                document.getElementById("water-reset").innerText = `Reset your ice for ${PLAYER.water.gain()} Water`
            },

            value() {
                document.getElementById("water-counter").innerText = `Water Count: ${PLAYER.water.value}`
            }
        },

        value: 0,
    },

    snowflakes: {
        buy() {
            let cost = PLAYER.snowflakes.calCost()

            if (PLAYER.ice.hypervolume.value >= cost) {
                PLAYER.snowflakes.amount++
            }

            PLAYER.snowflakes.update()
        },

        calCost() {
            let cost = Math.pow(100,4)

            if (PLAYER.snowflakes.amount > 0) {
                cost *= (Math.pow(1e4,(PLAYER.snowflakes.amount-1)))
            }

            return cost
        },

        boost() {
            return Math.pow(PLAYER.snowflakes.amount,2)
        },

        update() {
            document.getElementById("snowflake").innerText = `You currently have ${PLAYER.snowflakes.amount} Snowflakes`
            document.getElementById("sf-boosts").innerText = `Your snowflakes are giving you a ${PLAYER.snowflakes.boost()}x boost to Ice gain`
            document.getElementById("sf-buyer").innerText = `Buy one snowflake for ${PLAYER.snowflakes.calCost()} Ice Hypervolume`
        },
 
        amount: 1
    }
}

function wipe() {
    PLAYER.water.value = 0
    PLAYER.ice.value = 0
    PLAYER.snowflakes.amount = 1
   
    localStorage.setItem("Snowflakes", 1)
    localStorage.setItem("Water",0)
    localStorage.setItem("Ice",0)

    PLAYER.ice.update()
    PLAYER.water.update.value()
    PLAYER.ice.hypervolume.update()
}

function saveStats() {
    localStorage.setItem("Hypervolume",PLAYER.ice.hypervolume.value)
    localStorage.setItem("Snowflakes",PLAYER.snowflakes.amount)
    localStorage.setItem("Water",PLAYER.water.value)
    localStorage.setItem("Ice", PLAYER.ice.value)
}

function loadStats() {
    PLAYER.ice.value = STORAGE.ice
    PLAYER.water.value = STORAGE.water
    PLAYER.snowflakes.amount = STORAGE.snowflakes
    PLAYER.ice.update()
    PLAYER.water.update.value()
    PLAYER.snowflakes.update()
}

function increment() {
    PLAYER.ice.value += PLAYER.ice.gain()
    PLAYER.ice.update()
}
