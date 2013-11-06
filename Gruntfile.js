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
                        "assets/js/lib/es5-shim.min.js",
                        "assets/js/lib/es5-sham.min.js",
                        "assets/js/lib/react.min.js",
                        "assets/js/lib/react.backbone.js",
                        "assets/js/models/card.js",
                        "assets/js/models/game.js",
                        "assets/js/models/playerGame.js",
                        "assets/js/collections/cards.js",
                        "assets/js/collections/playerGames.js",
                        "assets/js/views/clock.js",
                        "assets/js/views/gameStatus.js",
                        "assets/js/views/nav.js",
                        "assets/js/views/card.js",
                        "assets/js/views/cards.js",
                        "assets/js/views/topScoreModal.js",
                        "assets/js/app.js"
                    ]
                }
            }
        },

        react: {
            options: {
                extension: 'jsx',
                ignoreMTime: false
            },
            app: {
                files: {
                    'assets/js/views': 'assets/jsx/views'
                }
            },
        },

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: false,
                    consolidateViaSelectors:    false,
                    consolidateMediaQueries:    false
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

        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['uglify']
            },
            jsx: {
                files: ['assets/jsx/**/*.jsx'],
                tasks: ['react']
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
