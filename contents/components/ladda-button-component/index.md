---
id: 5
title: Ladda button component
description: Buttons with built-in loading indicators
template: component.hbs
tags:
  - components
  - ember.js
  - ladda
  - button
---

Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta vitae tempora quam officia nihil fuga nostrum inventore eius cupiditate. Harum at alias architecto consequuntur ducimus accusamus sapiente maxime unde.

```javascript
App.EditableViewComponent = Ember.Component.extend({
  actions: {
    toggleEditing: function() {
      this.toggleProperty('isEditing');
    }
  },
  focusOut: function() {
    this.send('toggleEditing');
  }
});
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, animi omnis culpa voluptatum quis corporis aliquam natus fugiat ut sit at facilis nostrum alias obcaecati est exercitationem vitae voluptas recusandae.