/* global App */

var ApplicationController = Ember.ObjectController.extend({
  currentRouteNameChanged: function() {
    //console.log('currentRouteName: %@'.fmt(this.get('currentRouteName')));
    App.set('currentRouteName', this.get('currentRouteName'));
  }.observes('currentRouteName')
});

export default ApplicationController;