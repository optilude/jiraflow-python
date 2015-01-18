/*jshint globalstrict:true, devel:true */
/* global require, module, setTimeout */
'use strict';

var reactify = require('reactify');

module.exports = function (grunt) {

    var staticDirectory = 'jiraflow/retail/static/';

    // show elapsed time at the end
    // require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var reloadPort = 35729, files;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Precompile JS for use in the browser via require()
        browserify: {
            options: {
                transform: ['reactify'],
                browserifyOptions: {
                    extensions: ['.jsx']
                }
            },

            dev: {
                options: {
                    alias: ['react:'],
                    debug: true
                },

                src: staticDirectory + 'js/app.jsx',
                dest: staticDirectory + 'bundle.js'
            },

            watch: {
                options: {
                    alias: ['react:'],
                    debug: true,
                    watch: true,
                    keepAlive: true
                },
                src: '<%= browserify.dev.src %>',
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

        // Faster version of the above for development
        watchify: {
            options: {
                // defaults options used in b.bundle(opts)
                detectGlobals: true,
                insertGlobals: false,
                ignoreMissing: false,
                debug: false,
                standalone: false,
                keepalive: true,
                callback: function(b) {
                    // configure the browserify instance here
                    // b.add();
                    // b.require();
                    // b.external();
                    // b.ignore();
                    b._extensions.push('.jsx');
                    b.transform(reactify);

                    // return it
                    return b;
                }
            },
            deafult: {
                src: './' + staticDirectory + 'js/app.jsx',
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
                tasks: ['browserify:dev']
            },
            less: {
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
