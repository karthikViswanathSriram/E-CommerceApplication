import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TiWarning } from "react-icons/ti";


export default function AlertDialog({open,setOpen,title,message,onYes,onCancel}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <span className='flex gap-2 items-center'><TiWarning size={50} className='p-2 rounded-full bg-red-200 text-rose-700'/>{title}</span>
                       
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                {message}           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={onCancel}>Cancel</Button>
          <Button variant='contained' color='success' onClick={onYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}