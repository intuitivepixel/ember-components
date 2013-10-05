var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function(){
  this.resource('intro', {path: '/'});
  this.resource('articles', {path: '/articles'}, function(){
    this.route('article', {path: ':slug'});
  });
  this.resource('elements', {path: '/components'}, function(){
    this.route('element', {path: ':element_id'});
  });
  this.resource('contribute');
  this.resource('about');
});

export default Router;
