---
title: Introduction to Ember Components
description: Why and how to use components in Ember?
id: 1
template: post.hbs
---

### Introduction

<a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> is one of many new concepts <a href="http://emberjs.com/" target="_blank">Ember.js</a> introduced not long ago, and it gives room for plenty of new patterns to build better and most of all reusable components for your <a href="http://emberjs.com/" target="_blank">Ember.js</a> applications. If you are already familiar with <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> than the concept of <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> should be very familiar to you, however, a component differs from a view which makes it more appropriate for many use cases. Basically a <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> is a view that is completely isolated from the context it is used in, there is no access to the surrounding context like the controller or router. All contextual information is passed in.

**Quote from the ember website**

> Ember's implementation of components tries to be as closely to the Web Components specification as possible. Once Custom Elements are widely available in browsers, you should be able to easily migrate your Ember components to the W3C standard and have them be usable by other frameworks as well that have adopted the new standard.

> This is so important to us that we are working closely with the standards bodies to ensure our implementation of components matches the roadmap of the web platform.

### Where would prefer to use a view over a component?

This depends clearly on your use case. But as a rule of thumb, if you need in your view directly access to it's surrounding context like the controller nor route use a <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a>, but if you want to isolate the view and pass in only the information that it needs to work making it agnostically of the context and much more reusable, use a <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a>.

As already mentioned <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> extends from <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> and therefore inherits all of <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> attributes and capabilities. But it's the differences to an <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> which makes an <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> unique of it's kind.

### Create a simple timer component

Now, because code say's more than a thousand words, let's create a simple component that try's to showcase all of the component advantages and functionality.

For the sake of simplicity we are going to create a simple timer using the component pattern. The timer will include beside showing the elapsed seconds start, stop and reset buttons which will be used to control the timer. We are also going to make the timer dispatch actions whenever it starts, stops and ticks.

 First of let's create a structure for the functionality we are going to implement. The component structure looks like this:

 ```[.language-javascript]
 App.BasicTimerComponent = Ember.Component.extend({
  seconds: 0,
  timerId: null,
  timerRunning: false,
  actions: {
    scheduleTimer: function() {
      // TODO
    },
    stopTimer: function() {
      // TODO
    },
    resetTimer: function() {
      // TODO
    }
  },
  startTimer: function() {
      // TODO
  }.on('didInsertElement')
});
 ```
`seconds`, `timerId` and `timerRunning` are just local variables to hold the component's state. `seconds` will represent the current elapsed seconds at every moment while the timer is running, it will be also used in our component's template as we will se later. To know if the timer is currently running we make use of the `timerRunning` flag that will be a simple boolean. `timerId` will hold the id that the call to `Ember.run.later` returns, we will use this id to be able to get hold of the timer when we want to stop/cancel it's execution. `scheduleTimer`, `stopTimer` and `resetTimer` are very much self explanatory as we will se in a moment. `startTimer` which is bound to the component's `didInsertElement` hook is just a helper function that start's the timer right away when it was inserted into the DOM. No let's implement the actual code to make this function do what they are supposed to.

We beginn by defining the main function `scheduleTimer`.

 ```[.language-javascript]
scheduleTimer: function() {
  this.set('timerId', Ember.run.later(this, function() {
    this.set('timerRunning', true);
    this.incrementProperty('seconds');
    this.send('scheduleTimer');
  }, 1000));
}
```
Ok, let's dissect this bit by bit, we set the `timerId` to the number `Ember.run.later` returns. Inside the run later function we set our local flag `timerRunning` then go on using `this.incrementProperty('seconds');` to increment the seconds variable by 1, and since we have setup run later to run after 1000 milliseconds and then stop, we need a way to re-invoke this method again, we do this just bu recursive calling the `scheduleTimer` with `this.send('scheduleTimer');`. Basically `Ember.run.later` will run the code inside after on second and stop, but with the recursive call we are re-scheduling it again and again until something else stop's the timer.

### Sending actions from a component to the outside world

The way <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a>'s work is to be agnostic to other parts of your application, therefore rather then passing in a controller reference on which you want an action to be called, the component will notify you about this instead.

At this point to make this example more clear let's create the surrounding code we are going to talk about before we finish out time component implementation.

This will be our application template where we are going to use our component:

```[.language-html]
<script type="text/x-handlebars">
  <h3>Timer Component</h3>
  {{basic-timer}}
</script>
```

And this is the simple `ApplicationController` that will listen to the component dispached action:

```[.language-javascript]
App.ApplicationController = Ember.ObjectController.extend({
  actions: {
    timerTicked: function() {
      console.log('timer ticked');
    }
  }
});
```

So now, let's assume we want to be notified whenever the timer ticks, to be able to do that we add `this.sendAction();` inside our `scheduleTimer` function defined earlier.

 ```[.language-javascript]
scheduleTimer: function() {
  this.set('timerId', Ember.run.later(this, function() {
    this.set('timerRunning', true);
    this.incrementProperty('seconds');
    this.send('scheduleTimer');
    this.sendAction();
  }, 1000));
}
```
Right now nothing has changed since we have still not wired up the listening controller and the component, so let's do this:

```[.language-html]
<script type="text/x-handlebars">
  <h3>Timer Component</h3>
  {{basic-timer action="timerTicked"}}
</script>
```
As you can see by adding `action="timerTicked"` will do two things for us, first whenever `this.sendAction();` is invoked it will dispatch the action defined inside the `action="..."` declaration and because we have such an action in our `ApplicationController` which back's up the template where we use the component, the action `timerTicked` will be called on the controller resulting in a console log `timer ticked`.

The beauty about this approach is that the component knows nothing about the controller resulting in a lousely coupled architecture and it is this kind of functionality that makes <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a>'s reusable in any way.

Before going any further let's see the implementation of what we have until now running:

<iframe src="http://jsbin.com/EsAval/1/embed?output" class="jsbin-embed" id="" style="border: 1px solid rgb(170, 170, 170); width: 100%; min-height: 450px; height: 44px;"></iframe>

At this point we know all the features to finish our component with the rest of the implementation.

As we saw earlier in `scheduleTimer` we set the returning id from the call to `Ember.run.later` to the component local variable `timerId`, let's now use this id to stop the timer execution. We are also going to provide a button in our component template to invoke the `stopTimer` function. `Ember.run` supports canceling a started timeout with `Ember.run.cancel(timerId);` this is now what we are going to use inside our `stopTimer` function to do that. For later use we are also going to set the flag `timerRunning` to false.

```[.language-javascript]
stopTimer: function() {
  Ember.run.cancel(this.get('timerId'));
  this.set('timerRunning', false);
},
```
And we add also a button which will execute the `stopTimer` action:

```[.language-html]
<script type="text/x-handlebars">
  <h3>Timer Component</h3>
  {{basic-timer action="timerTicked"}}
  <button {{action stopTimer}}>Stop</button>
</script>
```

Let's follow along this pattern and implement the missing functionality, starting the timer again after we stopped it, and also adding a reset button that will reset the seconds variable stop the timer and prepares it for a new start by calling `scheduleTimer` again.

Here the full code for the timer component:

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
And here the fully functional timer component. Note that we have also some extra css in place which will make our component looking nicer, but you don't need any of the css and the component will still be full functional.

Finished Timer Component

<iframe src="http://jsbin.com/UDUDovi/14/embed?output" class="jsbin-embed" id="" style="border: 1px solid rgb(170, 170, 170); width: 100%; min-height: 450px; height: 44px;"></iframe>

I hope you enjoyed this introduction as much as I enjoyed writing it, and if you have any comments please leave them below.

