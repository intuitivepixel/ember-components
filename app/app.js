import Resolver from 'resolver';
import registerComponents from 'appkit/utils/register_components';

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
  currentRouteName: '',
});

App.initializer({
  name: 'Register Components',
  initialize: function(container, application) {
    registerComponents(container);
  }
});

init();

function init() {
  initHelpers();
}

function initHelpers() {
  import safestring from 'appkit/helpers/safestring';
}

export default App;
