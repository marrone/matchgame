/* global require */

require.config({
    //baseUrl: "",
    paths: {
        jquery: "lib/jquery.min",
        underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
        backbone_localstorage: "lib/backbone.localStorage",
        es5_shim: "lib/es5-shim.min",
        es5_sham: "lib/es5-sham.min",
        react: "lib/react.min",
        react_backbone: "lib/react.backbone"
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
        }
    }
});

require(["controllers/app"], function() {
    console.log("app initiated");
});
