/* global DS */
var Post = DS.Model.extend({
  status: DS.attr('string'),
  title: DS.attr('string'),
  slug: DS.attr('string'),
  body: DS.attr('string'),
  excerpt: DS.attr('string'),
  crated_at: DS.attr('date'),
  modified_at: DS.attr('date'),
  author: DS.attr('string')
});

export default Post;