
var MasonryGridComponent = Ember.Component.extend({
  didInsertElement: function() {
    var container = this.$('#masonry-container').masonry({
      columnWidth: 60,
      itemSelector: '.item'
    });

    container.on( 'click', '.item-content', function() {
      $(this).parent('.item').toggleClass('is-expanded');
      container.masonry();
    });
  }
});

export default MasonryGridComponent;