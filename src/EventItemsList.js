import React , {Component} from 'react';
import EventItem from './EventItem.js';
import Grid from 'material-ui/Grid';

class EventItemsList extends Component{
  render() {
    const items = this.props.items.map((item, index) => {
      return (
        <EventItem
          key={index}
          item_id={item.id}
          name={item.name}
          price={item.price}
          count={item.count}
          diffCount={item.diff_count}
          onDiffCountChange={this.props.onDiffCountChange}
          ref={`EventItem-${item.id}`}
        />
      );
    });
    return (
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} md={6}>
          <div>
            {items}
          </div>
        </Grid>
      </Grid>
    );
  }
}



export default EventItemsList;
