import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');
export default Items;

const ItemSchema = new SimpleSchema({
  name: String,

});



Items.attachSchema(ItemSchema);
