import {
  Button,
  Grid,
  Box,
  Typography,
  Avatar,
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import CardNetwork from './Card'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';
import { useState } from 'react';

import { Network } from '../../db/models/network';
import {useQuery} from 'react-query'



function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [selectedValueName, setSelectedValueName] = useState("");
  const [selectedValueId, setSelectedValueId] = useState(0);
  const [selectedValueWss, setSelectedValueWss] = useState("");
  const [selectedValueRpc, setSelectedValueRpc] = useState("");
  const [selectedValueLogo, setSelectedValueLogo] = useState("");



  const handleSelectName = (val) => {
    setSelectedValueName(val.target.value);
  };
  const handleSelectId = (val) => {
    setSelectedValueId(val.target.value);
  };
  const handleSelectWss = (val) => {
    setSelectedValueWss(val.target.value);
  };
  const handleSelectRpc = (val) => {
    setSelectedValueRpc(val.target.value);
  };
  const handleSelectLogo = (val) => {
    setSelectedValueLogo(val.target.value);
  };
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    var net = new Network();
    net.setNetwork(Number(selectedValueId), selectedValueName, selectedValueWss.split(";"), selectedValueRpc.split(";"), selectedValueLogo);
    net.create();
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set up network</DialogTitle>
      <List sx={{ pt: 0 }}>
      <ListItem>
        <TextField
          id="outlined-helperText"
          label="Name"
          defaultValue=""
          helperText=""
          onChange={handleSelectName}
        />
      </ListItem>

      <ListItem>
      
        <TextField
          id="outlined-helperText"
          label="ID"
          defaultValue=""
          helperText=""
          onChange={handleSelectId}
        />
      </ListItem>

      <ListItem>
        <TextField
          id="outlined-helperText"
          label="LOGO URL"
          defaultValue=""
          helperText=""
          onChange={handleSelectLogo}
        />
      </ListItem>

      <ListItem>
      
      <TextField
          id="filled-multiline-flexible"
          label="WSS;WSS;WSS;"
          multiline
          maxRows={128}
          variant="outlined"
          onChange={handleSelectWss}
        />
      </ListItem>

      <ListItem>
        <TextField
          id="outlined-helperText"
          label="RPC;RPC;RPC;"
          multiline
          maxRows={128}
          defaultValue=""
          helperText=""
          onChange={handleSelectRpc}
        />
      </ListItem>




      <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>

              <AddIcon />
          <ListItemText primary="Add network" />
        </ListItem>

      
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};



function NetworkList() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [networkList, setNetworkList] = useState([]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  new Network().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardNetwork key={k} name={v.data().name} networkId={v.data().networkID} logoUrl={v.data().logoUrl} ></CardNetwork></Grid>)).then(a => setNetworkList(a));



  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }} p={2}
      >
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >

          Add new network
        </Button>
        </Box>

        <SimpleDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                />
      <Grid container spacing={3}>
        
          {networkList}
        
      </Grid>
    </>
  );
}

export default NetworkList;