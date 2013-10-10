var Article = Ember.Object.extend({
  id: null,
  title: '',
  description: '',
  intro: '',
  url: '',
  markdown: '',
  html: '',
  date: '',
  rfc822date: '',
  hasMore: false,
  template: '',
  tags: null,
  safehtml: function() {
    var value = this.get('html');
    return new Ember.Handlebars.SafeString(value);
  }.property('html')
});

export default Article;