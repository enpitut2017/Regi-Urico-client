import React, { Component } from 'react';

class EventItem extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="EventItem">
        <div>
          {this.props.name} :  {this.props.count}個
        </div>
      </div>
    );
  }
}

export default EventItem;