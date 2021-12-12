import {
  Button,
  Grid,
  Box,
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { CardRouter } from './CardRouter'
import { useState, useEffect } from 'react';
import { Router } from '../../db/models/router';
import { AddRouterModal } from './AddRouterModal'


export function RouterList() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [routerList, setRouterList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    // new Network().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardNetwork onClose={handleClose} key={k} name={v.data().name} networkId={v.data().networkID} logoUrl={v.data().logoUrl} wss={v.data().wss.join(";")} rpc={v.data().rpc.join(";")} ></CardNetwork></Grid>)).then((a) => {setNetworkList(a);});
    // new Token().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardToken onClose={handleClose} key={v.id} name={v.data().name} networkId={v.data().network} logo={v.data().logo} address={v.data().address} abi={v.data().abi} ></CardToken></Grid>)).then((a) => {setTokenList(a);})
    new Router().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardRouter onClose={handleClose} key={v.id} name={v.data().name} networkId={v.data().network} logo={v.data().logo} address={v.data().address} abi={v.data().abi} ></CardRouter></Grid>)).then((a) => {setRouterList(a);})
  }, []);

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
          Add router
        </Button>
      </Box>
        <AddRouterModal
          open={open}
          onClose={handleClose}
        />
      <Grid container spacing={3}>
        {routerList} 
      </Grid>
    </>
  );
}