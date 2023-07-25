const TMP = {
    ice: {
        update() {
            document.getElementById("ice-counter").innerHTML = PLAYER.ice.value.floor().toString()
        },

        updateHyper() {
            document.getElementById("hypervolume").innerHTML = PLAYER.ice.hypervolume().floor().toString()
        },
    },

    water: {
        update() {
            document.getElementById("water-counter").innerHTML = PLAYER.water.value.floor().toString()
        },

        updateGain() {
            document.getElementById("water-gain").innerHTML = PLAYER.water.gain().floor().toString()
        },
    },

    snowflakes: {
        update() {
            document.getElementById("snowflake").innerHTML = PLAYER.snowflakes.amount.floor().toString()
        },

        updateBoost() {
            document.getElementById("sf-boosts").innerHTML = PLAYER.snowflakes.boost().floor().toString()
        },

        updateCost() {
            document.getElementById("sf-cost").innerHTML = PLAYER.snowflakes.cost().floor().toString()
        },
    },
}

function max(v1, v2) {
    if (v1.gte(v2)) return v1
    else return v2
}