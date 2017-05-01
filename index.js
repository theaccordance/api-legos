module.exports = function (legos) {
    var transmission = require('./apps/transmission');

    return {
        transmission: transmission(legos)
    };
};