var ArticlesStore = Ember.ArrayController.extend({
  content: [],
  sortProperties: ['id'],
  sortAscending: true
});

export default ArticlesStore;