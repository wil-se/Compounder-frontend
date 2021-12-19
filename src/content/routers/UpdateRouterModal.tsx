import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export function UpdateRouterModal({onClose, open, routerId, networkId, name, address, abiIn, logoUrl}) {  
    const [networkList, setNetworkList] = useState([]);
   
    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
      // let router = new Router();
      // router.delete(address);
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      };
      fetch(process.env.REACT_APP_DB_API_URL+'router/'+routerId, requestOptions)
      
      onClose(value);
    };
   
    useEffect(() => {
      fetch(process.env.REACT_APP_DB_API_URL+"network").then(e => e.json()).then(j => j.networks).then(c => c.map((v, k) => <MenuItem key={v._id} data-name={v.name} value={v._id}>{v.name}</MenuItem>)).then((a) => {setNetworkList(a)});
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