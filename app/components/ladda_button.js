/* global Ladda */

var LaddaButtonComponent = Ember.Component.extend({
  buttonInstance: null,
  dataStyle: 'expand-right',
  initButton: function() {
    // Create a new instance of ladda for the specified button
    var l = Ladda.create(document.querySelector('.ladda-button'));
    this.set('buttonInstance', l);

    // Start loading
    //l.start();

    // Will display a progress bar for 50% of the button width
    //l.setProgress( 0.5 );

    // Stop loading
    //l.stop();

    // Toggle between loading/not loading states
    //l.toggle();

    // Check the current state
    //l.isLoading();
  }.on('didInsertElement'),
  click: function() {
    this.get('buttonInstance').toggle();
  }
});

export default LaddaButtonComponent;