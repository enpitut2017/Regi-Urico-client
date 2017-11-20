import React , {Component} from 'react';
import EventItem from './EventItem.js';
import 'flexboxgrid';

class EventItemsList extends Component{
  render() {
    const items = this.props.items.map((item, index) => {
      return (
        <EventItem
          key={index}
          item_id={item.item_id}
          name={item.name}
          count={item.count}
          diffCount={item.diff_count}
          ref={`EventItem-${item.item_id}`}
        />
      );
    });
    return (
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1" ref="EventItemList">
          {items}
        </div>
      </div>
    );
  }
}



export default EventItemsList;