import {
    Button,
    Grid,
    Box,
  } from '@mui/material';
  import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
  import { CardPool } from './CardPool'
  import { useState, useEffect } from 'react';
  import { Pool } from '../../db/models/pool';
  import { AddPoolModal } from './AddPoolModal'
  
  
  export function PoolList() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [poolList, setPoolList] = useState([]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = (value) => {
      // new Network().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardNetwork onClose={handleClose} key={k} name={v.data().name} networkId={v.data().networkID} logoUrl={v.data().logoUrl} wss={v.data().wss.join(";")} rpc={v.data().rpc.join(";")}></CardNetwork></Grid>)).then((a) => {setNetworkList(a);});
      
      setOpen(false);
      setSelectedValue(value);
    };
  
    useEffect(() => {
      // new Network().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardNetwork onClose={handleClose} key={k} name={v.data().name} networkId={v.data().networkID} logoUrl={v.data().logoUrl} wss={v.data().wss.join(";")} rpc={v.data().rpc.join(";")} ></CardNetwork></Grid>)).then((a) => {setNetworkList(a);});
      // new Farm().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardFarm onClose={handleClose} key={v.id} farmID={v.id} name={v.data().name} router={v.data().routerID} pid={v.data().pid} pendingFName={v.data().pendingFName} referral={v.data().hasReferral} masterchefAddress={v.data().masterchefAddress} masterchefAbi={v.data().masterchefAbi} stakeToken={v.data().stakeTokenID} rewardToken={v.data().rewardTokenID} logo={v.data().logoUrl} ></CardFarm></Grid>)).then((a) => {setFarmList(a);})
      new Pool().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardPool onClose={handleClose} key={v.id} poolID={v.id} name={v.data().name} logo={v.data().logoUrl} farm={v.data().farmID} reward={v.data().rewardTokenID} stake={v.data().stakeTokenID} exit={v.data().exitTokenID} id={v.data().id} ></CardPool></Grid>)).then((a) => {setPoolList(a);})
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
            Add pool
          </Button>
        </Box>
          <AddPoolModal
            open={open}
            onClose={handleClose}
          />
        <Grid container spacing={3}>
          {poolList} 
        </Grid>
      </>
    );
  }