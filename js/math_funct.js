
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

function findNthRoot(fun, root, spacing, start, finish, tolerance) {

    var n = 0;
    var a = start, b = Math.min(start + spacing, finish);

    while (n < root) {

        var possibleRoot = interval_bisection(fun, a, b, tolerance);

        if (possibleRoot !== "error") {

            a = b;
            b = Math.min(a + spacing, finish);

            n++;

        } else {

            a = b;
            b = Math.min(a + spacing, finish);

        }

    }

    return possibleRoot;

}

export { interval_bisection, findNthRoot };