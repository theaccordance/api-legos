module.exports = function (legos) {
    var transmission = require('./integrations/transmission/router.js');

    return {
        transmission: transmission(legos)
    };
};