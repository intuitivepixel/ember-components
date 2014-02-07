/* global Hogan */

var TypeaheadInputfieldComponent = Ember.Component.extend({
  remote: '',
  didInsertElement: function() {
    this.$('#inputSearch').typeahead({
      name: 'components',
      remote: this.get('remote'),
      template: [
        '<div class="row"><p class="suggestion-title">{{name}}</p><p class="suggestion-version pull-right">{{version}}</p></div>',
        '<p class="suggestion-description">{{description}}</p>'
      ].join('')
    });
  },
  willDestroyElement: function() {
    this.$('#inputSearch').typeahead('destroy');
  }
});

export default TypeaheadInputfieldComponent;