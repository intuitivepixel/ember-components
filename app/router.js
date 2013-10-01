var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function(){
  this.resource('intro', {path: '/'});
  this.resource('posts', {path: '/posts'}, function(){
    this.route('post', {path: ':slug'});
  });
});

export default Router;
