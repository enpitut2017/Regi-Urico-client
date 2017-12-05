import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui';
import React from 'react';

import { CANCEL, OK } from './const/const-values';

/**
 * ある値・状態かキャンセルかを選択させるダイアログを描画する。
 * @param {object} props = {
 *    cancel: string,
 *    ok: string,
 *    open: bool,
 *    onOK: () => void,
 *    onCancel: () => void,
 *    onRequestClose: (event?: object) => void,
 *    title: string,
 *    text: string
 * }
 */
const SimpleDialog = props => {
  return (
    <Dialog
      open={props.open}
      onRequestClose={props.onRequestClose}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary">
          {props.cancel || CANCEL}
        </Button>
        <Button onClick={props.onOK} color="primary" autoFocus>
          {props.ok || OK}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
