import React , {Component} from 'react';
import EditableEventItem from './EditableEventItem.js';

class EditableEventItemsList extends Component{
  render() {
    const items = this.props.items.map((item, index) => {
      return (
        <EditableEventItem
          key={index}
          item_id={item.item_id}
          name={item.name}
          price={item.price}
          count={item.count}
          handleDeleteClick={this.props.handleDeleteClick}
          handleEditClick={this.props.handleEditClick}
          ref={`EditableEventItem-${item.item_id}`}
        />
      );
    });
    return (
      <div>
        {items}
      </div>
    );
  }
}



export default EditableEventItemsList;