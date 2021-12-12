import { useState, useEffect } from 'react';
import { Network } from '../../db/models/network';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import TextField from '@mui/material/TextField';
import { Router } from '../../db/models/router';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export function UpdateRouterModal({onClose, open, networkId, name, address, abiIn, logoUrl}) {  
    const [networkList, setNetworkList] = useState([]);
   
    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
      let router = new Router();
      router.delete(address);
      onClose(value);
    };
   
    useEffect(() => {
      new Network().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setNetworkList(a);});
    }, []);
  

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Router info</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Name"
                helperText=""
                fullWidth
                defaultValue={name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Address"
                helperText=""
                fullWidth
                defaultValue={address}
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Network</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={networkId}
                label="Network"
              >
              {networkList}
              </Select>
            </FormControl>
            </ListItem>

            <ListItem>
            <TextField
                id="outlined-helperText"
                label="ABI"
                multiline
                maxRows={16}
                helperText=""
                defaultValue={abiIn}
                fullWidth
                InputProps={{readOnly: true,}}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Logo"
                helperText=""
                fullWidth
                defaultValue={logoUrl}
                InputProps={{readOnly: true,}}
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete router"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }