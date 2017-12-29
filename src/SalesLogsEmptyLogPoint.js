import { TimelineBlip } from 'react-event-timeline';
import EmptyIcon from 'material-ui-icons/Info';
import React from 'react';

import { SALES_LOG_EMPTY } from './const/const-values';

const SalesLogsEmptyLogPoint = props => {
  return (
    <TimelineBlip
      title={SALES_LOG_EMPTY}
      icon={<EmptyIcon/>}
      iconColor="#77bb55"
    />
  );
}

export default SalesLogsEmptyLogPoint;
