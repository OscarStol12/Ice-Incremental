const STORAGE = {
    ice: E(localStorage.getItem("ice")),
    water: E(localStorage.getItem("water")),
    snowflakes: {
        value: max(E(localStorage.getItem("snowflakes")), E(1)),
        exponent: max(E(localStorage.getItem("sf-exponent")), E(1)),
    },
}

function loadStats(reset = false) {
    PLAYER.ice.value = STORAGE.ice
    PLAYER.water.value = STORAGE.water
    PLAYER.snowflakes.amount = STORAGE.snowflakes.value
    PLAYER.snowflakes.exponent = STORAGE.snowflakes.exponent

    TMP.ice.update()
    TMP.ice.updateHyper()
    TMP.water.update()
    TMP.water.update()
    TMP.snowflakes.update()
    TMP.snowflakes.updateBoost()
    TMP.snowflakes.updateCost()

    if (!reset) console.log("Loaded stats!")
}

function saveStats(reset = false, auto = false) {
    localStorage.setItem("ice", PLAYER.ice.value.toString())
    localStorage.setItem("water",PLAYER.water.value.toString())
    localStorage.setItem("snowflakes", PLAYER.snowflakes.amount.toString())
    localStorage.setItem("sf-exponent", PLAYER.snowflakes.exponent.toString())

    if (!reset && !auto) console.log("Saved stats!")
    if (auto) console.log("Autosaved stats!")
}

function wipe() {
    PLAYER.ice.value = E(0)
    PLAYER.water.value = E(0)
    PLAYER.snowflakes.amount = E(1)
    PLAYER.snowflakes.exponent = E(1)

    saveStats(reset = true)
    loadStats(true)

    console.log("Stats wiped!")
}

function autoSave() {
    setInterval(() => {
        saveStats(auto = true)
    }, 30000);
}
autoSave()