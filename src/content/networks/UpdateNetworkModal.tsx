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


export function UpdateNetworkModal({onClose, open, networkId, name, wss, rpc, logoUrl}) {
    // const handleUpdate = () => {
    //   var net = new Network();
    //   console.log(selectedValueWss);
    //   net.update(Number(networkId), Number(selectedValueId), selectedValueName, selectedValueWss.split(";"), selectedValueRpc.split(";"), selectedValueLogo);
    //   onClose();
    // };
    const handleDelete = (value) => {
      var net = new Network();
      net.delete(value);
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
                defaultValue={networkId}
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
            <ListItem autoFocus button onClick={() => handleDelete(networkId)}>
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete"} />
            </ListItem>
                 
        </List>
      </Dialog>
    );
  }