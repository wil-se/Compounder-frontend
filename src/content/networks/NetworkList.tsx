import {
  Button,
  Grid,
  Box,
  Typography,
  Avatar,
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CardNetwork from './Card'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Network } from '../../db/models/network';

import { NetworkModal } from './Modal'


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

          Add network
        </Button>
        </Box>

        <NetworkModal
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  title="Add network"
                  buttonText="Add"
                />
      <Grid container spacing={3}>
      <Grid key={9999} xs={12} sm={6} md={3} item><CardNetwork key={88888} name={"Cronos"} networkId={25} logoUrl={"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/black/generic.svg"} ></CardNetwork></Grid>
          {networkList}
        
      </Grid>
    </>
  );
}

export default NetworkList;