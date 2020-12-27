import * as me from "./mathieu_eigen.js";
import * as mc from "./mathieu_coeff.js";
import * as mf from "./mathieu_funct.js";
import * as be from "./bessel.js";

// uses sinh formulas!!!
// https://dlmf.nist.gov/28.23
// get multilicative factor!!!
// calculate derivatives

function cem(x, n, q) {

    const a = me.a_eigen(n, q);
    const maxNumberOfTerms = Math.max(n, 30);
    const tol = 1e-10;
    var coeff = [];

    if (n % 2 == 0) {

        coeff = mc.a_even_coeff(a, q, maxNumberOfTerms);

    } else if (n % 2 == 1) {

        coeff = mc.a_odd_coeff(a, q, maxNumberOfTerms);

    } else {

        return "n needs to be a positive integer";

    }

    if (typeof (x) === "number") {

        var val = 0;
        const besselCoefficients = be.besselj_list(Math.max(2 * maxNumberOfTerms, Math.ceil(4 * x)), x);

        for (var i = 0; i < maxNumberOfTerms; i++) {

            if (n % 2 == 0) {

                if (Math.abs(coeff[i]) > tol) {

                    val += coeff[i] * besselCoefficients[2 * i];

                }

            } else {

                if (Math.abs((2 * i + 1) * coeff[i]) > tol) {

                    val += (2 * i + 1) * coeff[i] * besselCoefficients[2 * i + 1];

                }

            }

        }

        if (n % 2 == 1) {

            val /= Math.tanh(x);

        }

        return val;

    } else {

        var vals = [];

        x.forEach((x_val) => {

            var val = 0;
            const besselCoefficients = be.besselj_list(Math.max(2 * maxNumberOfTerms, Math.ceil(4 * x_val)), x_val);

            for (var i = 0; i < maxNumberOfTerms; i++) {

                if (n % 2 == 0) {

                    if (Math.abs(coeff[i]) > tol) {

                        val += coeff[i] * besselCoefficients[2 * i];

                    }

                } else {

                    if (Math.abs((2 * i + 1) * coeff[i]) > tol) {

                        val += (2 * i + 1) * coeff[i] * besselCoefficients[2 * i + 1];

                    }

                }

            }

            if (n % 2 == 1) {

                val /= Math.tanh(x_val);

            }

            vals.push(val);

        });

        return vals;

    }

}

function sem(x, n, q) {

    const b = me.b_eigen(n, q);
    const maxNumberOfTerms = Math.max(n, 30);
    const tol = 1e-10;
    var coeff = [];

    if (n % 2 == 0) {

        coeff = mc.b_even_coeff(b, q, maxNumberOfTerms);

    } else if (n % 2 == 1) {

        coeff = mc.b_odd_coeff(b, q, maxNumberOfTerms);

    } else {

        return "n needs to be a positive integer";

    }

    if (typeof (x) === "number") {

        var val = 0;
        const besselCoefficients = be.besselj_list(Math.max(2 * maxNumberOfTerms, Math.ceil(4 * x)), x);

        for (var i = 0; i < maxNumberOfTerms; i++) {

            if (n % 2 == 0) {

                if (Math.abs((2 * i + 2) * coeff[i]) > tol) {

                    val += (2 * i + 2) * coeff[i] * besselCoefficients[2 * i + 2];

                }

            } else {

                if (Math.abs(coeff[i]) > tol) {

                    val += coeff[i] * besselCoefficients[2 * i + 1];

                }

            }

        }

        if (n % 2 == 0) {

            val /= Math.tanh(x);

        }

        return val;

    } else {

        var vals = [];

        x.forEach((x_val) => {

            var val = 0;
            const besselCoefficients = be.besselj_list(Math.max(2 * maxNumberOfTerms, Math.ceil(4 * x_val)), x_val);

            for (var i = 0; i < maxNumberOfTerms; i++) {

                if (n % 2 == 0) {

                    if (Math.abs((2 * i + 2) * coeff[i]) > tol) {

                        val += (2 * i + 2) * coeff[i] * besselCoefficients[2 * i + 2];

                    }

                } else {

                    if (Math.abs(coeff[i]) > tol) {

                        val += coeff[i] * besselCoefficients[2 * i + 1];

                    }

                }

            }

            if (n % 2 == 0) {

                val /= Math.tanh(x_val);

            }

            vals.push(val);

        });

        return vals;

    }

}

export { cem, sem };
