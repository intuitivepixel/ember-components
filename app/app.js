import Resolver from 'resolver';
import registerComponents from 'appkit/utils/register_components';
import Element from 'appkit/models/element';
import ElementsStore from 'appkit/models/elements_store';
import Article from 'appkit/models/article';
import ArticlesStore from 'appkit/models/articles_store';

var App = Ember.Application.extend({
  LOG_MODULE_RESOLVER: true,
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  //Added for debugging purposes only
  LOG_TRANSITIONS: true,
  LOG_BINDINGS: true,
  LOG_STACKTRACE_ON_DEPRECATION: true,
  LOG_VERSION: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  currentRouteName: ''
});

App.initializer({
  name: 'Register Components',
  initialize: function(container, application) {
    registerComponents(container);
  }
});

App.initializer({
  name: "Preload Components",
  initialize: function(container, application) {
    application.deferReadiness();

    application.register('elementsStore:main', ElementsStore, {singleton: true});
    application.inject('controller', 'elementsStore', 'elementsStore:main');
    application.inject('route', 'elementsStore', 'elementsStore:main');

    var elementsStore = container.lookup('elementsStore:main');

    Ember.$.getJSON('components.json', function(data) {
      var result = data.forEach(function(element) {
          elementsStore.pushObject(Element.create(element));
      });
      application.advanceReadiness();
    });
  }
});

App.initializer({
  name: "Preload Articles",
  initialize: function(container, application) {
    application.deferReadiness();

    application.register('articlesStore:main', ArticlesStore, {singleton: true});
    application.inject('controller', 'articlesStore', 'articlesStore:main');
    application.inject('route', 'articlesStore', 'articlesStore:main');

    var articlesStore = container.lookup('articlesStore:main');

    Ember.$.getJSON('articles.json', function(data) {
      var result = data.forEach(function(article) {
          articlesStore.pushObject(Article.create(article));
      });
      application.advanceReadiness();
    });
  }
});

init();

function init() {
  initHelpers();
}

function initHelpers() {
  import safestring from 'appkit/helpers/safestring';
  import moment from 'appkit/helpers/moment';
}

export default App;
