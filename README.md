Description:

Tech:
- SMACSS inspired CSS organization: http://smacss.com/
- Grunt build setup: http://coding.smashingmagazine.com/2013/10/29/get-up-running-grunt/
- Sass/Compass/Susy
- CSS buttons and elements from http://Tophat.io
- Backbone MVC: http://backbonejs.org/
- Reactjs Views: http://facebook.github.io/react/

Instructions:

Setup:
$ gem install compass susy
$ npm install

Building:
Uses Gruntjs to watch the directory for changes
$ grunt watch

TODO:
-------
- IE9: card flip animation
- Bonus: for getting the flipping animation to work in IE8.
- fix ie8 excanvas brokenness
- requirejs
- jasmine tests
- grunt complexity
    "maxparams": 4,
    "maxdepth": 4,
    "maxstatements": 20,
    "maxcomplexity": 7,
    "maxlen": 100
    https://github.com/vigetlabs/grunt-complexity
- all cards flip over when game is over
- fix pause bug
