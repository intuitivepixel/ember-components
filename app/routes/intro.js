var IntroRoute = Ember.Route.extend({
  model: function() {
    var posts = [];
    //return this.store.find('post');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.getJSON('blog.json', function(data) {

        //var result = data.rows.map(function(doc) {
          //console.log('Doc id: %@'.fmt(doc));
          //console.log(new Ember.Handlebars.SafeString(data[0].html));
          //return App.Component.create(doc.value);
        //});

        resolve(new Ember.Handlebars.SafeString(data[1].html));

      }).fail(reject);
    });
  },
  afterModel: function() {
    // var components = [];
    // return new Ember.RSVP.Promise(function(resolve, reject) {
    //   $.getJSON('http://ember-components.com/api/v1/get_posts?callback=?', function(data) {

    //     var result = data.posts.map(function(doc) {
    //       console.log(doc);
    //       //return App.Component.create(doc.value);
    //     });

    //     // data.rows.forEach(function(doc){
    //     //   var c = App.Component.create(doc.value);
    //     //   console.log('Doc id: %@'.fmt(doc.id));
    //     //   components.pushObject(c);
    //     // });

    //     resolve(result);

    //   }).fail(reject);
    // });
  }
});

export default IntroRoute;
