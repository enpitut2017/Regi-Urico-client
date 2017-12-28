import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from 'material-ui';
import { TimelineEvent } from 'react-event-timeline';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import   ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import React from 'react';
import ReceiptIcon from 'material-ui-icons/Payment';

import { COUNT, ITEM_NAME, SUBTOTAL, YEN } from './const/const-values';
import SalesLogsReceiptTableRow from './SalesLogsReceiptTableRow';

const SalesLogsReceipt = props => {
  const rows = props.logs.map((log, index) => {
    return (
      <SalesLogsReceiptTableRow
        key={index}
        name={log.name}
        count={log.count}
        subtotal={log.subtotal}
      />
    );
  });
  return (
    <TimelineEvent
      title={props.title}
      createdAt={props.createdAt}
      icon={<ReceiptIcon/>}
      iconColor="#3f51b5"
      contentStyle={{boxShadow: 'none'}}
    >
      <ExpansionPanel defaultExpanded={props.defaultExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{props.total}{YEN}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails  style={{overflowX: 'auto', overflowY: 'none'}}>
          <Table style={{tableLayout: 'auto'}}>
            <TableHead>
              <TableRow>
                <TableCell padding="none">{ITEM_NAME}</TableCell>
                <TableCell numeric padding="none">{COUNT}</TableCell>
                <TableCell numeric padding="none">{SUBTOTAL}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </TimelineEvent>
  );
}

export default SalesLogsReceipt;
