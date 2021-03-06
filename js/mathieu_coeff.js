// Using backwards recursion this function calculates the fourier coefficients of the mathieu functions
// a_2n-2 = 0 and a_2n-4 = 1
// Normalised
// a : mathieu parameter/eigenvalue
// q : mathieu parameter
// n : number of fourier coefficients to calculate

function a_even_coeff(a, q, numberOfTerms) {

    var a_2n_2 = 0, a_2n_4 = 1;
    var i = 2 * numberOfTerms - 6, norm = 0, sign = 0;
    var coeff = [a_2n_4, a_2n_2];
    var unitCoeff = [];

    if (q == 0) {

        const n = Math.sqrt(a) / 2;

        for (var i = 0; i < n; i++) {

            unitCoeff.push(0);

        }

        if (n == 0) {

            unitCoeff.push(Math.sqrt(1 / 2));

        } else {

            unitCoeff.push(1);

        }


        for (var i = n; i < numberOfTerms - 1; i++) {

            unitCoeff.push(0);

        }

        return unitCoeff;

    }

    while (i >= 0) {

        const q_1 = 1 / q;

        if (i > 0) {

            coeff = [-coeff[1] + (a - (i + 2) * (i + 2)) * coeff[0] * q_1].concat(coeff);
            norm += coeff[0] * coeff[0];
            sign += coeff[0];
            i -= 2;

        } else if (i == 0) {

            coeff = [(-coeff[1] + (a - 4) * coeff[0] * q_1) / 2].concat(coeff);
            norm += 2 * (coeff[0] * coeff[0]);
            sign += coeff[0];
            i -= 2;

        }

    }

    sign = Math.sign(sign);
    norm = sign * Math.sqrt(norm);

    for (var i = 0; i < numberOfTerms; i++) {

        unitCoeff.push(coeff[i] / norm);

    }

    return unitCoeff;

}

function a_odd_coeff(a, q, numberOfTerms) {

    var a_2n_1 = 0, a_2n_3 = 1;
    var i = 2 * numberOfTerms - 5, norm = 0, sign = 0;
    var coeff = [a_2n_3, a_2n_1];
    var unitCoeff = [];

    if (q == 0) {

        const n = (Math.sqrt(a) - 1) / 2;

        for (var i = 0; i < n; i++) {

            unitCoeff.push(0);

        }

        unitCoeff.push(1);

        for (var i = n; i < numberOfTerms - 1; i++) {

            unitCoeff.push(0);

        }

        return unitCoeff;

    }

    while (i >= 0) {

        const q_1 = 1 / q;

        coeff = [-coeff[1] + (a - (i + 2) * (i + 2)) * coeff[0] * q_1].concat(coeff);
        norm += coeff[0] * coeff[0];
        sign += coeff[0];
        i -= 2;

    }

    sign = Math.sign(sign)
    norm = sign * Math.sqrt(norm);

    for (var i = 0; i < numberOfTerms; i++) {

        unitCoeff.push(coeff[i] / norm);

    }

    return unitCoeff;

}

function b_even_coeff(b, q, numberOfTerms) {

    var b_2n_2 = 0, b_2n_4 = 1;
    var i = 2 * numberOfTerms - 6, norm = 0, sign = 0;
    var coeff = [b_2n_4, b_2n_2];
    var unitCoeff = [];

    if (q == 0) {

        const n = Math.sqrt(b) / 2;

        for (var i = 1; i < n; i++) {

            unitCoeff.push(0);

        }

        unitCoeff.push(1);

        for (var i = n; i < numberOfTerms - 1; i++) {

            unitCoeff.push(0);

        }

        return unitCoeff;

    }

    while (i >= 0) {

        const q_1 = 1 / q;

        coeff = [-coeff[1] + (b - (i + 2) * (i + 2)) * coeff[0] * q_1].concat(coeff);
        norm += coeff[0] * coeff[0];
        sign += i * coeff[0];
        i -= 2;

    }

    sign = Math.sign(sign);
    norm = sign * Math.sqrt(norm);

    for (var i = 0; i < numberOfTerms; i++) {

        unitCoeff.push(coeff[i] / norm);

    }

    return unitCoeff;

}

function b_odd_coeff(b, q, numberOfTerms) {

    var b_2n_1 = 0, b_2n_3 = 1;
    var i = 2 * numberOfTerms - 5, norm = 0, sign = 0;
    var coeff = [b_2n_3, b_2n_1];
    var unitCoeff = [];

    if (q == 0) {

        const n = (Math.sqrt(b) - 1) / 2;

        for (var i = 1; i < n; i++) {

            unitCoeff.push(0);

        }

        unitCoeff.push(1);

        for (var i = n; i < numberOfTerms - 1; i++) {

            unitCoeff.push(0);

        }

        return unitCoeff;

    }

    while (i >= 0) {

        const q_1 = 1 / q;

        coeff = [-coeff[1] + (b - (i + 2) * (i + 2)) * coeff[0] * q_1].concat(coeff);
        norm += coeff[0] * coeff[0];
        sign += i * coeff[0];
        i -= 2;

    }

    sign = Math.sign(sign);
    norm = sign * Math.sqrt(norm);

    for (var i = 0; i < numberOfTerms; i++) {

        unitCoeff.push(coeff[i] / norm);

    }

    return unitCoeff;

}

export { a_even_coeff, a_odd_coeff, b_even_coeff, b_odd_coeff };
