import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import RegiIcon from 'material-ui-icons/ShoppingCart';
import ItemIcon from 'material-ui-icons/CardGiftcard';
import EventIcon from 'material-ui-icons/Assignment';
import { withNavigationBar } from './wrapper/withNavigationBar';
import { withAuthorization } from './wrapper/withAuthorization';
import { REGI, ITEMS_DASHBOARD, EVENTS_DASHBOARD } from './const/const-values';

const styles = {
  gridStyle: {
    marginTop: 15
  },
  paperStyle: {
    margin: '0 50'
  },
  cardStyle: {
  },
  cardContentStyle: {
    textAlign: 'center',
    margin: '0 auto'
  },
  iconColor: {
    color: '#3f51b5'
  },
  fontColor: {
    color: '#616161'
  }
};

class Dashboard extends Component {
  render() {
    return (
      <Grid container justify='center'>
        <Grid item xs={12} md={4} style={styles.gridStyle}>
          <Paper>
            <Grid container justify='center'>
              <Grid item xs={10} style={styles.iconColor}>
                <Link to='/register'>
                  <Card>
                    <CardContent style={styles.cardContentStyle}>
                      <RegiIcon style={{width: 70, height: 'auto'}}/>
                      <Typography type='headline' style={styles.fontColor}>{REGI}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            </Grid>
            <Grid container justify='center'>
              <Grid item xs={5} style={styles.iconColor}>
                <Link to='/items_dashboard'>
                  <Card>
                    <CardContent style={styles.cardContentStyle}>
                      <ItemIcon style={{width: 70, height: 'auto'}}/>
                      <Typography type='subheading' style={styles.fontColor}>{ITEMS_DASHBOARD}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              <Grid item xs={5} style={styles.iconColor}>
                <Link to='/event_dashboard'>
                  <Card>
                    <CardContent style={styles.cardContentStyle}>
                      <EventIcon style={{width: 70, height: 'auto'}}/>
                      <Typography type='subheading' style={styles.fontColor}>{EVENTS_DASHBOARD}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withAuthorization(withNavigationBar(Dashboard));
