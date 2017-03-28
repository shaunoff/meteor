import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Item from './components/Item';
import Uploader from './components/Uploader'
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
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <main style={{width:"800px"}}>

        <Uploader/>
          <div style={{display: 'flex', flexDirection: 'column'}}>
          {this.props.items.map((item) => {
            return <Item item={item} key={item._id}/>
          })}
        </div>
      </main>
    </div>
    );
  }
}

export default createContainer(({params}) => {
  let itemsSub = Meteor.subscribe('allItems');


  let itemsArray = Items.find({}, {sort: {'added': -1}}).fetch();

  return {
    ready: itemsSub.ready(),
    items: itemsArray
  }
}, App);
