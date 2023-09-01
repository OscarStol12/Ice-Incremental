const CHALS = {
    selected: 0,
    '1': {
        goal() {
            switch (CHALS[1].completions) {
                case 0:
                    return E(1000)
            }
        },
        completions: 0,
        inChallenge: 0, // 0 = False, 1 = True
    },

    '2': {
        eff() {

        },
        goal() {
            return EINF
        },
        completions: E(0),
        inChallenge: 0,
    },
}

function enterChallenge(chal = 0) {
    if (PLAYER.ice.value.gte(CHALS[chal].goal()) && inChallenge(chal)) {
        CHALS[chal].completions++;

        if (chal == 1) TMP.upgrades.updateU1Purchased()
    }
    toggleChallenge(chal)
    updateChallengeHTML(chal)
    switch (chal) {
        case 1:
            PLAYER.water.reset(false)
            break
    }
}

function inChallenge(chal) {return CHALS[chal].inChallenge == 1}

function toggleChallenge(chal) {
    if (inChallenge(chal)) CHALS[chal].inChallenge = 0
    else CHALS[chal].inChallenge = 1
}

function updateChallengeHTML(toDisplay = 0) {
    CHALS.selected = toDisplay
    let text = ``
    switch (toDisplay) {
        case 1:
            text += `Challenge 1 - Ice Melting`
            text += `<br> ${CHALS[1].completions} / 5 Completions`
            switch (CHALS[1].completions) {
                case 0:
                    text += `<br> For every tick, your ice is halved.`
                    text += `<br> Goal: 1,000 Ice`
                    text += `<br> Reward: Unlock new Upgrades`
                    break
                case 1:
                    text += `<br> Your ice is divided by the amount of ticks spent in this challenge each tick.`
                    text += `<br> This is not implemented yet (coming in 0.0.3α).`
                    break
                case 2:
                    break
                case 3:
                    break
                case 4:
                    break
                case 5:
                    text += `<br> You have completed this challenge.`
                    break
            }
            text += `<br> Entering this Challenge will force a water reset for no benefits.`
            break
        case 2:
            text += `Challenge 2 - Vaporizing`
            text += `<br> Just kidding, this hasn't been implemented either`
            text += `<br> Also likely coming in 0.0.3α`
            break
    }

    document.getElementById("chal-txt").innerHTML = text

    try {
        if (CHALS.selected == 0) document.getElementById("chal-btn").style.visibility = 'hidden'
        else document.getElementById("chal-btn").style.visibility = 'inherit' 

        if (inChallenge(CHALS.selected)) document.getElementById("chal-btn").innerHTML = `Exit`
        else document.getElementById("chal-btn").innerHTML = `Enter`
    } catch(TypeError) {
        document.getElementById("chal-txt").innerHTML = `You have not entered a challenge.`
    }
}