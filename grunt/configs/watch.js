module.exports = function () {
    "use strict";
    return {
        api: {
            files: ['integrations/**/*.js'],
            tasks: ['apidoc']
        }
    };
};