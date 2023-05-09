const STORAGE = {
    ice: Number(localStorage.getItem("Ice")),
    water: Number(localStorage.getItem("Water")),
    upgrades: {

    },

    booleans: {
        water: Boolean(localStorage.getItem("waterBool")),
    }
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

            return x
        },

        update() {
            document.getElementById("ice-counter").innerText = `Ice Count: ${PLAYER.ice.value}`
            PLAYER.water.update.gainOnReset()
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
                PLAYER.water.obtained = true
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
        
    }
}

function wipe() {
    PLAYER.water.value = 0
    PLAYER.ice.value = 0
   
    localStorage.setItem("Water",0)
    localStorage.setItem("Ice",0)

    PLAYER.ice.update()
    PLAYER.water.update.value()
}

function saveStats() {
    localStorage.setItem("waterBool",PLAYER.water.obtained)
    localStorage.setItem("Water",PLAYER.water.value)
    localStorage.setItem("Ice", PLAYER.ice.value)
}

function loadStats() {
    PLAYER.ice.value = STORAGE.ice
    PLAYER.water.value = STORAGE.water
    PLAYER.water.obtained = STORAGE.booleans.water
    PLAYER.ice.update()
    PLAYER.water.update.value()
}

function increment() {
    PLAYER.ice.value += PLAYER.ice.gain()
    PLAYER.ice.update()
}