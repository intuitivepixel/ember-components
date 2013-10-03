var ElementsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('element');
  }
});

export default ElementsRoute;
