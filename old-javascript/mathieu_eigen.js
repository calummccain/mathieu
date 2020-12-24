// Calculates the eigenvalues for the pi/2pi periodic solutions to Mathieu's Differential equation

// Uses https://dlmf.nist.gov/28.6#i to estimate the eigenvalue

// if q>i^2 or if i = 0 and q > 1 use https://dlmf.nist.gov/28.8.E1 (the asymptotic expansion)

// otherwise use https://dlmf.nist.gov/28.6.i

function interval(i, q, ab) {
    var asymp = 0;
    if ((q > (i ** 2) / 2) || (i == 0 && q > 1)) {

        var h = Math.sqrt(q);
        var s = 2 * i + 1;

        asymp = -2.0 * (h ** 2);
        asymp += 2.0 * s * h;
        asymp -= ((s ** 2) + 1.0) / 8.0;
        asymp -= ((s ** 3) + 3.0 * s) / (128.0 * h);
        asymp -= (5.0 * (s ** 4) + 34.0 * (s ** 2) + 9.0) / (4096.0 * (h ** 2));
        asymp -= (33.0 * (s ** 5) + 410.0 * (s ** 3) + 405.0 * s) / (131071.0 * (h ** 3));
        asymp -= (63.0 * (s ** 6) + 1269.0 * (s ** 4) + 2943.0 * (s ** 2) + 486.0) / (1048576.0 * (h ** 4));
        asymp -= (527.0 * (s ** 7) + 15617.0 * (s ** 5) + 69001.0 * (s ** 3) + 41607.0) / (33554432.0 * (h ** 5));

    } else {
        if ((ab === 'a') && (i <= 6)) {
            if (i == 0) {
                asymp = -(q ** 2) / 2.0 + 7.0 * (q ** 4) / 128.0 - 29.0 * (q ** 6) / 2304.0 + 68687.0 * (q ** 8) / 18874386.0;
            } else if (i == 1) {
                asymp = 1.0 + q - (q ** 2) / 8.0 - (q ** 3) / 64.0 - (q ** 4) / 1536.0 + 11.0 * (q ** 5) / 36864.0 + 49.0 * (q ** 6) / 589824.0 + 55.0 * (q ** 7) / 9437184.0 - 83.0 * (q ** 8) / 35389440.0;
            } else if (i == 2) {
                asymp = 4.0 + 5.0 * (q ** 2) / 12.0 - 763.0 * (q ** 4) / 13824.0 + 1002401.0 * (q ** 6) / 79626240.0 - 1669068401.0 * (q ** 8) / 458647142400.0;
            } else if (i == 3) {
                asymp = 9.0 + (q ** 2) / 16.0 + (q ** 3) / 64.0 + 13.0 * (q ** 4) / 20480.0 - 5.0 * (q ** 5) / 16384.0 - 1961.0 * (q ** 6) / 23592960.0 - 609.0 * (q ** 7) / 104857600.0;
            } else if (i == 4) {
                asymp = 16.0 + (q ** 2) / 30.0 + 433.0 * (q ** 4) / 864000.0 - 5701.0 * (q ** 6) / 2721600000.0;
            } else if (i == 5) {
                asymp = 25.0 + (q ** 2) / 48.0 + 11.0 * (q ** 4) / 774144.0 + (q ** 5) / 147456.0 + 37.0 * (q ** 6) / 891813888.0;
            } else if (i == 6) {
                asymp = 36.0 + (q ** 2) / 70.0 + 187.0 * (q ** 4) / 43904000.0 + 6743617.0 * (q ** 6) / 92935987200000.0;
            }
        } else if ((ab === 'b') && (i <= 6)) {
            if (i == 1) {
                asymp = 1.0 - q - (q ** 2) / 8.0 + (q ** 3) / 64.0 - (q ** 4) / 1536.0 - 11.0 * (q ** 5) / 36864.0 + 49.0 * (q ** 6) / 589824.0 - 55.0 * (q ** 7) / 9437184.0 - 83.0 * (q ** 8) / 35389440.0;
            } else if (i == 2) {
                asymp = 4.0 - (q ** 2) / 12.0 + 5.0 * (q ** 4) / 13824.0 - 289.0 * (q ** 6) / 79626240.0 + 21391.0 * (q ** 8) / 458647142400.0;
            } else if (i == 3) {
                asymp = 9.0 + (q ** 2) / 16.0 - (q ** 3) / 64.0 + 13.0 * (q ** 4) / 20480.0 + 5.0 * (q ** 5) / 16384.0 - 1961.0 * (q ** 6) / 23592960.0 + 609.0 * (q ** 7) / 104857600.0;
            } else if (i == 4) {
                asymp = 16.0 + (q ** 2) / 30.0 - 317.0 * (q ** 4) / 864000.0 + 10049.0 * (q ** 6) / 2721600000.0;
            } else if (i == 5) {
                asymp = 25.0 + (q ** 2) / 48.0 + 11.0 * (q ** 4) / 774144.0 - (q ** 5) / 147456.0 + 37.0 * (q ** 6) / 891813888.0;
            } else if (i == 6) {
                asymp = 36.0 + (q ** 2) / 70.0 + 187.0 * (q ** 4) / 43904000.0 - 5861633.0 * (q ** 6) / 92935987200000.0;
            }
        } else {
            asymp = i ** 2;
            asymp = asymp + (q ** 2) / (2.0 * ((i ** 2) - 1.0));
            asymp = asymp + ((5.0 * (i ** 2) + 7.0) * (q ** 4)) / (32.0 * (((i ** 2) - 1.0) ** 3) * ((i ** 2) - 4.0));
            asymp = asymp + ((9.0 * (i ** 4) + 58.0 * (i ** 2) + 29.0) * (q ** 6)) / (64.0 * (((i ** 2) - 1.0) ** 5) * ((i ** 2) - 4.0) * ((i ** 2) - 9.0));
        }
    }
    return asymp;
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

    if (fa == 0.0) {
        return a;
    } else if (fb == 0.0) {
        return b;
    } else if (fa * fb > 0.0) {
        return "error";
    }

    var dx = Math.abs(b - a);

    while (dx > e) {

        var c = (a + b) / 2.0;
        var fc = fun(c);

        if (fc == 0.0) {
            return c;
        } else if (fa * fc < 0.0) {
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

    return (a + b) / 2.0;
}

// # These functions return the determinant of A - qI for A the mathieu matrix
// # They grow quick and are potentially numerically unstable but change in sign is all that matters
// # q: mathieu parameter
// # n: number of eigenvalues to return

// # if q = 0 then return a list of squares - functions degenerate to sine and cosine
// # Otherwise define a function tridiag_det(x) which calculates the determinant of the tridiagonal mathieu matrix A - qI
// # Then perform interval bisection using the initial interval[guess - 1, guess + 1] where guess = interval(i, q, a / b)
// # If no root(i.e.guess = 'error') then widen the interval
// # For the first eigenvalue we can use a larger range: [guess - max(1, q), guess + 1]
// # return the list of eigenvalues

function a_even(q, n) {

    var roots = [];
    if (q == 0.0) {
        for (var i = 0; i < n; i++) {
            roots.push(4 * i * i);
        }
    } else {
        function tridiag_det(x) {
            var j = 3;
            var a = -x;
            var b = (4 - x) * a - 2 * (q ** 2);
            var c = 0;
            while (j <= n) {
                c = ((2 * j - 2) ** 2 - x) * b - (q ** 2) * a;
                a = b;
                b = c;
                j += 1;
            }
            return b;
        }

        for (var j = 0; j < n; j++) {
            var done = false;
            var k = 1;
            var center = interval(2.0 * j, q, 'a');
            var rootpot;

            while (!done) {
                if (j != 0) {
                    rootpot = interval_bisection(tridiag_det, center - k, center + k, 10e-10);
                } else {
                    rootpot = interval_bisection(tridiag_det, center - Math.max(1, q) * k, center + k, 10e-10);
                }

                if (rootpot === 'error') {
                    k += 1;
                    continue;
                } else {
                    roots.push(rootpot);
                    done = true;
                }
            }
        }
    }
    return roots;
}

// console.log(a_even(1, 20));

function a_odd(q, n) {

    var roots = [];
    if (q == 0.0) {
        for (var i = 0; i < n; i++) {
            roots.push((2 * 1 + 1) ** 2);
        }
    } else {
        function tridiag_det(x) {
            var j = 2;
            var a = 1;
            var b = 1 + q - x;
            var c = 0;
            while (j <= n) {
                c = ((2 * j - 1) ** 2 - x) * b - (q ** 2) * a;
                a = b;
                b = c;
                j += 1;
            }
            return b;
        }

        for (var j = 0; j < n; j++) {
            var done = false;
            var k = 1;
            var center = interval(2 * j + 1, q, 'a');
            var rootpot;

            while (!done) {
                if (j != 0) {
                    rootpot = interval_bisection(tridiag_det, center - k, center + k, 10e-10);
                } else {
                    rootpot = interval_bisection(tridiag_det, center - Math.max(1, q) * k, center + k, 10e-10);
                }

                if (rootpot === 'error') {
                    k += 1;
                    continue;
                } else {
                    roots.push(rootpot);
                    done = true;
                }
            }
        }
    }
    return roots;
}

// console.log(a_odd(1, 20))

function b_even(q, n) {

    var roots = [];
    if (q == 0.0) {
        for (var i = 1; i <= n; i++) {
            roots.push(4 * i * i);
        }
    } else {
        function tridiag_det(x) {
            var j = 2;
            var a = 1;
            var b = 4 - x;
            var c = 0;
            while (j <= n) {
                c = c = ((2 * j) ** 2 - x) * b - (q ** 2) * a;
                a = b;
                b = c;
                j += 1;
            }
            return b;
        }

        for (var j = 0; j < n; j++) {
            var done = false;
            var k = 1;
            var center = interval(2 * j, q, 'a');
            var rootpot;

            while (!done) {
                if (j != 0) {
                    rootpot = interval_bisection(tridiag_det, center - k, center + k, 10e-10);
                } else {
                    rootpot = interval_bisection(tridiag_det, center - Math.max(1, q) * k, center + k, 10e-10);
                }

                if (rootpot === 'error') {
                    k += 1;
                    continue;
                } else {
                    roots.push(rootpot);
                    done = true;
                }
            }
        }
    }
    return roots;
}

// console.log(b_even(1, 20));

function b_odd(q, n) {

    var roots = [];
    if (q == 0.0) {
        for (var i = 0; i < n; i++) {
            roots.push((2 * 1 + 1) ** 2);
        }
    } else {
        function tridiag_det(x) {
            var j = 2;
            var a = 1;
            var b = 1 + q - x;
            var c = 0;
            while (j <= n) {
                c = ((2 * j - 1) ** 2 - x) * b - (q ** 2) * a;
                a = b;
                b = c;
                j += 1;
            }
            return b;
        }

        for (var j = 0; j < n; j++) {
            var done = false;
            var k = 1;
            var center = interval(2 * j + 2, q, 'a');
            var rootpot;

            while (!done) {
                if (j != 0) {
                    rootpot = interval_bisection(tridiag_det, center - k, center + k, 10e-10);
                } else {
                    rootpot = interval_bisection(tridiag_det, center - Math.max(1, q) * k, center + k, 10e-10);
                }

                if (rootpot === 'error') {
                    k += 1;
                    continue;
                } else {
                    roots.push(rootpot);
                    done = true;
                }
            }
        }
    }
    return roots;
}

// console.log(b_odd(1, 20))

export { a_even, a_odd, b_even, b_odd };

