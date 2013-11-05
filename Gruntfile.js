module.exports = function(grunt) {

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['index.html']
            }
        },

        uglify: {
            build: {
                files: {
                    'build/js/app.min.js': [
                        "assets/js/lib/jquery.min.js",
                        "assets/js/lib/underscore-min.js",
                        "assets/js/lib/backbone-min.js",
                        "assets/js/lib/backbone.localStorage.js",
                        "assets/js/lib/react-with-addons.min.js",
                        "assets/js/lib/react.backbone.js",
                        "assets/js/app.js"
                    ]
                }
            }
        },

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'build/css/app.css': 'build/css/app.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'build/css/app.css',
                dest: 'build/css/app.css'
            }
        },

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        sass: {
            build: {
                files: {
                    'build/css/app.css': 'assets/sass/app.scss',
                    'build/css/ie.css': 'assets/sass/ie.scss'
                }
            }
        },

        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['buildcss']
            }
        }
    });

    grunt.registerTask("default", []);
    grunt.registerTask('buildcss',  ['compass', 'cssc', 'cssmin']);

};
