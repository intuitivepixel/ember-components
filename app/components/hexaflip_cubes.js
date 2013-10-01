/* global HexaFlip */

var HexaflipCubesComponent = Ember.Component.extend({
  debug: function() {
    debugger;
  }.on('init'),
  chars: 'EMBER',
  waitForLoop: 5000,
  flipInterval: 3000,
  waitForFirstFlipInterval: 1000,
  hexaflipCubes: null,
  actions: {
    reInitialize: function() {
      var chars = this.get('chars').split('');
      this.get('hexaflipCubes').setValue(this.getSequence(chars, false, false));
    }
  },
  makeObject: function(a){
      var o = {};
      for(var i = 0, l = a.length; i < l; i++){
          o['letter' + i] = a;
      }
      return o;
  },
  getSequence: function(a, reverse, random){
      var o = {}, p;
      for(var i = 0, l = a.length; i < l; i++){
          if(reverse){
              p = l - i - 1;
          }else if(random){
              p = Math.floor(Math.random() * l);
          }else{
              p = i;
          }
          o['letter' + i] = a[p];
      }
      return o;
  },
  initHexaflip: function () {
    debugger;
    var hexaflipCubes, elements, sets,
    waitForLoop = this.get('waitFor'),
    flipInterval = this.get('flipInterval'),
    waitForFirstFlipInterval = this.get('waitForFirstFlipInterval'),
    chars = this.get('chars').split(''),
    logoSettings = {
      size: 90,
      margin: 8,
      fontSize: 58,
      perspective: 450
    };

    elements = document.getElementsByClassName('cubes-logo');
    sets = this.makeObject(chars);

    hexaflipCubes = new HexaFlip(elements[0], sets, logoSettings);
    this.set('hexaflipCubes', hexaflipCubes);

    Ember.run.later(this, function(){
        hexaflipCubes.setValue(this.getSequence(chars, false, false));
    }, 0);

    Ember.run.later(this, function(){
        hexaflipCubes.setValue(this.getSequence(chars));
    }, waitForFirstFlipInterval);

    Ember.run.later(this, function(){
        var self = this;
        window.setInterval(function(){
            var pseudoRandom = (Math.random() > 0.5);
            hexaflipCubes.setValue(self.getSequence(chars, false, pseudoRandom));
        }, flipInterval);
    }, waitForLoop);
  }.on('didInsertElement')
});

export default HexaflipCubesComponent;
