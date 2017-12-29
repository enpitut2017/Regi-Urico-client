import { TableCell, TableRow } from 'material-ui';
import React from 'react';

const SalesLogsReceiptTableRow = props => {
  return (
    <TableRow>
      <TableCell padding="none">{props.name}</TableCell>
      <TableCell numeric padding="none">{props.count}</TableCell>
      <TableCell numeric padding="none">{props.subtotal}</TableCell>
    </TableRow>
  );
}

export default SalesLogsReceiptTableRow;
