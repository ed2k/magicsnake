function rot3(x, origin, direction, theta) {
    direction = math.divide(direction, math.norm(direction));
    var d1 = direction.subset(math.index(0));
    var d2 = direction.subset(math.index(1));
    var d3 = direction.subset(math.index(2));
    var w = math.matrix([[0, -d3, d2], [d3, 0, -d1], [-d2, d1, 0]]);
    var rotmatr = math.add(math.add(math.identity(3), math.multiply(math.sin(theta), w)), math.multiply(2 * math.sin(theta / 2) * math.sin(theta / 2), math.multiply(w, w)));
    return math.add(math.multiply(math.subtract(x, origin), math.transpose(rotmatr)), origin)
}


function nextposition(x1, x2, x3, x4, x5, x6, th) {
    var x1n = x5;
    var x2n = math.subtract(math.add(x3, x5), x4);
    var x3n = math.subtract(math.add(x2, x6), x1);
    var x4n = x6;
    var x5n = x2;
    var x6n = x3;
    var ax1 = math.divide(math.add(x2, x5), 2);
    var ax2 = math.subtract(math.add(ax1, x5), x4);
    var dir = math.subtract(x5, x4);
    x1nn = rot3(x1n, ax1, dir, th);
    x4nn = rot3(x4n, ax1, dir, th);
    x5nn = rot3(x5n, ax1, dir, th);
    x6nn = rot3(x6n, ax1, dir, th);
    x2nn = rot3(x2n, ax2, dir, th);
    x3nn = rot3(x3n, ax2, dir, th);
    return [x1nn, x2nn, x3nn, x4nn, x5nn, x6nn];
}

function collision(xcenter, xin, xout, vcenter, vin, vout) {
    var k = 0;
    var err = 0;
    for (i = 0; i < vcenter.length; i++) {
        if (Math.round(xcenter.subset(math.index(0))) == Math.round(vcenter[i].subset(math.index(0))) && Math.round(xcenter.subset(math.index(1))) == Math.round(vcenter[i].subset(math.index(1))) && Math.round(xcenter.subset(math.index(2))) == Math.round(vcenter[i].subset(math.index(2)))) {
            k = k + 1;
            if (Math.round(xin.subset(math.index(0))) == Math.round(vout[i].subset(math.index(0))) && Math.round(xin.subset(math.index(1))) == Math.round(vout[i].subset(math.index(1))) && Math.round(xin.subset(math.index(2))) == Math.round(vout[i].subset(math.index(2))) && Math.round(xout.subset(math.index(0))) == Math.round(vin[i].subset(math.index(0))) && Math.round(xout.subset(math.index(1))) == Math.round(vin[i].subset(math.index(1))) && Math.round(xout.subset(math.index(2))) == Math.round(vin[i].subset(math.index(2)))) {
                continue;
            } else if (Math.round(xin.subset(math.index(0))) == -Math.round(vin[i].subset(math.index(0))) && Math.round(xin.subset(math.index(1))) == -Math.round(vin[i].subset(math.index(1))) && Math.round(xin.subset(math.index(2))) == -Math.round(vin[i].subset(math.index(2))) && Math.round(xout.subset(math.index(0))) == -Math.round(vout[i].subset(math.index(0))) && Math.round(xout.subset(math.index(1))) == -Math.round(vout[i].subset(math.index(1))) && Math.round(xout.subset(math.index(2))) == -Math.round(vout[i].subset(math.index(2)))) {
                continue;
            } else {
                err = err + 1;
                break;
            }
        }
    }
    if (k > 1) {
        err = err + 1;
    }

    return err;
}
