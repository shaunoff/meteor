import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import Items from "./items"

Meteor.methods({
  insertNewItem(item) {
    Items.insert({
      name: item
    });
  }
});
