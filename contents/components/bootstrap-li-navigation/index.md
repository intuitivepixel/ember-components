---
id: 7
title: Bootstap list navigation
description: Setting 'active' class to parent list elements
template: component.hbs
tags:
  - bootstrap
  - ember.js
  - navigation
  - links
---


If you've ever tried to use Twitter Bootstrap with Ember, you'll have hit this problem. The `active` class for links in bootstrap that are in a list of links needs to be on the li element, not on the link:

```html
<li class="active">
  <a href="/dashboard">Dashboard</a>
  <a href="/profile">Profile</a>
</li>
```

The component is implemented like this - no template necessary:

```javascript
App.LinkLiComponent = Em.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active')
});
```

Usage: this is how our final page template will look like:

```xml
<script type="text/x-handlebars"  data-template-name="index">
  {{#link-li}}
    {{#link-to 'dashboard'}}
      Dashboard
    {{/link-to}}
  {{/link-li}}
  {{#link-li}}
    {{#link-to 'profile'}}
      Profile
    {{/link-to}}
  {{/link-li}}
</script>
```

Original article: [http://discuss.emberjs.com/t/bootstrap-active-links-and-lis/5018/7](http://discuss.emberjs.com/t/bootstrap-active-links-and-lis/5018/7) by (@alexspeller)[http://discuss.emberjs.com/users/alexspeller/]