function init(grunt) {
    "use strict";
    function loadConfig(pattern) {
        var config = {},
            fileName,
            fileData;

        grunt.file.expand(pattern).forEach(function (filePath) {
            fileName = filePath.split('/').pop().split('.')[0];
            fileData = require('./' + filePath)(grunt);
            config[fileName] = fileData;
        });

        return config;
    }

    function loadGrunt() {
        var config = {
            pkg: grunt.file.readJSON('package.json')
        };

        require('load-grunt-tasks')(grunt);

        if (grunt.file.exists('grunt/tasks')) {
            grunt.log.writeln('task directory found, loading tasks...');
            grunt.loadTasks('grunt/tasks');
        }

        grunt.util._.extend(config, loadConfig('grunt/configs/**/*.js'));

        grunt.initConfig(config);

        console.log('Legos-api build system:');
    }
    loadGrunt();

    grunt.registerTask('default', ['clean', 'apidoc', 'connect', 'watch']);
}

module.exports = init;
