import React, {Fragment} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteConfirmation from './DeleteConfirmation';

const DeleteButton = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <Fragment>
      <DeleteConfirmation handleClickDelete={props.handleClickDelete} handleClose={handleClose} open={open} />
      <Tooltip title="Delete" onClick={handleClickOpen}>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  )
}

export default DeleteButton;