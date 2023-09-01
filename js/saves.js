const STORAGE = {
    ice: E(localStorage.getItem("ice")),
    water: E(localStorage.getItem("water")),
    snowflakes: E_max(E(localStorage.getItem("snowflakes")), E(1)),
    chals: {
        '1': Number(localStorage.getItem("c1-comps")),
        '2': E(localStorage.getItem("c2-comps")),
    },
    upgs: {
        '1': Number(localStorage.getItem("u1-bought")),
    },
    hyperboosters: {
        snowflake: E(localStorage.getItem("hb-sf")),
        water: E(localStorage.getItem("hb-wtr")),
    },
}

function loadStats() {
    PLAYER.ice.value = STORAGE.ice
    PLAYER.water.value = STORAGE.water
    PLAYER.snowflakes.amount = STORAGE.snowflakes

    CHALS[1].completions = STORAGE.chals[1]
    CHALS[2].completions = STORAGE.chals[2]

    UPGRADES[1].bought = STORAGE.upgs[1]

    HYPERBOOSTERS.snowflakes.amount = STORAGE.hyperboosters.snowflake
    HYPERBOOSTERS.water.amount = STORAGE.hyperboosters.water

    loadAll()

    console.log("Loaded stats!")
    // autoSave() Disabled
}

function saveStats(reset = false, auto = false) {
    localStorage.setItem("ice", PLAYER.ice.value.toString())
    localStorage.setItem("water",PLAYER.water.value.toString())
    localStorage.setItem("snowflakes", PLAYER.snowflakes.amount.toString())
    localStorage.setItem("c1-comps", CHALS[1].completions)
    localStorage.setItem("c2-comps", CHALS[2].completions.toString())
    localStorage.setItem("u1-bought", UPGRADES[1].bought)
    localStorage.setItem("hb-sf", HYPERBOOSTERS.snowflakes.amount.toString())
    localStorage.setItem("hb-wtr", HYPERBOOSTERS.water.amount.toString())

    if (!reset && !auto) console.log("Saved stats!")
    if (auto) console.log("Autosaved stats!")
}

function wipe() {
    PLAYER.ice.value = E(0)
    PLAYER.water.value = E(0)
    PLAYER.snowflakes.amount = E(1)

    CHALS[1].completions = 0
    CHALS[2].completions = E(0)

    UPGRADES[1].bought = 0

    HYPERBOOSTERS.snowflakes.amount = E(0)
    HYPERBOOSTERS.water.amount = E(0)

    saveStats(true, false)
    loadAll()

    console.log("Stats wiped!")
}

// For some reason the amount of times this runs increases exponentially, disabled until I figure out the root cause

/*function autoSave() {
    setInterval(() => {
        saveStats(false, true)
        autoSave()
    }, 1000 * TMP.autosaveInterval);
}*/