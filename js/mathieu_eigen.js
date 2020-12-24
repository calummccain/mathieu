// Calculates the eigenvalues for the pi/2pi periodic solutions to Mathieu's Differential equation
// Uses https://dlmf.nist.gov/28.6#i to estimate the eigenvalue
// if q > i^2 or if i = 0 and q > 1 use https://dlmf.nist.gov/28.8.E1 (the asymptotic expansion)
// otherwise use https://dlmf.nist.gov/28.6.i
// n  = eigenvalue order
// q  = q value
// ab = "a"/"b"

function approximation(n, q, ab) {

    var approx = 0;

    if ((q > (n ** 2) / 2) || (n == 0 && q > 1)) {

        var h = Math.sqrt(q);
        var s = 2 * n + 1;

        approx = -2 * (h ** 2);
        approx += 2 * s * h;
        approx -= ((s ** 2) + 1) / 8;
        approx -= ((s ** 3) + 3 * s) / (128 * h);
        approx -= (5 * (s ** 4) + 34 * (s ** 2) + 9) / (4096 * (h ** 2));
        approx -= (33 * (s ** 5) + 410 * (s ** 3) + 405 * s) / (131071 * (h ** 3));
        approx -= (63 * (s ** 6) + 1269 * (s ** 4) + 2943 * (s ** 2) + 486) / (1048576 * (h ** 4));
        approx -= (527 * (s ** 7) + 15617 * (s ** 5) + 69001 * (s ** 3) + 41607) / (33554432 * (h ** 5));

        console.log("big")

    } else {

        console.log("small")

        if ((ab === 'a') && (n <= 6)) {

            if (n == 0) {

                approx = -(q ** 2) / 2 + 7 * (q ** 4) / 128 - 29 * (q ** 6) / 2304 + 68687 * (q ** 8) / 18874386;

            } else if (n == 1) {

                approx = 1 + q - (q ** 2) / 8 - (q ** 3) / 64 - (q ** 4) / 1536 + 11 * (q ** 5) / 36864 + 49 * (q ** 6) / 589824 + 55 * (q ** 7) / 9437184 - 83 * (q ** 8) / 35389440;

            } else if (n == 2) {

                approx = 4 + 5 * (q ** 2) / 12 - 763 * (q ** 4) / 13824 + 1002401 * (q ** 6) / 79626240 - 1669068401 * (q ** 8) / 458647142400;

            } else if (n == 3) {

                approx = 9 + (q ** 2) / 16 + (q ** 3) / 64 + 13 * (q ** 4) / 20480 - 5 * (q ** 5) / 16384 - 1961 * (q ** 6) / 23592960 - 609 * (q ** 7) / 104857600;

            } else if (n == 4) {

                approx = 16 + (q ** 2) / 30 + 433 * (q ** 4) / 864000 - 5701 * (q ** 6) / 2721600000;

            } else if (n == 5) {

                approx = 25 + (q ** 2) / 48 + 11 * (q ** 4) / 774144 + (q ** 5) / 147456 + 37 * (q ** 6) / 891813888;

            } else if (n == 6) {

                approx = 36 + (q ** 2) / 70 + 187 * (q ** 4) / 43904000 + 6743617 * (q ** 6) / 92935987200000;

            }

        } else if ((ab === 'b') && (n <= 6)) {

            if (n == 1) {

                approx = 1 - q - (q ** 2) / 8 + (q ** 3) / 64 - (q ** 4) / 1536 - 11 * (q ** 5) / 36864 + 49 * (q ** 6) / 589824 - 55 * (q ** 7) / 9437184 - 83 * (q ** 8) / 35389440;

            } else if (n == 2) {

                approx = 4 - (q ** 2) / 12 + 5 * (q ** 4) / 13824 - 289 * (q ** 6) / 79626240 + 21391 * (q ** 8) / 458647142400;

            } else if (n == 3) {

                approx = 9 + (q ** 2) / 16 - (q ** 3) / 64 + 13 * (q ** 4) / 20480 + 5 * (q ** 5) / 16384 - 1961 * (q ** 6) / 23592960 + 609 * (q ** 7) / 104857600;

            } else if (n == 4) {

                approx = 16 + (q ** 2) / 30 - 317 * (q ** 4) / 864000 + 10049 * (q ** 6) / 2721600000;

            } else if (n == 5) {

                approx = 25 + (q ** 2) / 48 + 11 * (q ** 4) / 774144 - (q ** 5) / 147456 + 37 * (q ** 6) / 891813888;

            } else if (n == 6) {

                approx = 36 + (q ** 2) / 70 + 187 * (q ** 4) / 43904000 - 5861633 * (q ** 6) / 92935987200000;

            }

        } else {

            approx = n ** 2;
            approx += (q ** 2) / (2 * ((n ** 2) - 1));
            approx += ((5 * (n ** 2) + 7) * (q ** 4)) / (32 * (((n ** 2) - 1) ** 3) * ((n ** 2) - 4));
            approx += ((9 * (n ** 4) + 58 * (n ** 2) + 29) * (q ** 6)) / (64 * (((n ** 2) - 1) ** 5) * ((n ** 2) - 4) * ((n ** 2) - 9));

        }
    }

    return approx;
}

// Uses interval bisection to find a root of the equation in the given interval
// Converts numbers to floats or else python goes a bit funny
// function : function to have its root found
//         a: start point of iteration
//         b: end point of iteration
//         e: tolerance of algorithm - once abs(b - a) < e, terminates
// returns either the root or 'error' if the values of the function at the end points have the same signs

function interval_bisection(fun, a, b, e) {

    var fa = fun(a);
    var fb = fun(b);

    if (fa == 0) {
        return a;
    } else if (fb == 0) {
        return b;
    } else if (fa * fb > 0) {
        return "error";
    }

    var dx = Math.abs(b - a);

    while (dx > e) {

        var c = (a + b) / 2;
        var fc = fun(c);

        if (fc == 0) {
            return c;
        } else if (fa * fc < 0) {
            a = a;
            b = c;
            fb = fun(b);
        } else {
            a = c;
            b = b;
            fa = fun(a);
        }

        dx = Math.abs(b - a);
    }

    return (a + b) / 2;
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

    var j = 3, a = -x, b = (4 - x) * a - 2 * (q ** 2), c = 0;

    while (j <= size) {

        c = ((2 * j - 2) ** 2 - x) * b - (q ** 2) * a;
        a = b;
        b = c;
        j += 1;
    }

    return b;

}

function a_odd_tridiag_det(x, q, size) {

    var j = 2, a = 1, b = 1 + q - x, c = 0;

    while (j <= size) {

        c = ((2 * j - 1) ** 2 - x) * b - (q ** 2) * a;
        a = b;
        b = c;
        j += 1;

    }

    return b;

}

function b_even_tridiag_det(x, q, size) {

    var j = 2, a = 1, b = 4 - x, c = 0;

    while (j <= size) {

        c = c = ((2 * j) ** 2 - x) * b - (q ** 2) * a;
        a = b;
        b = c;
        j += 1;

    }

    return b;

}

function b_odd_tridiag_det(x, q, size) {

    var j = 2, a = 1, b = 1 - q - x, c = 0;

    while (j <= size) {

        c = ((2 * j - 1) ** 2 - x) * b - (q ** 2) * a;
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

    console.log("approx", approx)

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


// for (var q = 0; q < 31; q++) {

//     console.log(q)

//     console.log(b_eigen(1, q))
// }


console.log(b_eigen(1, 7))


export { a_eigen, b_eigen };

