function besselj_list(n_max, x) {

    var n = n_max - 2;
    var j = [1, 0];
    var scale = 0;
    var unitCoeff = [];

    if (x == 0) {

        var list = [1];

        for (var i = 0; i <= n; i++) {

            list.push(0);

        }

        return list;

    } else if (x < n_max / 2) {

        while (n >= 0) {

            var j1 = [];
            var val = 2 * (n + 1) * j[0] / x - j[1];
            j.forEach((x) => { j1.push(x / val) });
            j = [1].concat(j1);
            n--;

        }

        for (var i = 0; i < n_max; i++) {

            !(i % 2) ? scale += 2 * j[i] : scale += 0;

        }

        scale -= j[0];

        for (var i = 0; i < n_max; i++) {

            unitCoeff.push(j[i] / scale);

        }

        return unitCoeff;

    } else {

        for (var i = 0; i < n_max; i++) {

            unitCoeff.push(besselj_asypm(x, i, 5));

        }

        return unitCoeff;

    }

}

function besselj_asypm(x, n, order) {

    const w = x - n * Math.PI / 2 - Math.PI / 4;
    var cosTerm = 0, sinTerm = 0;

    for (var k = 0; k <= order; k++) {

        cosTerm += ((-1) ** k) * a(2 * k, n) / (x ** (2 * k));
        sinTerm += ((-1) ** k) * a(2 * k + 1, n) / (x ** (2 * k + 1));

    }

    cosTerm *= Math.cos(w);
    sinTerm *= Math.sin(w);

    var j = cosTerm - sinTerm;
    j *= Math.sqrt(2 / (Math.PI * x));

    return j;

}

function besselj(x, n, scale = 1) {

    const accuracy = 50;
    const asympOrder = 6;

    if (typeof (x) === "number") {

        if (x < n) {

            return besselj_list(accuracy, scale * x)[n];

        } else {

            return besselj_asypm(x, n, asympOrder);

        }

    } else {

        var vals = [];

        x.forEach((x_val) => {

            if (x_val < accuracy) {

                vals.push(besselj_list(accuracy, scale * x_val)[n]);

            } else {

                vals.push(besselj_asypm(x_val, n, asympOrder));

            }

        });

        return vals;

    }

}

function a(k, v) {

    var a = 1;
    var n = 1;

    while (n <= 2 * k - 1) {

        a *= (2 * v - n) * (2 * n + n) / (8 * n);
        n += 2;

    }

    return a

}

export { besselj_list, besselj };