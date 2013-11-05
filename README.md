Description:

Tech:
- SMACSS inspired CSS organization: http://smacss.com/
- Grunt build setup: http://coding.smashingmagazine.com/2013/10/29/get-up-running-grunt/
- Sass/Compass/Susy
- Backbone MVC: http://backbonejs.org/
- React Views: http://facebook.github.io/react/
- Requirejs modular encapsulation

Instructions:

Setup:
$ gem install compass susy
$ npm install

Building:
Uses Gruntjs to watch the directory for changes
$ grunt watch


TODO:
-------
- web audio
  - background music
  - card flip
  - match sound
- options panel
  - turn background music off
  - turn sound effects off
- tabbed footer for instructions
- save best time
- start button in header
- requirejs
  - text template plugin

- Bonus: for getting the flipping animation to work in IE8.
- The game is over once the player has matched all of the cards
- During the game you will need to display a game timer with the time that has passed and the number of failed attempts. 
- Bonus: Display a different message when the game is over based on the number of failed attempts. 
- Extra Bonus: Display the messages using the HML5 canvas element.
