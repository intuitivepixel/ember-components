var IntroRoute = Ember.Route.extend({
  model: function() {
    var articles = [];
    //return this.store.find('articles');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.getJSON('articles.json', function(data) {

        var firstArticleHTML = '';
        var result = data.forEach(function(article) {
          if(article.id && article.id === 1){
            firstArticleHTML = new Ember.Handlebars.SafeString(article.html);
          }
        });

        resolve(firstArticleHTML);

      }).fail(reject);
    });
  }
});

export default IntroRoute;
