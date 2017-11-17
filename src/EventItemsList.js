import React , {Component} from 'react';
import EventItem from './EventItem.js';

class EventItemsList extends Component{
  render() {
    const items = this.props.items.map(item => {
      return <EventItem key={item.item_id} name={item.name} count={item.count}/>;
    });
    return <div className="EventItemList">{items}</div>
  }
}



export default EventItemsList;