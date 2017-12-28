import { Grid, Typography } from 'material-ui';
import { Timeline } from 'react-event-timeline';
import React, {Component} from 'react';

import { BASE_URI, SALES_LOGS_URI } from './const/urls';
import {
  GET_SALES_LOG_FATAL_ERROR,
  NETWORK_REACH_ERROR,
  SALES_LOG
} from './const/const-values';
import { buildErrorMessage } from './worker-service/errorMessageService';
import { createXHRInstance } from './worker-service/axiosService';
import { withAuthorization } from './wrapper/withAuthorization';
import { withNavigationBar } from './wrapper/withNavigationBar';
import FeedbackSnackbar from './FeedbackSnackbar';
import RedirectOnce from './RedirectOnce';
import SalesLogsDatePoint from './SalesLogsDatePoint';
import SalesLogsEmptyLogPoint from './SalesLogsEmptyLogPoint';
import SalesLogsReceipt from './SalesLogsReceipt';

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
    return {
      salesLogs: null,
      openSnackbar: false,
      messages: [],
      redirectToRoot: false
    };
  }

  componentWillReceiveProps = nextProps => {
    this.getSalesLogs(nextProps.event_id);
  }

  getSalesLogs = eventId => {
    const url = `${BASE_URI}${SALES_LOGS_URI}${eventId}`;
    createXHRInstance()
      .get(url)
      .then(response => {
        if (response.status === 204) {
          // No Logs yet
          this.setState({
            salesLogs: null
          });
        } else if (response.status === 200) {
          // Some Log exists
          this.setState({
            salesLogs: response.data.sales_logs
          });
        } else {
          // undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [GET_SALES_LOG_FATAL_ERROR]
          })
        }
      })
      .catch(error => {
        if (error.response === undefined) {
          // Not reach to Server
          this.setState({
            openSnackbar: true,
            messages: [NETWORK_REACH_ERROR]
          });
        } else if (error.response.status === 401) {
          // Unauthorized
          localStorage.removeItem('authorizedToken');
          this.setState({redirectToRoot: true});
        } else if (error.response.status === 403) {
          // Forbidden to get events whose owner isn't current user
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          });
        } else if (error.response.status === 404) {
          // Event Not Found
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [GET_SALES_LOG_FATAL_ERROR]
          });
        }
        console.error(error);
      });
  }

  renderTimelines = () => {
    let date = null;
    let expanded = true;
    if (this.state.salesLogs === null) {
      return <SalesLogsEmptyLogPoint/>;
    } else {
      return this.state.salesLogs.map((salesLog, timelineIndex) => {
        const receipts = salesLog.receipts.map((receipt, receiptIndex) => {
          if (expanded) {
            expanded = false;
            return (
              <SalesLogsReceipt
                key={receiptIndex}
                title="販売"
                createdAt={receipt.formatted_time}
                total={receipt.total}
                defaultExpanded={true}
                logs={receipt.logs}
              />
            );
          } else {
            return (
              <SalesLogsReceipt
                key={receiptIndex}
                title="販売"
                createdAt={receipt.formatted_time}
                total={receipt.total}
                logs={receipt.logs}
              />
            );
          }
        });
        if (date !== salesLog.date) {
          date = salesLog.date;
          return (
            <div key={timelineIndex}>
              <SalesLogsDatePoint date={salesLog.formatted_date}/>
              {receipts}
            </div>
          );
        } else {
          return (
            <div key={timelineIndex}>
              {receipts}
            </div>
          );
        }
      });
    }
  }

  onRequestFeedbackSnackbarClose = () => {
    this.setState({openSnackbar: false});
  }

  render() {
    return (
      <div>
        <RedirectOnce to="/" if={this.state.redirectToRoot} />
        <Grid container justify="center">
          <Grid item xs={10} style={styles.title}>
            <Typography type="display1" gutterBottom align="center">
              {SALES_LOG}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Timeline>
                  {this.renderTimelines()}
                </Timeline>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <FeedbackSnackbar
          open={this.state.openSnackbar}
          onRequestClose={this.onRequestFeedbackSnackbarClose}
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default withAuthorization(withNavigationBar(SalesLogsDashboard));
