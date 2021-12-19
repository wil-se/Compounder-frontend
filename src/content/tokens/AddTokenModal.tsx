import { useState, useEffect } from 'react';
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


export function AddTokenModal(props) {
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
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: selectedAddress,
          abi: abi,
          networkId: selectedNetwork,
          name: selectedValueName,
          logoUrl: selectedLogo
        })
      }
      fetch(process.env.REACT_APP_DB_API_URL+'token', requestOptions);
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
      // new Network().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setNetworkList(a);});
      fetch(process.env.REACT_APP_DB_API_URL+"network").then(e => e.json()).then(j => j.networks).then(c => c.map((v, k) => <MenuItem key={v._id} data-name={v.name} value={v._id}>{v.name}</MenuItem>)).then((a) => {setNetworkList(a)});
    }, []);
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add token</DialogTitle>
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
                <AddIcon /> <ListItemText primary={"Add token"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  