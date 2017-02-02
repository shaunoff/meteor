import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Item from './Item';

import Items from '../api/items/items';

@autobind
class App extends Component {
  addItems(event) {
    event.preventDefault();
    const item = this.refs.item.value.trim();
    Meteor.call('insertNewItem', item, (err, res) => {
        if(err) {
          console.log('error')
        }
        if(!err) {
          console.log('Success')
        }
      });
    }
  

  render() {
    if (!this.props.ready) {
        return <div>Loading</div>;
    }
    const test = true;
    return (
      <main>

        <form className='new-items' onSubmit={this.addItems}>
          <input type='text' ref='item' />
          <button type='submit'>Add Items</button>
        </form>

          {this.props.items.map((item) => {
            return <Item item={item} key={item._id}/>
          })}

      </main>
    );
  }
}

export default createContainer(({params}) => {
  let itemsSub = Meteor.subscribe('allItems');


  let itemsArray = Items.find({}).fetch();

  return {
    ready: itemsSub.ready(),
    items: itemsArray
  }
}, App);
