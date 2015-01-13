/*jshint globalstrict:true, devel:true */
/* global require, module, setTimeout */
'use strict';

module.exports = function (grunt) {

    var staticDirectory = 'jiraflow/retail/static/';

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var reloadPort = 35729, files;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Precompile JS for use in the browser via require()
        browserify: {
            dev: {
                options: {
                    debug: true,
                    alias: ['react:']  // Make React available externally for dev tools
                },
                src: [staticDirectory + 'js/*.js'],
                dest: staticDirectory + 'bundle.js'
            },
            production: {
                options: {
                    debug: false
                },
                src: '<%= browserify.dev.src %>',
                dest: staticDirectory + 'bundle.js'
            }
        },

        // Compile .less files to CSS
        less: {
            compile: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'styles.css.map',
                    sourceMapFilename: staticDirectory + 'styles.css.map'
                },
                src: staticDirectory + 'less/styles.less',
                dest: staticDirectory + 'styles.css'
            },
        },

        // Live reload
        watch: {
            options: {
                nospawn: true,
                livereload: reloadPort
            },
            js: {
                files: [staticDirectory + 'js/**/*.js', staticDirectory + 'js/**/*.jsx'],
                tasks: ['browserify:dev'],
                options: {
                    livereload: reloadPort
                }
            },
            css: {
                files: [staticDirectory + 'less/**/*.less'],
                tasks: ['less:compile'],
                options: {
                    livereload: reloadPort
                }
            }
        }
    });

    grunt.registerTask('default', ['browserify:dev', 'less:compile']);
};
