module.exports = function () {
    "use strict";
    return {
        api: {
            files: ['apps/**/*.js'],
            tasks: ['apidoc']
        }
    };
};