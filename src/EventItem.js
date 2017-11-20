import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import 'flexboxgrid';

const styles = {
  marginTop15: {
    marginTop: 15,
  }
};

class EventItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      diffCount: props.diffCount,
    };
  }
  
  onClick(event, type) {
    let newDiffCount = this.state.diffCount;
    switch(type) {
      case '-':
        newDiffCount -= 1;
        if (newDiffCount < 0) return;
        break;
      case '+':
        newDiffCount += 1;
        if (newDiffCount > this.props.count) return;
        break;
      default:
    };
    this.setState({
      diffCount: newDiffCount,
    });
  }
  
  render() {
    return (
      <Card className="EventItem" style={styles.marginTop15}>
        <CardText>{`${this.props.name} | ${this.props.count}個`}</CardText>
        <CardActions>
          <div className="row">
            <div className="col-xs-4">
              <RaisedButton primary={true} label="-" onClick={(e) => this.onClick(e, '-')} />
            </div>
            <div className="col-xs-4">
              <FlatButton label={`${this.state.diffCount}`} />
              {/* {this.state.diffCount} */}
            </div>
            <div className="col-xs-4">
              <RaisedButton secondary={true} label="+" onClick={(e) => this.onClick(e, '+')} />
            </div>
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default EventItem;