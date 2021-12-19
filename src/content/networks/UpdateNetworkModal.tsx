import { useState } from 'react';
import { Network } from '../../db/models/network';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import TextField from '@mui/material/TextField';


export function UpdateNetworkModal({onClose, open, networkId, ID, name, wss, rpc, logoUrl}) {

    function handleDelete() {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      }
      fetch(process.env.REACT_APP_DB_API_URL+'network/'+networkId, requestOptions);

      onClose();
    };

    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Update network</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Name"
                defaultValue={name}
                helperText=""
                InputProps={{readOnly: true,}}
              />
            </ListItem>
  
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="ID"
                defaultValue={ID}
                helperText=""
                type="number"
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>
    
            <ListItem>
            <TextField
                id="filled-multiline-flexible"
                label="WSS;WSS;WSS;"
                multiline
                maxRows={128}
                variant="outlined"
                defaultValue={wss}
                fullWidth
                InputProps={{readOnly: true,}}
              />
            </ListItem>
  
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="RPC;RPC;RPC;"
                multiline
                maxRows={128}
                defaultValue={rpc}
                helperText=""
                fullWidth
                InputProps={{readOnly: true,}}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="LOGO URL"
                defaultValue={logoUrl}
                helperText=""
                InputProps={{readOnly: true,}}
              />
            </ListItem>
          {/*   
            <ListItem autoFocus button onClick={() => handleUpdate()}>
                <AddIcon /> <ListItemText primary={"Update network"} />
            </ListItem>
          */}
            <ListItem autoFocus button onClick={handleDelete}>
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete"} />
            </ListItem>
                 
        </List>
      </Dialog>
    );
  }