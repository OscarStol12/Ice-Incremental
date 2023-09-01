const TMP = {
    autosaveInterval: 30,
    ice: {
        update() {
            document.getElementById("ice-counter").innerHTML = FORMAT_MODES.normal(PLAYER.ice.value)
        },

        updateHyper() {
            document.getElementById("hypervolume").innerHTML = FORMAT_MODES.hypervol(PLAYER.ice.hypervolume())
        },
    },

    water: {
        update() {
            document.getElementById("water-counter").innerHTML = FORMAT_MODES.normal(PLAYER.water.value)
        },

        updateGain() {
            document.getElementById("water-gain").innerHTML = FORMAT_MODES.normal(PLAYER.water.gain())
        },
    },

    snowflakes: {
        update() {
            document.getElementById("snowflake").innerHTML = FORMAT_MODES.normal(PLAYER.snowflakes.amount)
        },

        updateBoost() {
            document.getElementById("sf-boosts").innerHTML = FORMAT_MODES.normal(PLAYER.snowflakes.boost())
        },

        updateCost() {
            document.getElementById("sf-cost").innerHTML = FORMAT_MODES.hypervol(PLAYER.snowflakes.cost())
        },
    },

    upgrades: {
        updateU1Purchased() {
            if (!UPGRADES[1].unlocked()) document.getElementById("upg-1-btn").innerHTML = `Locked`
            else if (hasUpgrade(1)) document.getElementById("upg-1-btn").innerHTML = `Bought`
            else document.getElementById("upg-1-btn").innerHTML = `Buy`
        },

        updateU1Eff() {
            document.getElementById("upg-1-eff").innerHTML = FORMAT_MODES.normal(2) // for now, no capability of improving the effect has been added
        },
    },

    hyperboosters: {
        updateSFEff() {
            document.getElementById("sf-hyp-eff").innerHTML = FORMAT_MODES.normal(HYPERBOOSTERS.snowflakes.amount)
        },

        updateSFCost() {
            document.getElementById("sf-hyp-cost").innerHTML = FORMAT_MODES.normal(HYPERBOOSTERS.snowflakes.cost())
        },

        updateWaterEff() {
            document.getElementById("water-hyp-eff").innerHTML = FORMAT_MODES.normal(HYPERBOOSTERS.water.eff())
        },

        updateWaterCost() {
            document.getElementById("water-hyp-cost").innerHTML = FORMAT_MODES.normal(HYPERBOOSTERS.water.cost())
        },
    },
}

function loadAll() {
    TMP.ice.update()
    TMP.ice.updateHyper()
    TMP.water.update()
    TMP.water.updateGain()
    TMP.snowflakes.update()
    TMP.snowflakes.updateBoost()
    TMP.snowflakes.updateCost()
    TMP.upgrades.updateU1Purchased()
    TMP.upgrades.updateU1Eff()
    TMP.hyperboosters.updateSFEff()
    TMP.hyperboosters.updateSFCost()
    TMP.hyperboosters.updateWaterEff()
    TMP.hyperboosters.updateWaterCost()

    loadTab()
}

function E_max(v1, v2) {
    if (v1.gte(v2)) return v1
    else return v2
}

function E_min(v1, v2) {
    if (v1.gte(v2)) return v2
    else return v1
}

function loadTab(page = 'main') {
    document.getElementById("loading").style.visibility = 'hidden'
    document.getElementById("leftsheet").style.visibility = 'visible'

    document.getElementById("settings").style.visibility = 'hidden'
    document.getElementById("main").style.visibility = 'hidden'
    document.getElementById("chals").style.visibility = 'hidden'
    document.getElementById("upgrades").style.visibility = 'hidden'
    
    TABS.main.loadSubTab()
    TABS.upgrades.loadSubTab()

    switch (page) {
        case 'main':
            document.getElementById("main").style.visibility = 'visible'
            TABS.main.loadSubTab('ice')
            break
        case 'settings':
            document.getElementById("settings").style.visibility = 'visible'
            break
        case 'chals':
            document.getElementById("chals").style.visibility = 'visible'
            updateChallengeHTML()
            break
        case 'upgs':
            document.getElementById("upgrades").style.visibility = 'visible'
            TABS.upgrades.loadSubTab('upgs')
            break

    }
}

const TABS = {
    main: {
        loadSubTab(page = 'unload') {
            document.getElementById("ice-sbtb").style.visibility = 'hidden'
            document.getElementById("sf-sbtb").style.visibility = 'hidden'

            switch (page) {
                case 'ice':
                    document.getElementById("ice-sbtb").style.visibility = 'visible'
                    break
                case 'snowflakes':
                    document.getElementById("sf-sbtb").style.visibility = 'visible'
                    break
            }
        },
    },

    upgrades: {
        loadSubTab(page = 'unload') {
            document.getElementById("upgs-sbtb").style.visibility = 'hidden'
            document.getElementById("hyper-sbtb").style.visibility = 'hidden'

            switch (page) {
                case 'upgs':
                    document.getElementById("upgs-sbtb").style.visibility = 'visible'
                    break
                case 'hyper':
                    document.getElementById("hyper-sbtb").style.visibility = 'visible'
                    break
            }
        },
    },
}