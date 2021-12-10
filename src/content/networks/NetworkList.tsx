import {
  Button,
  Grid,
  Box,
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { CardNetwork } from './CardNetwork'
import { useState, useEffect } from 'react';
import { Network } from '../../db/models/network';
import { AddNetworkModal } from './AddNetworkModal'


function NetworkList() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [networkList, setNetworkList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    new Network().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardNetwork onClose={handleClose} key={k} name={v.data().name} networkId={v.data().networkID} logoUrl={v.data().logoUrl} wss={v.data().wss.join(";")} rpc={v.data().rpc.join(";")}></CardNetwork></Grid>)).then((a) => {setNetworkList(a);});
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    new Network().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardNetwork onClose={handleClose} key={k} name={v.data().name} networkId={v.data().networkID} logoUrl={v.data().logoUrl} wss={v.data().wss.join(";")} rpc={v.data().rpc.join(";")} ></CardNetwork></Grid>)).then((a) => {setNetworkList(a);});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <AddNetworkModal
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