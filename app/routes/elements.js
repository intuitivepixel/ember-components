import Element from 'appkit/models/element';

var ElementsRoute = Ember.Route.extend({
  model: function() {
    var elements = Ember.ArrayController.create({
      content: [],
      sortProperties: ['id'],
      sortAscending: true
    });

    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.getJSON('components.json', function(data) {

        var result = data.forEach(function(element) {
            elements.pushObject(Element.create(element));
        });

        resolve(elements);

      }).fail(reject);
    });
  }
});

export default ElementsRoute;
