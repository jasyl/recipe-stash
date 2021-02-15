import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const DeleteButton = (props) => {
  return(
    <Tooltip title="Edit" onClick={props.handleClickEdit}>
      <IconButton aria-label="Edit">
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}

export default DeleteButton;