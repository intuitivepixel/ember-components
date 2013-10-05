/* global Handlebars, moment */

Ember.Handlebars.helper('moment', function(value, options) {
  return moment(value).format('dddd, MMMM Do YYYY, h:mm:ss a');
});

export default {};