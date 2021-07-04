// ========================================================
// Uses interval bisection to find a root of the equation 
// in the given interval
// inputs: fun = function to have its root found
//         a   = start point of iteration
//         b   = end point of iteration
//         e   = tolerance of algorithm 
//               once abs(b - a) < e, terminates
// Output: either the root or 'error' if the values of the 
//         function at the end points have the same signs
// Change history:
//     ??/??/?? Initial commit
//     04/07/21 Tidied up
//=========================================================

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

// ========================================================
// Uses interval bisection to find the forst n roots
// in the given interval
// inputs: fun   = function to have its roots found
//         n     = which root to find
//         start = start point of range
//         end   = end point of range
//         tol   = tolerance of algorithm 
// Output: either the root or 'error' if the values of the 
//         function at the end points have the same signs
// Change history:
//     ??/??/?? Initial commit
//     04/07/21 Tidied up
//=========================================================

function findNthRoot(fun, n, spacing, start, finish, tol) {

    var k = 0;
    var a = start, b = Math.min(start + spacing, finish);

    while (k < n) {

        var possibleRoot = interval_bisection(fun, a, b, tol);

        if (possibleRoot !== "error") {

            a = b;
            b = Math.min(a + spacing, finish);

            k++;

        } else {

            a = b;
            b = Math.min(a + spacing, finish);

        }

    }

    return possibleRoot;

}

export { interval_bisection, findNthRoot };