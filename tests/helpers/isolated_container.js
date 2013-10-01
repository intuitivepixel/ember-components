import Resolver from 'resolver';

function isolatedContainer(fullNames) {
  var container = new Ember.Container();
  var resolver = Resolver.create();

  resolver.namespace = {
    modulePrefix: 'appkit'
  };

  for (var i = fullNames.length; i > 0; i--) {
    var fullName = fullNames[i - 1];
    container.register(fullName, resolver.resolve(fullName));
  }

  return container;
}

export default isolatedContainer;
