import * as me from './mathieu_eigen.js';
import * as mc from './mathieu_coeff.js';


function ce(x, n, q) {

    const a = me.a_eigen(n, q);
    const maxNumberOfTerms = Math.max(n, 30);
    const tol = 1e-10;
    var coeff = [];
    const oe = n % 2;

    if (oe == 0) {

        coeff = mc.a_even_coeff(a, q, maxNumberOfTerms);

    } else if (oe == 1) {

        coeff = mc.a_odd_coeff(a, q, maxNumberOfTerms);

    } else {

        return "n needs to be a positive integer";

    }

    if (typeof (x) === "number") {

        var val = 0;

        for (var i = 0; i < maxNumberOfTerms; i++) {

            if (Math.abs(coeff[i]) > tol) {

                val += coeff[i] * Math.cos((2 * i + oe) * x);

            }

        }

        return val;

    } else {

        var vals = [];
        var val;

        x.forEach((x_val) => {

            val = 0;

            for (var i = 0; i < maxNumberOfTerms; i++) {

                if (Math.abs(coeff[i]) > tol) {

                    val += coeff[i] * Math.cos((2 * i + oe) * x_val);

                }

            }

            vals.push(val);

        });

        return vals;

    }

}

function se(x, n, q) {

    const b = me.b_eigen(n, q);
    const maxNumberOfTerms = Math.max(n, 30);
    const tol = 1e-10;
    var coeff = [];
    const oe = n % 2;

    if (oe == 0) {

        coeff = mc.b_even_coeff(b, q, maxNumberOfTerms);

    } else if (oe == 1) {

        coeff = mc.b_odd_coeff(b, q, maxNumberOfTerms);

    } else {

        return "n needs to be a positive integer";

    }

    if (typeof (x) === "number") {

        var val = 0;

        for (var i = 1; i <= maxNumberOfTerms; i++) {

            if (Math.abs(coeff[i - 1]) > tol) {

                val += coeff[i - 1] * Math.sin((2 * i - oe) * x);

            }

        }

        return val;

    } else {

        var vals = [];
        var val;

        x.forEach((x_val) => {

            val = 0;

            for (var i = 1; i <= maxNumberOfTerms; i++) {

                if (Math.abs(coeff[i - 1]) > tol) {

                    val += coeff[i - 1] * Math.sin((2 * i - oe) * x_val);

                }

            }

            vals.push(val);

        });

        return vals;

    }

}

function cePrime(x, n, q) {

    const a = me.a_eigen(n, q);
    const maxNumberOfTerms = Math.max(n, 30);
    const tol = 1e-10;
    var coeff = [];
    const oe = n % 2;

    if (oe == 0) {

        coeff = mc.a_even_coeff(a, q, maxNumberOfTerms);

    } else if (oe == 1) {

        coeff = mc.a_odd_coeff(a, q, maxNumberOfTerms);

    } else {

        return "n needs to be a positive integer";

    }

    if (typeof (x) === "number") {

        var val = 0;

        for (var i = 0; i < maxNumberOfTerms; i++) {

            if (Math.abs(coeff[i]) > tol) {

                val -= (2 * i + oe) * coeff[i] * Math.sin((2 * i + oe) * x);

            }

        }

        return val;

    } else {

        var vals = [];
        var val;

        x.forEach((x_val) => {

            val = 0;

            for (var i = 0; i < maxNumberOfTerms; i++) {

                if (Math.abs(coeff[i]) > tol) {

                    val -= (2 * i + oe) * coeff[i] * Math.sin((2 * i + oe) * x_val);

                }

            }

            vals.push(val);

        });

        return vals;

    }

}

function sePrime(x, n, q) {

    const b = me.b_eigen(n, q);
    const maxNumberOfTerms = Math.max(n, 30);
    const tol = 1e-10;
    var coeff = [];
    const oe = n % 2;

    if (oe == 0) {

        coeff = mc.b_even_coeff(b, q, maxNumberOfTerms);

    } else if (oe == 1) {

        coeff = mc.b_odd_coeff(b, q, maxNumberOfTerms);

    } else {

        return "n needs to be a positive integer";

    }

    if (typeof (x) === "number") {

        var val = 0;

        for (var i = 1; i <= maxNumberOfTerms; i++) {

            if (Math.abs(coeff[i - 1]) > tol) {

                val += (2 * i - oe) * coeff[i - 1] * Math.cos((2 * i - oe) * x);

            }

        }

        return val;

    } else {

        var vals = [];
        var val;

        x.forEach((x_val) => {

            val = 0;

            for (var i = 1; i <= maxNumberOfTerms; i++) {

                if (Math.abs(coeff[i - 1]) > tol) {

                    val += (2 * i - oe) * coeff[i - 1] * Math.cos((2 * i - oe) * x_val);

                }

            }

            vals.push(val);

        });

        return vals;

    }

}

export { ce, se, cePrime, sePrime };
