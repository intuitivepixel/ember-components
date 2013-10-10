import Element from 'appkit/models/element';

var ElementsRoute = Ember.Route.extend({
  model: function() {
    return this.elementsStore;
  }
});

export default ElementsRoute;
