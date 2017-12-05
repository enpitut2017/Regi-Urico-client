import Card,{ CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { PLUS, MINUS } from './const/const-values';

const styles = {
  marginTop15: {
    marginTop: 15,
  }
};

class EventItem extends Component{
  constructor(props) {
    super(props);
    this.classes = props;
    this.state = {
      diffCount: props.diffCount,
      handleDiffCountChange: props.onDiffCountChange,
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      diffCount: nextProps.diffCount
    });
  }

  onClick(event, type) {
    let newDiffCount = this.state.diffCount;
    switch(type) {
      case MINUS:
        newDiffCount -= 1;
        if (newDiffCount < 0) return;
        break;
      case PLUS:
        newDiffCount += 1;
        if (newDiffCount > this.props.count) return;
        break;
      default:
    };
    this.setState({
      diffCount: newDiffCount,
    });
    this.state.handleDiffCountChange(this.props.item_id, newDiffCount);
  }

  render() {
    return (
      <Card className="EventItem" style={styles.marginTop15}>
        <CardContent>
          <Typography>
            {`${this.props.name} | ${this.props.count}個`}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container>
              <Grid item xs={4}>
               <Button raised color="primary" className={this.classes.button} onClick={(e) => this.onClick(e, MINUS)} >{MINUS}</Button>
              </Grid>
              <Grid item xs={4}>
                <Button>{`${this.state.diffCount}`}</Button>
              </Grid>
              <Grid item xs={4}>
                <Button raised color="accent" onClick={(e) => this.onClick(e, PLUS)} >{PLUS}</Button>
              </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}

export default EventItem;
