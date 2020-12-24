// Using backwards recursion this function calculates the fourier coefficients of the mathieu functions
// a_2n-2 = 0 and a_2n-4 = 1
// Normalised so that a_0 = 1 <===== change to standard normalisations
// a : mathieu parameter/eigenvalue
// q : mathieu parameter
// n : number of fourier coefficients to calculate

function a_even_coeff_back(a, q, n) {
    var a_2n_2 = 0;
    var a_2n_4 = 1;
    var coeff = [a_2n_4, a_2n_2];
    var i = 2 * n - 6;
    var unitCoeff = [];
    while (i >= 0) {
        if (i > 0) {
            coeff = [-coeff[1] + (a - (i + 2) ** 2) * coeff[0] / q].concat(coeff);
            i = i - 2;
        } else if (i == 0) {
            coeff = [(-coeff[1] + (a - 4) * coeff[0] / q) / 2].concat(coeff);
            i = i - 2;
        }
    }

    for (var i = 0; i < n; i++) {
        unitCoeff.push(coeff[i] / coeff[0]);
    }

    return unitCoeff;
}

function a_odd_coeff_back(a, q, n) {
    var a_2n_1 = 0;
    var a_2n_3 = 1;
    var coeff = [a_2n_3, a_2n_1];
    var i = 2 * n - 5;
    var unitCoeff = [];
    while (i >= 0) {
        coeff = [-coeff[1] + (a - (i + 2) ** 2) * coeff[0] / q].concat(coeff);
        i = i - 2;

    }
    for (var i = 0; i < n; i++) {
        unitCoeff.push(coeff[i] / coeff[0]);
    }

    return unitCoeff;
}

// def b_even_coeff_back(b, q, n):
//     b = float(b)
//     q = float(q)
//     b_2n_2 = 0.0
//     b_2n_4 = 1.0
//     coeff = [b_2n_4, b_2n_2]
//     i = float(2 * n - 6)
//     while i > 0:
//         coeff = [-coeff[1] + (b - (i + 2.0)**2) * coeff[0] / q] + coeff
//         i = i - 2.0

//     coeff = [x / coeff[0] for x in coeff]

//     return coeff

function b_even_coeff_back(b, q, n) {
    var b_2n_2 = 0;
    var b_2n_4 = 1;
    var coeff = [b_2n_4, b_2n_2];
    var i = 2 * n - 6;
    var unitCoeff = [];
    while (i >= 0) {
        coeff = [(-coeff[1] + (b - (i + 2) ** 2) * coeff[0] / q) / 2].concat(coeff);
        i = i - 2;
    }

    for (var i = 0; i < n; i++) {
        unitCoeff.push(coeff[i] / coeff[0]);
    }

    return unitCoeff;
}

// def b_odd_coeff_back(b, q, n):
//     b = float(b)
//     q = float(q)
//     b_2n_1 = 0.0
//     b_2n_3 = 1.0
//     coeff = [b_2n_3, b_2n_1]
//     i = float(2 * n - 5)
//     while i > 0:
//         coeff = [-coeff[1] + (b - (i + 2)**2.0) * coeff[0] / q] + coeff
//         i = i - 2.0

//     coeff = [x / coeff[0] for x in coeff]

//     return coeff

function b_odd_coeff_back(b, q, n) {
    var b_2n_1 = 0;
    var b_2n_3 = 1;
    var coeff = [b_2n_3, b_2n_1];
    var i = 2 * n - 5;
    var unitCoeff = [];
    while (i >= 0) {
        coeff = [-coeff[1] + (b - (i + 2) ** 2) * coeff[0] / q].concat(coeff);
        i = i - 2;

    }
    for (var i = 0; i < n; i++) {
        unitCoeff.push(coeff[i] / coeff[0]);
    }

    return unitCoeff;
}

// console.log(a_even_coeff_back(4.371300982777029, 1, 30))

// def a_odd_coeff_back(a, q, n):
//     a = float(a)
//     q = float(q)
//     a_2n_1 = 0.0
//     a_2n_3 = 1.0
//     coeff = [a_2n_3, a_2n_1]
//     i = float(2 * n - 5)
//     while i >= 0:
//         coeff = [-coeff[1] + (a - (i + 2.0)**2) * coeff[0] / q] + coeff
//         i = i - 2.0

//     # print(coeff)
//     coeff = [x / coeff[0] for x in coeff]

//     return coeff


// def b_odd_coeff_back(b, q, n):
//     b = float(b)
//     q = float(q)
//     b_2n_1 = 0.0
//     b_2n_3 = 1.0
//     coeff = [b_2n_3, b_2n_1]
//     i = float(2 * n - 5)
//     while i > 0:
//         coeff = [-coeff[1] + (b - (i + 2)**2.0) * coeff[0] / q] + coeff
//         i = i - 2.0

//     coeff = [x / coeff[0] for x in coeff]

//     return coeff


// # print(a_even_coeff_back(4.371300982777029, 1, 20))
// # print(a_odd_coeff_back(1.8591080722399056, 1, 20))
// # print(b_even_coeff_back(3.917024773079902, 1, 20))
// # print(b_odd_coeff_back(25.020840823301114, 1, 30))

export { a_even_coeff_back, a_odd_coeff_back, b_even_coeff_back, b_odd_coeff_back };
