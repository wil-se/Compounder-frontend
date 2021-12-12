import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import TextField from '@mui/material/TextField';
import { Farm } from '../../db/models/farm';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Router } from '../../db/models/router';


export function UpdateFarmModal(props) {
    let {
        onClose,
        open,
        farmID,
        name,
        router,
        pendingFName,
        referral,
        masterchefAddress,
        masterchefAbiIn,
        logo
    } = props;


    const [routerList, setRouterList] = useState([]);
    const [selectedRouter, setSelectedRouter] = useState(router);
    
    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
      let farm = new Farm();
      farm.delete(farmID);
      onClose(value);
    };
    const handleRouterChange = (event) => {   
        setSelectedRouter(event.target.value);
    };

    useEffect(() => {
      new Router().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setRouterList(a);});
    }, []);
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Farm info</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Name"
                helperText=""
                fullWidth
                defaultValue={name}
                InputProps={{readOnly: true,}}
              />
            </ListItem>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Router</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedRouter}
                label="Router"
                
              >
              {routerList}
              </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="PendingFName"
                helperText=""
                fullWidth
                defaultValue={pendingFName}
                InputProps={{readOnly: true,}}
              />
            </ListItem>

            <ListItem>
                <FormGroup>
                    <FormControlLabel control={<Checkbox disabled defaultChecked={referral} />} label="Has referral" />
                </FormGroup>            
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Masterchef address"
                helperText=""
                fullWidth
                defaultValue={masterchefAddress}
                InputProps={{readOnly: true,}}
              />
            </ListItem>

            <ListItem>
            <TextField
                id="outlined-helperText"
                label="Masterchef ABI"
                multiline
                maxRows={16}
                helperText=""
                fullWidth
                defaultValue={masterchefAbiIn}
                InputProps={{readOnly: true,}}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Logo url"
                helperText=""
                fullWidth
                defaultValue={logo}
                InputProps={{readOnly: true,}}
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete farm"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  