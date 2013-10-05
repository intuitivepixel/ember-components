---
id: 1
title: Introduction to Ember Components
description: Why and how to use components in Ember?
template: article.hbs
tags:
  - components
  - ember.js
  - introduction
---

<a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> is one of many new concepts <a href="http://emberjs.com/" target="_blank">Ember.js</a> introduced not long ago, and it gives room for plenty of new patterns to build better and most of all reusable components for your <a href="http://emberjs.com/" target="_blank">Ember.js</a> applications. If you are already familiar with <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> than the concept of <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> should be very familiar to you, however, a component differs from a view which makes it more appropriate for many use cases. Basically a <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> is a view that is completely isolated from the context it is used in, there is no access to the surrounding context like the controller or router. All contextual information is passed in.

> **Quote from the ember website:** Ember's implementation of components tries to be as closely to the Web Components specification as possible. Once Custom Elements are widely available in browsers, you should be able to easily migrate your Ember components to the W3C standard and have them be usable by other frameworks as well that have adopted the new standard. This is so important to us that we are working closely with the standards bodies to ensure our implementation of components matches the roadmap of the web platform.

#### Where would prefer to use a view over a component?

This depends clearly on your use case. But as a rule of thumb, if you need in your view directly access to it's surrounding context like the controller nor route use a <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a>, but if you want to isolate the view and pass in only the information that it needs to work making it agnostically of the context and much more reusable, use a <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a>.

As already mentioned <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> extends from <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> and therefore inherits all of <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> attributes and capabilities. But it's the differences to an <a href="http://emberjs.com/api/classes/Ember.View.html" target="_blank">Ember.View</a> which makes an <a href="http://emberjs.com/api/classes/Ember.Component.html" target="_blank">Ember.Component</a> unique of it's kind.