import { interval_bisection } from "./math_funct.js";

// Calculates the eigenvalues for the pi/2pi periodic solutions to Mathieu's Differential equation
// Uses https://dlmf.nist.gov/28.6#i to estimate the eigenvalue
// if q > i^2 or if i = 0 and q > 1 use https://dlmf.nist.gov/28.8.E1 (the asymptotic expansion)
// otherwise use https://dlmf.nist.gov/28.6.i
// n  = eigenvalue order
// q  = q value
// ab = "a"/"b"

function approximation(n, q, ab) {

    var approx = 0;

    if ((q > (n * n) / 2) || (n == 0 && q > 1)) {

        const h = Math.sqrt(q), h2 = q, h3 = h * h2, h4 = q * q, h5 = h * h4;
        const s = 2 * n + 1, s2 = s * s, s3 = s * s2, s4 = s * s3, s5 = s * s4, s6 = s * s5, s7 = s * s6;

        approx = -2 * h2;
        approx += 2 * s * h;
        approx -= (s2 + 1) / 8;
        approx -= (s3 + 3 * s) / (128 * h);
        approx -= (5 * s4 + 34 * s2 + 9) / (4096 * h2);
        approx -= (33 * s5 + 410 * s3 + 405 * s) / (131071 * h3);
        approx -= (63 * s6 + 1269 * s4 + 2943 * s2 + 486) / (1048576 * h4);
        approx -= (527 * s7 + 15617 * s5 + 69001 * s3 + 41607) / (33554432 * h5);

    } else {

        const q2 = q * q, q3 = q * q2, q4 = q * q3, q5 = q * q4, q6 = q * q5, q7 = q * q6, q8 = q * q7;

        if ((ab === 'a') && (n <= 6)) {

            if (n == 0) {

                approx = -q2 / 2 + 7 * q4 / 128 - 29 * q6 / 2304 + 68687 * q8 / 18874386;

            } else if (n == 1) {

                approx = 1 + q - q2 / 8 - q3 / 64 - q4 / 1536 + 11 * q5 / 36864 + 49 * q6 / 589824 + 55 * q7 / 9437184 - 83 * q8 / 35389440;

            } else if (n == 2) {

                approx = 4 + 5 * q2 / 12 - 763 * q4 / 13824 + 1002401 * q6 / 79626240 - 1669068401 * q8 / 458647142400;

            } else if (n == 3) {

                approx = 9 + q2 / 16 + q3 / 64 + 13 * q4 / 20480 - 5 * q5 / 16384 - 1961 * q6 / 23592960 - 609 * q7 / 104857600;

            } else if (n == 4) {

                approx = 16 + q2 / 30 + 433 * q4 / 864000 - 5701 * q6 / 2721600000;

            } else if (n == 5) {

                approx = 25 + q2 / 48 + 11 * q4 / 774144 + q5 / 147456 + 37 * q6 / 891813888;

            } else if (n == 6) {

                approx = 36 + q2 / 70 + 187 * q4 / 43904000 + 6743617 * q6 / 92935987200000;

            }

        } else if ((ab === 'b') && (n <= 6)) {

            if (n == 1) {

                approx = 1 - q - q2 / 8 + q3 / 64 - q4 / 1536 - 11 * q5 / 36864 + 49 * q6 / 589824 - 55 * q7 / 9437184 - 83 * q8 / 35389440;

            } else if (n == 2) {

                approx = 4 - q2 / 12 + 5 * q4 / 13824 - 289 * q6 / 79626240 + 21391 * q8 / 458647142400;

            } else if (n == 3) {

                approx = 9 + q2 / 16 - q3 / 64 + 13 * q4 / 20480 + 5 * q5 / 16384 - 1961 * q6 / 23592960 + 609 * q7 / 104857600;

            } else if (n == 4) {

                approx = 16 + q2 / 30 - 317 * q4 / 864000 + 10049 * q6 / 2721600000;

            } else if (n == 5) {

                approx = 25 + q2 / 48 + 11 * q4 / 774144 - q5 / 147456 + 37 * q6 / 891813888;

            } else if (n == 6) {

                approx = 36 + q2 / 70 + 187 * q4 / 43904000 - 5861633 * q6 / 92935987200000;

            }

        } else {

            const n2 = n * n;
            const q2 = q * q, q4 = q2 * q2, q6 = q2 * q4;

            approx = n2;
            approx += q2 / (2 * (n2 - 1));
            approx += ((5 * n2 + 7) * q4) / (32 * ((n2 - 1) ** 3) * (n2 - 4));
            approx += ((9 * n2 * n2 + 58 * n2 + 29) * q6) / (64 * ((n2 - 1) ** 5) * (n2 - 4) * (n2 - 9));

        }
    }

    return approx;
}

// These functions return the determinant of A(q) - xI for A(q) the tridiagonal mathieu matrix (truncated)
// As the matrix is tridiagonal a quick method can be used (linear!)
//     |a_1 b_1             | 
//     |c_1 a_2 b_2         |          f_-1 = 0  f_0=1
// det |    c_2             | = f_n    f_k = a_k f_k-1 - c_k-1 b_k-1 f_k-2
//     |              b_n-1 |
//     |        c_n-1 a_n   |
// We can also simplify things as most of the off-diagonal elements are q
// They grow quick and are potentially numerically unstable but change in sign is all that matters
// q: mathieu parameter

function a_even_tridiag_det(x, q, size) {
    
    const q2 = q*q;

    var j = 3, a = -x, b = (4 - x) * a - 2 * q2, c = 0;

    while (j <= size) {

        c = ((2 * j - 2) ** 2 - x) * b - q2 * a;
        a = b;
        b = c;
        j += 1;
    }

    return b;

}

function a_odd_tridiag_det(x, q, size) {

    const q2 = q*q;

    var j = 2, a = 1, b = 1 + q - x, c = 0;

    while (j <= size) {

        c = ((2 * j - 1) ** 2 - x) * b - q2 * a;
        a = b;
        b = c;
        j += 1;

    }

    return b;

}

function b_even_tridiag_det(x, q, size) {

    const q2 = q*q;

    var j = 2, a = 1, b = 4 - x, c = 0;

    while (j <= size) {

        c = c = ((2 * j) ** 2 - x) * b - q2 * a;
        a = b;
        b = c;
        j += 1;

    }

    return b;

}

function b_odd_tridiag_det(x, q, size) {

    const q2 = q*q;

    var j = 2, a = 1, b = 1 - q - x, c = 0;

    while (j <= size) {

        c = ((2 * j - 1) ** 2 - x) * b - q2 * a;
        a = b;
        b = c;
        j += 1;

    }

    return b;

}

function a_eigen(n, q) {

    if (!Number.isInteger(n)) {

        return "n must be an integer";

    }

    const tol = 10e-10;
    const size = n + 20;

    if (q == 0) {

        return n ** 2;

    }

    var approx = approximation(n, q, "a");

    if (n % 2 == 0) {

        if (q < 0) {

            return a_eigen(n, -q);

        }

        var lhs = a_even_tridiag_det(approx - tol, q, size);
        var rhs = a_even_tridiag_det(approx + tol, q, size)

        if (lhs * rhs < 0 || Number.isNaN(lhs) || Number.isNaN(rhs)) {

            return approx;

        } else {

            var done = false;
            var j = 1;

            while (!done) {

                var pow = 2 ** j;

                if (a_even_tridiag_det(approx - j, q, size) * a_even_tridiag_det(approx + j / 2, q, size) < 0) {

                    return interval_bisection((x) => a_even_tridiag_det(x, q, size), approx - j, approx + j / 2, tol);

                }

                j++;

            }

        }

    } else {

        if (q < 0) {

            return b_eigen(n, -q);

        }

        if (a_odd_tridiag_det(approx - tol, q, size) * a_odd_tridiag_det(approx + tol, q, size) < 0) {

            return approx;

        } else {

            var done = false;
            var j = 1;

            while (!done) {

                var pow = 2 ** j;

                if (a_odd_tridiag_det(approx - j, q, size) * a_odd_tridiag_det(approx + j / 2, q, size) < 0) {

                    return interval_bisection((x) => a_odd_tridiag_det(x, q, size), approx - j, approx + j / 2, tol);

                }

                j++;

            }

        }

    }

}

function b_eigen(n, q) {

    if (!Number.isInteger(n)) {

        return "n must be an integer";

    }

    const tol = 10e-10;
    const size = n + 20;

    if (q == 0) {

        return n ** 2;

    }

    var approx = approximation(n, q, "b");

    if (n % 2 == 0) {

        if (q < 0) {

            return b_eigen(n, -q);

        }

        var lhs = b_even_tridiag_det(approx - tol, q, size);
        var rhs = b_even_tridiag_det(approx + tol, q, size)

        if (lhs * rhs < 0 || Number.isNaN(lhs) || Number.isNaN(rhs)) {

            return approx;

        } else {

            var done = false;
            var j = 1;

            while (!done) {

                var pow = 2 ** j;

                if (b_even_tridiag_det(approx - j, q, size) * b_even_tridiag_det(approx + j / 2, q, size) < 0) {

                    return interval_bisection((x) => b_even_tridiag_det(x, q, size), approx - j, approx + j / 2, tol);

                }

                j++;

            }

        }

    } else {

        if (q < 0) {

            return a_eigen(n, -q);

        }

        if (b_odd_tridiag_det(approx - tol, q, size) * b_odd_tridiag_det(approx + tol, q, size) < 0) {

            return approx;

        } else {

            var done = false;
            var j = 1;

            while (!done) {

                if (b_odd_tridiag_det(approx - j, q, size) * b_odd_tridiag_det(approx + j / 2, q, size) < 0) {

                    return interval_bisection((x) => b_odd_tridiag_det(x, q, size), approx - j, approx + j / 2, tol);

                }

                j++;

            }

        }

    }

}

export { a_eigen, b_eigen };