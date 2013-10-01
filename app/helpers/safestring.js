/* global Handlebars */

Ember.Handlebars.helper('safestring', function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return new Handlebars.SafeString(value);
});

export default {};