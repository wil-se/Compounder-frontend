import {
  Button,
  Grid,
  Box,
  Typography,
  Avatar,
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import CardGrid from './Card'

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



function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
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
        />
      </ListItem>

      <ListItem>
      
        <TextField
          id="outlined-helperText"
          label="ID"
          defaultValue=""
          helperText=""
        />
      </ListItem>
      
      <ListItem>
      <Typography variant="body2" noWrap>
                 write WSS and RPC list like:
              </Typography>
      </ListItem>


      <ListItem>
      <Typography variant="body1" noWrap>
                link;link;link;
              </Typography>
      </ListItem>


      <ListItem>
      
      <TextField
          id="filled-multiline-flexible"
          label="WSS"
          multiline
          maxRows={128}
          variant="outlined"
        />
      </ListItem>

      <ListItem>
        <TextField
          id="outlined-helperText"
          label="RPC"
          multiline
          maxRows={128}
          defaultValue=""
          helperText=""
        />
      </ListItem>

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
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
  const net: Network = new Network();
  net.setNetwork(777, "NETT", new Array<string>(), new Array<string>());
  // net.all().then(e => e.forEach(k => console.log(k.data())));
  // net.create();
  // net.getById(777).then(e => e.forEach(k => console.log(k.data())));
  net.update(777, 999, "NEWNETT", new Array<string>(), new Array<string>());
  console.log("#####################")
  net.all().then(e => e.forEach(k => console.log(k.data())));
  
  net.delete(888);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


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
        <Grid xs={12} sm={6} md={3} item>
            <CardGrid></CardGrid>
        </Grid>
      </Grid>
    </>
  );
}

export default NetworkList;