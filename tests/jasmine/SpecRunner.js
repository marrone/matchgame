/* global require */

// http://kilon.org/blog/2012/08/testing-backbone-requirejs-applications-with-jasmine/

require.config({
    baseUrl: "../../assets/js",
    urlargs: "cb=" + (new Date()).getTime() + "_" + Math.random(),
    paths: {
        jquery: "lib/jquery.min",
        underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
        backbone_localstorage: "lib/backbone.localStorage",
        es5_shim: "lib/es5-shim.min",
        es5_sham: "lib/es5-sham.min",
        react: "lib/react.min",
        react_backbone: "lib/react.backbone",
        jasmine: "../../tests/jasmine/lib/jasmine-2.0.0-rc5/jasmine",
        jasmine_html: "../../tests/jasmine/lib/jasmine-2.0.0-rc5/jasmine-html",
        jasmine_boot: "../../tests/jasmine/lib/jasmine-2.0.0-rc5/boot",
        spec: "../../tests/jasmine/spec/"
    },
    shim: {
        underscore: { 
            exports: "_" 
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        backbone_localstorage: {
            deps: ["backbone"],
            exports: "Backbone.LocalStorage"
        },
        react: {
            deps: ["es5_shim","es5_sham"],
            exports: "React"
        },
        react_backbone: {
            deps: ["react"],
            exports: "React.createBackboneClass"
        },
        jasmine: {
            exports: "jasmine"
        },
        jasmine_html: {
            deps: ["jasmine"],
            exports: "jasmine"
        },
        jasmine_boot: {
            deps: ["jasmine","jasmine_html"],
            exports: "jasmineboot"
        }
    }
});

require(["underscore","jquery","jasmine_boot"], function(_, $, jasmineBoot) {
    console.log("tests initiated"); 

    var specs = [
        "spec/models/CardSpec"
    ];

    require(specs, function() {
        console.log("specs loaded");

        jasmineBoot.htmlReporter.initialize();
        jasmineBoot.env.execute();
        console.log("jasmine executed");
    });

});
