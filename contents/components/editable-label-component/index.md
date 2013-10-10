---
id: 6
title: Inplace editable label
description: View editable in-place
template: component.hbs
tags:
  - components
  - ember.js
  - view
  - editable
  - label
---

Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta vitae tempora quam officia nihil fuga nostrum inventore eius cupiditate. Harum at alias architecto consequuntur ducimus accusamus sapiente maxime unde.

```javascript
App.IndexController = Ember.Controller.extend({
  someProperty: 'This text is editable',
  itChanged: function() {
    console.log('itChanged');
  }.observes('someProperty')
});
```

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

```xml
<script type="text/x-handlebars" id="components/editable-view">
  {{#if isEditing}}
    <form {{action "toggleEditing" on="submit"}}>
      {{yield}}
    </form>
  {{else}}
    <span id="a" {{action "toggleEditing" target="view"}}>
      {{text}}
    </span>
  {{/if}}
</script>
```

```xml
<script type="text/x-handlebars"  data-template-name="index">
  Click on the text below to edit
  {{#editable-view text=someProperty}}
    {{input value=someProperty}}
  {{/editable-view}}
</script>
```