import { useState, useEffect } from 'react';
import { Network } from '../../db/models/network';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Router } from '../../db/models/router';


export function AddRouterModal(props) {
    let {
        onClose,
        open,
    } = props;

    const [selectedValueName, setSelectedValueName] = useState("");
    const [networkList, setNetworkList] = useState([]);
    const [selectedNetwork, setSelectedNetwork] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedLogo, setSelectedLogo] = useState("");
    const [abi, setAbi] = useState("");

    const handleSelectName = (val) => {
      setSelectedValueName(val.target.value);
    };
    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
        let router = new Router();
        router.setRouter(selectedAddress, abi, selectedNetwork, selectedValueName, selectedLogo);
        router.create();
      onClose(value);
    };
    const handleNetworkChange = (event) => {   
      console.log();   
      setSelectedNetwork(event.target.value);
    };
    const handleSelectAddress = (event) => {
      setSelectedAddress(event.target.value);
    };
    const handleSelectLogo = (event) => {
      setSelectedLogo(event.target.value);
    };
    const handleAbi = (event) => {
      setAbi(event.target.value);
    };


    useEffect(() => {
      new Network().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setNetworkList(a);});
    }, []);
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add router</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Name"
                helperText=""
                onChange={handleSelectName}
                fullWidth
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Address"
                helperText=""
                onChange={handleSelectAddress}
                fullWidth
              />
            </ListItem>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Network</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedNetwork}
                label="Network"
                onChange={handleNetworkChange}
              >
              {networkList}
              </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            </ListItem>

            <ListItem>
            <TextField
                id="outlined-helperText"
                label="ABI"
                multiline
                maxRows={16}
                helperText=""
                onChange={handleAbi}
                fullWidth
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Logo"
                helperText=""
                onChange={handleSelectLogo}
                fullWidth
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <AddIcon /> <ListItemText primary={"Add router"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  