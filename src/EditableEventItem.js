import React, { Component } from 'react';
import Card,{ CardContent, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import { COUNT, YEN, } from './const/const-values';

const styles = {
  marginTop15: {
    marginTop: 15,
  },
  centerButtonWraper: {
    textAlign: 'center',
    display: 'block'
  }
};

class EventItem extends Component{
  render() {
    return (
      <Card className="EventItem" style={styles.marginTop15} >
        <CardContent>
          <div style={{textAlign: 'center'}}>
            {this.props.name}
          </div>
          <Grid container style={styles.marginTop15}>
            <Grid item xs={6} style={{textAlign: 'center'}}>
              {`${this.props.price}${YEN}`}
            </Grid>
            <Grid item xs={6} style={{textAlign: 'center'}}>
              {`${this.props.count}${COUNT}`}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={styles.centerButtonWraper}>
          <Button raised color="accent" style={{marginRight: 30}} onClick={this.props.handleDeleteClick(this.props.item_id)}><DeleteIcon/></Button>
          <Button raised color="primary" style={{marginLeft: 30}} onClick={this.props.handleEditClick(this.props.item_id)}><EditIcon/></Button>
        </CardActions>
     </Card>
    );
  }
}

export default EventItem;