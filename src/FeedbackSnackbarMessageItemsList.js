import React from 'react';

import FeedbackSnackbarMessageItem from './FeedbackSnackbarMessageItem';

const FeedbackSnackbarMessageItemsList = props => {
  const items = props.items.map((message, index) => {
    return (
      <FeedbackSnackbarMessageItem
        key={index}
        message={message}
      />
    );
  });
  return (
    <div>
      {items}
    </div>
  );
}

export default FeedbackSnackbarMessageItemsList;
