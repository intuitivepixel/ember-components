var PostsPostRoute = Ember.Route.extend({
  serialize: function(model) {
    console.log(model.get('slug'));
    return {
      slug: model.get('slug')
    };
  }
});

export default PostsPostRoute;
