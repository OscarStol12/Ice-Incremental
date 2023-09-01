function E(x) {return ExpantaNum(x)}
function D(x) {return Date.UTC(x)}
function TN() {return Date.now()}

const EINF = E(Infinity)

const FORMAT_MODES = {
    normal(n) {
        n = E(n)
        let str = ``

        if (n.gte('10^^^6') ) {
            str = n.toHyperE()
        } else if (n.gte('ee1000000')) {
            let j = FORMAT_MODES.normal(n.slog(10))
            str = 'F' + j
        } else if (n.gte('e1000000')) {
            let k = FORMAT_MODES.normal(n.log10())
            str = 'e' + k
        } else if (n.gte(1000000)) {
            let j = n.div(E('10').pow(n.log10().floor())).toString().slice(0, 6)
            n = n.log10().floor()
            str = j + 'e' + n
        } else if (n.lt(10000) && !n.isint()) {
            str = n.toString().slice(0, 6)
        } else {
            str = n.floor().toString()
        }
    
        return str
    },

    hypervol(n) {
        n = E(n)
        let si_prefix = ``

        if (n.gte('1e132')) {
            let l = n.logBase('1e12').floor()
            n = n.div(E('1e12').pow(l))
            si_prefix = ` <sub>${FORMAT_MODES.normal(l)}</sub>m<sup>4</sup>`
        } else if (n.gte('1e120')) {
            n = n.div('1e120')
            si_prefix = ` Qm<sup>4</sup>`
        } else if (n.gte('1e108')) {
            n = n.div('1e108')
            si_prefix = ` Rm<sup>4</sup>`
        } else if (n.gte('1e96')) {
            n = n.div('1e96')
            si_prefix = ` Ym<sup>4</sup>`
        } else if (n.gte('1e84')) {
            n = n.div('1e84')
            si_prefix = ` Zm<sup>4</sup>`
        } else if (n.gte('1e72')) {
            n = n.div('1e72')
            si_prefix = ` Em<sup>4</sup>`
        } else if (n.gte('1e60')) {
            n = n.div('1e60')
            si_prefix = ` Pm<sup>4</sup>`
        } else if (n.gte('1e48')) {
            n = n.div('1e48')
            si_prefix = ` Tm<sup>4</sup>`
        } else if (n.gte('1e36')) {
            n = n.div('1e36')
            si_prefix = ` Gm<sup>4</sup>`
        } else if (n.gte('1e24')) {
            n = n.div('1e24')
            si_prefix = ` Mm<sup>4</sup>`
        } else if (n.gte('1e12')) {
            n = n.div('1e12')
            si_prefix = ` km<sup>4</sup>`
        } else {
            si_prefix = ` m<sup>4</sup>`
        }

        let str = FORMAT_MODES.normal(n)
        return str + si_prefix
    },

    // experimental, could be used later down the line
    nd_vol(dim, n) {
        dim = E(dim).floor(), n = E(n)
        if (dim.eq(4)) return FORMAT_MODES.hypervol(n)
        else {
            const DIST_PER_UNIT = E('1000').pow(dim)
            let si_prefix = ``
            if (n.gte(DIST_PER_UNIT.pow(11))) {
                let l = n.logBase(DIST_PER_UNIT).floor()
                n = n.div(DIST_PER_UNIT.pow(l))
                si_prefix = ` <sub>${FORMAT_MODES.normal(l)}</sub>m<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT.pow(10))) {
                n = n.div(DIST_PER_UNIT.pow(10))
                si_prefix = ` Qm<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT.pow(9))) {
                n = n.div(DIST_PER_UNIT.pow(9))
                si_prefix = ` Rm<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT.pow(8))) {
                n = n.div(DIST_PER_UNIT.pow(8))
                si_prefix = ` Ym<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT.pow(7))) {
                n = n.div(DIST_PER_UNIT.pow(7))
                si_prefix = ` Zm<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT.pow(6))) {
                n = n.div(DIST_PER_UNIT.pow(6))
                si_prefix = ` Em<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT.pow(5))) {
                n = n.div(DIST_PER_UNIT.pow(5))
                si_prefix = ` Pm<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT.pow(4))) {
                n = n.div(DIST_PER_UNIT.pow(4))
                si_prefix = ` Tm<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT.pow(3))) {
                n = n.div(DIST_PER_UNIT.pow(3))
                si_prefix = ` Gm<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT.pow(2))) {
                n = n.div(DIST_PER_UNIT.pow(2))
                si_prefix = ` Mm<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else if (n.gte(DIST_PER_UNIT)) {
                n = n.div(DIST_PER_UNIT)
                si_prefix = ` km<sup>${FORMAT_MODES.normal(dim)}</sup>`
            } else {
                si_prefix = ` m<sup>${FORMAT_MODES.normal(dim)}</sup>`
            }

            let str = FORMAT_MODES.normal(n)
            return str + si_prefix
        } 
    }
}