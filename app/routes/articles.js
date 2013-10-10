import Article from 'appkit/models/article';

var ArticlesRoute = Ember.Route.extend({
  model: function() {
    return this.articlesStore;

    // Promise articles load version
    // var articles = Ember.ArrayController.create({
    //   content: [],
    //   sortProperties: ['id'],
    //   sortAscending: true
    // });
    // return new Ember.RSVP.Promise(function(resolve, reject) {
    //   $.getJSON('articles.json', function(data) {
    //     var result = data.forEach(function(article) {
    //         articles.pushObject(Article.create(article));
    //     });
    //     resolve(articles);
    //   }).fail(reject);
    // });
  }
});

export default ArticlesRoute;
