import * as me from './mathieu_eigen.js';
import * as mc from './mathieu_coeff.js';


function ce(x, n, q) {

    var eigenval_even = me.a_even(q, 30);
    var eigenval_odd = me.a_odd(q, 30);
    var coeff = [];
    var eigen = eigenval_even.concat(eigenval_odd);
    eigen.sort(function (a, b) { return a - b; });

    if (n % 2 == 0) {
        coeff = mc.a_even_coeff_back(eigen[n], q, 30);
    } else if (n % 2 == 1) {
        coeff = mc.a_odd_coeff_back(eigen[n], q, 30);
    } else {
        return "n needs to be a positive integer";
    }

    if (n % 2 == 0) {
        var norm = 2 * (coeff[0] ** 2);
        for (var i = 1; i < 30; i++) {
            norm += (coeff[i] ** 2);
        }
    } else {
        var norm = 0;
        for (var i = 0; i < 30; i++) {
            norm += (coeff[i] ** 2);
        }
    }

    norm = Math.sqrt(norm);
    //console.log(norm);

    var normalised = [];

    for (var i = 0; i < 30; i++) {
        normalised.push(coeff[i] / norm);
    }

    console.log(normalised);

    var val = 0;

    for (var i = 0; i < 30; i++) {
        val += normalised[i] * Math.cos((2 * i + (n % 2)) * x);
        console.log(normalised[i], Math.cos((2 * i + (n % 2)) * x))
    }

    return val;
}

function se(x, n, q) {

    var eigenval_even = me.b_even(q, 30);
    var eigenval_odd = me.b_odd(q, 30);
    var coeff = [];
    var eigen = eigenval_even.concat(eigenval_odd);
    eigen.sort(function (a, b) { return a - b; });

    if (n % 2 == 0) {
        coeff = mc.b_even_coeff_back(eigen[n], q, 30);
    } else if (n % 2 == 1) {
        coeff = mc.b_odd_coeff_back(eigen[n], q, 30);
    } else {
        return "n needs to be a positive integer";
    }

    var norm = 0;
    for (var i = 0; i < 30; i++) {
        norm += (coeff[i] ** 2);
    }

    norm = Math.sqrt(norm);
    //console.log(norm);

    var normalised = [];

    for (var i = 0; i < 30; i++) {
        normalised.push(coeff[i] / norm);
    }
    //console.log(normalised);

    var val = 0;

    for (var i = 1; i < 31; i++) {
        val += normalised[i - 1] * Math.sin((2 * i - (n % 2)) * x);
        //console.log(normalised[i], Math.cos((2 * i + (n % 2)) * x), val)
    }

    return val;
}

export { ce, se };

// def se(x, n, q):

//     eigenval_even = me.b_even(q, 30)
//     eigenval_odd = me.b_odd(q, 30)

//     eigen = eigenval_even + eigenval_odd
//     eigen.sort()

//     if n % 2 == 0:
//         coeff = mc.b_even_coeff_back(eigen[n - 1], q, 30)

//     elif n % 2 == 1:
//         coeff = mc.b_odd_coeff_back(eigen[n - 1], q, 30)

//     else:
//         return "n needs to be a positive integer"

//     # print(eigen[n - 1])
//     # print(coeff)

//     norm = 0.0
//     for i in range(len(coeff)):
//         norm = norm + (coeff[i] ** 2)

//     normalised = [v / np.sqrt(norm) for v in coeff]

//     # print(normalised)

//     normnorm = 0.0
//     for i in range(len(normalised)):
//         normnorm = normnorm + (normalised[i] ** 2)

//     # print(normnorm)

//     val = 0.0

//     for i in range(1, len(normalised) + 1):
//         # print(val)
//         # print(float((2 * i + (n % 2))))
//         # print(np.cos(float((2 * i + (n % 2))) * x))
//         val = val + (normalised[i - 1] * np.sin(float((2 * i - (n % 2))) * x))

//     return val


// # print(ce(0.0, 0, 1))
// # print(ce(0.0, 1, 1))
// # print(ce(0.0, 2, 1))
// # print(ce(0.0, 3, 1))
// # print(ce(0.0, 4, 1))

// # print(se(1.0, 1, 1))
// # print(se(1.0, 2, 1))
// # print(se(1.0, 3, 1))
// # print(se(1.0, 4, 1))
// # print(se(1.0, 5, 1))

// # t = np.linspace(0.0, 2 * np.pi, 400)
// # plt.figure()
// # plt.plot(t, ce(t, 0, 1))
// # plt.show()
// # plt.plot(t, ce(t, 0, 1), 'k', t, ce(t, 1, 1), 'r', t, ce(t, 2, 1), 'g', t, ce(t, 3, 1), 'b', t, ce(t, 4, 1), 'm')
// # plt.plot(t, se(t, 1, 1), 'c', t, se(t, 2, 1), 'y', t, se(t, 3, 1), 'b', t, se(t, 4, 1), 'm')
// # plt.show()

// # 
// # # print(t)
// # q = 1.5
// # fig, axs = plt.subplots(3, 3, sharex=True, sharey=True)
// # axs[0, 0].plot(t, ce(t, 0, q), 'peachpuff')
// # axs[0, 1].plot(t, ce(t, 1, q), '-')
// # axs[0, 2].plot(t, ce(t, 2, q), 'g-')
// # axs[1, 0].plot(t, ce(t, 3, q), 'r-')
// # axs[1, 1].plot(t, ce(t, 4, q), 'b-')
// # axs[1, 2].plot(t, se(t, 1, q), 'm-')
// # axs[2, 0].plot(t, se(t, 2, q), 'r-')
// # axs[2, 1].plot(t, se(t, 3, q), 'r-')
// # axs[2, 2].plot(t, se(t, 4, q), 'r-')

// # plt.grid(True)
// # plt.show()

// # eigenval_even_a = me.a_even(q, 30)
// # eigenval_odd_a = me.a_odd(q, 30)

// # eigen_a = eigenval_even_a + eigenval_odd_a
// # eigen_a.sort()
// # print(eigen_a)

// # eigenval_even_b = me.b_even(q, 30)
// # eigenval_odd_b = me.b_odd(q, 30)

// # eigen_b = eigenval_even_b + eigenval_odd_b
// # eigen_b.sort()
// # print(eigen_b)
// # q = 100
// # plt.figure()
// # for i in range(1, 100):
// #     plt.plot(t, se(t, 3, i), 'k-')
// # # plt.plot(t, se(t, 1, q), 'k')
// # # plt.plot(t, ce(t, 0, q), 'k', t, ce(t, 1, q), 'r', t, ce(t, 2, q), 'g', t, ce(t, 3, q), 'b', t, ce(t, 4, q), 'm')
// # # plt.plot(t, se(t, 1, q), 'c', t, se(t, 2, q), 'y', t, se(t, 3, q), 'b', t, se(t, 4, q), 'm'
// # # , t, se(t, 5, q), 'm', t, se(t, 6, q), 'm', t, se(t, 7, q), 'm', t, se(t, 8, q), 'm', t, se(t, 9, q), 'm')
// # # plt.plot(t, se(t, 10, q), 'b')
// # plt.grid(True)
// # plt.show()


