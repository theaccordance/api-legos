module.exports = function (grunt) {
    return {
        homepage: {
            options: {
                base: 'public',
                branch: 'gh-pages'
            },
            src: '**/*'
        }
    };
};
