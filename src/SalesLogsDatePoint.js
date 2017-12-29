import { TimelineBlip } from 'react-event-timeline';
import React from 'react';

import CalenderIcon from 'material-ui-icons/Today';

const SalesLogsDatePoint = props => {
  return (
    <TimelineBlip
      title={props.date}
      icon={<CalenderIcon/>}
      iconColor="#ff4081"
    />
  );
}

export default SalesLogsDatePoint;
