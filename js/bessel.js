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

    } else {

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
    }

}

// console.log(besselj_list(10, 1))


function besselj(x, n, scale = 1) {

    if (typeof (x) === "number") {

        return besselj_list(Math.max(2 * n, Math.ceil(2 * scale * x), 30), scale * x)[n];

    } else {

        var vals = [];

        x.forEach((x_val) => {

            vals.push(besselj_list(Math.max(2 * n, Math.ceil(2 * scale * x_val), 30), scale * x_val)[n]);

        });

        return vals;

    }

}

export { besselj_list, besselj };