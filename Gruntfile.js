module.exports = function(grunt) {

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        // https://github.com/dylang/grunt-notify
        notify_hooks: {
            options: {
                enabled: true,
                //title: "Project Name", // defaults to the name in package.json, or uses project's directory name, you can change to the name of your project
                max_jshint_notifications: 5 // maximum number of notifications from jshint output
            }
        },

        // https://github.com/yaniswang/grunt-htmlhint
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
                    //'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['index.html']
            }
        },

        requirejs: {
            compile: {
                // https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: "assets/js",
                    name: "lib/almond",
                    mainConfigFile: "assets/js/main.js",
                    include: ["controllers/app"],
                    insertInclude: ["controllers/app"],
                    out: "build/js/app.min.js",
                    almond: true,
                    optimize: "uglify2",
                    generateSourceMaps: false,
                    preserveLicenseComments: false,
                    done: function(done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }

                        done();
                    }
                }
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
                        "assets/js/widgets/clock.js",
                        "assets/js/widgets/canvasWriter.js",
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
                        "assets/js/views/topScore.js",
                        "assets/js/views/topScoreModal.js",
                        "assets/js/app.js"
                    ]
                }
            }
        },

        // https://github.com/gruntjs/grunt-contrib-jshint
        jshint: {
            files: ['Gruntfile.js', 'assets/js/**/*.js'],
            options: {
                ignores: ["assets/js/lib/*.js"]
            }
        },

        // https://github.com/vigetlabs/grunt-complexity
        complexity: {
            generic: {
                src: ['assets/js/**/*.js', '!assets/js/lib/**/*.js'],
                options: {
                    jsLintXML: 'reports/complexity-report.xml', // create XML JSLint-like report
                    checkstyleXML: 'reports/complexity-checkstyle.xml', // create checkstyle report
                    errorsOnly: true, // show only maintainability errors
                    cyclomatic: 5,
                    halstead: 20,
                    maintainability: 100
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
                tasks: ['jshint', 'complexity', 'requirejs'/*'uglify'*/]
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
    grunt.registerTask('jscomplexity',  ['complexity']);
    grunt.registerTask('hint',  ['jshint','htmlhint']);
    grunt.registerTask("jsx", ["react", "jshint"]);

    grunt.task.run('notify_hooks');

};
