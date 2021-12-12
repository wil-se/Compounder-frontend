import { useState, useEffect } from 'react';
import { Network } from '../../db/models/network';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import TextField from '@mui/material/TextField';
import { Router } from '../../db/models/router';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CountertopsOutlined } from '@mui/icons-material';


export function UpdateRouterModal(props) {
    let {
        onClose,
        open,
        networkId,
        name,
        address,
        abiIn,
        logoUrl
    } = props;

    const [selectedValueName, setSelectedValueName] = useState(name);
    const [networkList, setNetworkList] = useState([]);
    const [selectedNetwork, setSelectedNetwork] = useState(networkId);
    const [selectedAddress, setSelectedAddress] = useState(address);
    const [selectedLogo, setSelectedLogo] = useState(logoUrl);
    const [abi, setAbi] = useState(abiIn);

    const handleSelectName = (val) => {
      setSelectedValueName(val.target.value);
    };
    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
      let router = new Router();
      router.delete(address);
      onClose(value);
    };
    const handleNetworkChange = (event) => {  
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
      console.log(networkId);
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
                onChange={handleSelectName}
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
                onChange={handleSelectAddress}
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
                maxRows={128}
                helperText=""
                onChange={handleAbi}
                defaultValue={abiIn}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>


            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Logo"
                helperText=""
                onChange={handleSelectLogo}
                fullWidth
                defaultValue={logoUrl}
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <AddIcon /> <ListItemText primary={"Delete router"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }