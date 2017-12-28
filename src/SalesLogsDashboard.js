import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from 'material-ui';
import { Timeline, TimelineBlip, TimelineEvent } from 'react-event-timeline';
import CalenderIcon from 'material-ui-icons/Today';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import React, {Component} from 'react';
import ReceiptIcon from 'material-ui-icons/Payment';

import { withAuthorization } from './wrapper/withAuthorization';
import { withNavigationBar } from './wrapper/withNavigationBar';

const styles = {
  title: {
    marginTop: 32
  }
}

class SalesLogsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {};
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={10} style={styles.title}>
          <Typography type="display1" gutterBottom align="center">
            売上履歴
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Timeline>
                <TimelineBlip
                  title="Today"
                  icon={<CalenderIcon/>}
                  iconColor="#ff4081"
                />
                <TimelineEvent
                  title="販売"
                  createdAt="16:12:00"
                  icon={<ReceiptIcon/>}
                  iconColor="#3f51b5"
                  contentStyle={{boxShadow: 'none'}}
                >
                  <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>2600円</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails  style={{overflowX: 'auto', overflowY: 'none'}}>
                      <Table style={{tableLayout: 'auto'}}>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="none">商品</TableCell>
                            <TableCell numeric padding="none">個数</TableCell>
                            <TableCell numeric padding="none">小計</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell padding="none">GENSOUM@STER</TableCell>
                            <TableCell numeric padding="none">1</TableCell>
                            <TableCell numeric padding="none">1400</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell padding="none">東方魔烈槍</TableCell>
                            <TableCell numeric padding="none">2</TableCell>
                            <TableCell numeric padding="none">1200</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </TimelineEvent>
                <TimelineEvent
                  title="販売"
                  createdAt="14:13:45"
                  icon={<ReceiptIcon/>}
                  iconColor="#3f51b5"
                  contentStyle={{boxShadow: 'none'}}
                >
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>2800円</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails  style={{overflowX: 'auto', overflowY: 'none'}}>
                      <Table style={{tableLayout: 'auto'}}>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="none">商品</TableCell>
                            <TableCell numeric padding="none">個数</TableCell>
                            <TableCell numeric padding="none">小計</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell padding="none">GENSOUM@STER</TableCell>
                            <TableCell numeric padding="none">2</TableCell>
                            <TableCell numeric padding="none">2800</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </TimelineEvent>
              </Timeline>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withAuthorization(withNavigationBar(SalesLogsDashboard));
