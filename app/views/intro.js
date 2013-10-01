/* global Prism */
var IntroView = Ember.View.extend({
  highlightCode: function() {
    Prism.highlightAll();
  }.on('didInsertElement')
});

export default IntroView;