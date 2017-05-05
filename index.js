module.exports = function (legos) {
    var transmission = require('./api/transmission/router.js');

    return {
        transmission: transmission(legos)
    };
};