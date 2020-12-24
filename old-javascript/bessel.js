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
            j = [2 * (n + 1) * j[0] / x - j[1]].concat(j);
            if (n == 0) {
                scale += j[0];
            } else if (n % 2 == 0) {
                scale += 2 * j[0];
            }
            //console.log(scale)
            n--;
        }

        for (var i = 0; i < n_max; i++) {
            unitCoeff.push(j[i] / scale);
            //console.log(j[i] / scale)
        }

        return unitCoeff;
    }
}

export { besselj_list };