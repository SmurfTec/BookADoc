import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

import SignIn from '../SignIn';

function SignInPopup(props) {
  const { show, onClose } = props;
  const [open, setOpen] = useState(show);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setOpen(show);
  }, [show, open]);

  useEffect(() => {
    if (processing) {
      if (
        props.login &&
        !props.login.loading &&
        Object.keys(props.login.user).length
      ) {
        setOpen(false);
        onClose(false);
        setProcessing(false);
      }
    } else {
      if (props.login && props.login.loading) {
        setProcessing(true);
      }
    }
  }, [props.login]);

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  return (
    <Dialog
      maxWidth={false}
      open={open}
      onClose={handleClose}
      // disableBackdropClick
      // disableEscapeKeyDown
      aria-labelledby="form-dialog-title"
    >
      <div style={{width: '400px'}}>
        <div className="position-relative text-right pr-2 pt-2">
          <a href="#" onClick={handleClose}>
            <i className="fa fa-close" />
          </a>
        </div>
        <div className="p-4">
          <div className="col-12">
            <SignIn />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

const mapStateToProps = state => ({ login: state.login });

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(SignInPopup);
