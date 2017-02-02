import { Meteor } from 'meteor/meteor';
import Items from '../items';

Meteor.publish('allItems', function() {
  return Items.find({}, {
    limit: 10,
    sort: { lastUpdated: 1 }
  });
});
