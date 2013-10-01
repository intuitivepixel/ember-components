/* global DS */

var PostAdapter = DS.RESTAdapter.extend({
  host: 'http://embercomponents.apiary.io'
});

export default PostAdapter;