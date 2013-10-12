/* global console */
var ElementsElementRoute = Ember.Route.extend({
  model: function(params) {
    var id = parseInt(params.element_id, 10);
    var item = this.elementsStore.find(function(item){
      return  (item.get('id') === id);
    });
    return item;
  }
});

export default ElementsElementRoute;
