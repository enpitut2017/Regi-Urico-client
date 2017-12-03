import { Drawer, List, ListItem, ListItemText } from 'material-ui';
import React from 'react';

const styles = {
  eventsList: {
    width: 250,
  }
}

/**
 * イベントリスト選択用のDrawerを表示する
 * @param {object} props = {
 *    events: array of {id: integer, name: string}
 *    open: bool
 *    onClick: event:object => void
 *    onRequestClose: event:object => void
 * }
 */
const EventsListDrawer = props => {
  const events = props.events.map((event, index) => {
    return (
      <ListItem
        button
        key={index}
        event_id={event.id}
        name={event.name}
        onClick={() => props.onClick(event.id)}
      >
        <ListItemText primary={event.name}/>
      </ListItem>
    );
  });
  return (
    <Drawer open={props.open} onRequestClose={props.onRequestClose}>
      <div tabIndex={0} role="button">
        <div style={styles.eventsList}>
          <List>
            {events}
          </List>
        </div>
      </div>
    </Drawer>
  );
}

export default EventsListDrawer;
