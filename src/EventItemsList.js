import React , {Component} from 'react';
import axios from 'axios';
import EventItem from './EventItem.js';

class EventItemsList extends Component{
	constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items.map(item => {
      return <EventItem name={item.name} count={item.count}/>;
    });
    return <div className="EventItemList">{items}</div>
  }
}



export default EventItemsList;