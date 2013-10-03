---
title: Introduction to Ember Components
description: Why and how to use components in Ember?
id: 1
template: post.hbs
---

### Introduction

<a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> is one of many new concepts <a href="http://emberjs.com/" target="_blank">Ember.js</a> has, and it is the way to go if you want to build better and most of all reusable components for your <a href="http://emberjs.com/" target="_blank">Ember.js</a> applications. If you are already familiar with <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> than the concept of <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> should be very clear to you, altough it has it's differences which makes it more appropriate for most implementation cases, where separation of concerns is written in bold.


### What is a Ember.Component and how does it differ from a Ember.View?

An Ember.View is currently limited to the tags that are created for you by the W3C. But if you wanted to define your own application-specific HTML tags and then implement their behavior using JavaScript? You can't do this actually with a Ember.View. That's exactly what components let you do. In fact, it's such a good idea that the W3C is currently working on the Custom Elements spec. Ember's implementation of components tries to be as closely to the Web Components specification as possible. Once Custom Elements are widely available in browsers, you should be able to easily migrate your Ember components to the W3C standard and have them be usable by other frameworks as well that have adopted the new standard.

**Quote from the ember website**

> This is so important to us that we are working closely with the standards bodies to ensure our implementation of components matches the roadmap of the web platform.

Also important to note is that a <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> is actually a <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> (a subclass) but that is completely isolated. Property access in its templates go to the view object and actions are targeted also at the view object. There is no access to the surrounding context or outer controller all contextual information is passed in, which is not the case with a <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> which indeed has access to it's surrounding controller, for example inside a view you could do something like `this.get('controller')` which would give you the controller currently associated with the view.

So, the main difference besides that components let you create your own tags and in some point in the future when Custom Elements are available also migrate/use those components in other frameworks that will support custom elements, is indeed that at some point an ember component will make a view somewhat obsolete depending on the specific implementation case.

And what would be a common example where I would prefer to use a view over a component and vice versa? Following the above this depends clearly on your use cases. But as a rule of thumb, if you need in your view access to it's surrounding controller etc. use a Ember.View, but if you want to isolated the view and pass in only the information that it needs to work making it agnostically of the context and much more reusable, use a <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a>.

As already mentioned <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> extends from <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> and therefore inherits all of <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> atteibutes and capabilities. But it's the differences to an <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> which makes an <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> unique of it's kind. When a <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> is used to backup a template or even as a separate view with some kind of functionality, this view has by default access to the context it is rendered into. Imagine you have a <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> which is a simple wrapper for the HTML img tag, this view would look something like this:

```[.language-javascript]
App.PlaceHolderImageView = Ember.View.extend({
  tagName: 'img',
  attributeBindings: ['src', 'width', 'height']
  src: 'http://placehold.it/200x200',
  width: '200',
  heght: '200'
});
```

### Sending actions from inside a component

The way <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a>'s work is to be agnostic to other parts of your application, therefore rather then passing in a controller on which you want an action to be called on when something happens in your component, you do it more like in this way:

```[.language-javascript]
App.ApplicationController = Ember.ObjectController.extend({
  actions: {
    actionNameOnTheController: function() {
      console.log('actionNameOnTheController called');
    }
  }
});
```
```[.language-html]
{{some-test action="actionNameOnTheController"}}
```

As you can see you set the action attribute to the action name on your controller, and then inside your component you simply call `this.sendAction('action')` which will trigger whatever action name you defined earlier:

```[.language-javascript]
App.SomeTestComponent = Ember.Component.extend({
  click : function(){
    this.sendAction('action');
  }
});
```

So now, whenever click is invoked it will send the action `actionNameOnTheController` to whatever controller is listening to it. And best of all, without knowing nothing about the controller. This is the kind of functionality that makes <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a>'s reusable in any way.

### Create a simple timer component

For the sake of simplicity we are going to create a simple timer using the component pattern. The timer will include a start, stop and reset buttons which will be used to control the timer. We are also going to make the timer dispatch actions whenever it starts, stops and ticks. The full code for the timer component will be the belove:

 ```[.language-javascript]
 App.MomentTimerComponent = Ember.Component.extend({
  seconds: 0,
  timerId: null,
  timerRunning: false,
  actions: {
    scheduleTimer: function() {
      this.set('timerId', Ember.run.later(this, function() {
        this.set('timerRunning', true);
        this.incrementProperty('seconds');
        this.send('scheduleTimer');
        this.sendAction('tick');
      }, 1000));
    },
    stopTimer: function() {
      this.set('timerRunning', false);
      Ember.run.cancel(this.get('timerId'));
    },
    resetTimer: function() {
      this.send('stopTimer');
      this.set('seconds', 0);
    }
  },
  startTimer: function() {
    this.send('scheduleTimer');
  }.on('didInsertElement')
});
 ```
 
 Now let's dissect the code and go trough every bit by explaining what is does. First of the component structure:
 
 ```[.language-javascript]
 App.MomentTimerComponent = Ember.Component.extend({
  seconds: 0,
  timerId: null,
  timerRunning: false,
  actions: {
    scheduleTimer: function() {
    },
    stopTimer: function() {
    },
    resetTimer: function() {
    }
  },
  startTimer: function() {
  }.on('didInsertElement')
});
 ```
`seconds`, `timerId` and `timerRunning` are just local variables to hold the component's state. `seconds` will represent the current elapsed seconds at every moment while the timer is running, to know if the timer is currently running we make use of the `timerRunning` flag that will be a simple boolean. `timerId` will hold the id the call to `Ember.run.later` returns, we will use this id to be able to get hold of the timer when we want to stop/cancel it's execution. `scheduleTimer`, `stopTimer` and `resetTimer` are very much self explanatory as we will se in a moment. `startTimer` which is bound to the component's `didInsertElement` hook is just a helper function that starts the timer right away when it was inserted into the DOM. No let's implement the actual code to make this function do what they are supposed to.

We beginn by defining the main function `scheduleTimer`.

 ```[.language-javascript]
scheduleTimer: function() {
  this.set('timerId', Ember.run.later(this, function() {
    this.set('timerRunning', true);
    this.incrementProperty('seconds');
    this.send('scheduleTimer');
    this.sendAction('tick');
  }, 1000));
}
```