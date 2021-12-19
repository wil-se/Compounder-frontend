import {
    Button,
    Grid,
    Box,
  } from '@mui/material';
  import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
  import { CardFarm } from './CardFarm'
  import { useState, useEffect } from 'react';
  import { Farm } from '../../db/models/farm';
  import { AddFarmModal } from './AddFarmModal'
  
  
  export function FarmList() {
    const [open, setOpen] = useState(false);
    const [farmList, setFarmList] = useState([]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      // new Farm().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardFarm onClose={handleClose} key={v.id} farmID={v.id} name={v.data().name} router={v.data().routerID} pid={v.data().pid} pendingFName={v.data().pendingFName} referral={v.data().hasReferral} masterchefAddress={v.data().masterchefAddress} masterchefAbi={v.data().masterchefAbi} stakeToken={v.data().stakeTokenID} rewardToken={v.data().rewardTokenID} logo={v.data().logoUrl} ></CardFarm></Grid>)).then((a) => {setFarmList(a);})
      fetch(process.env.REACT_APP_DB_API_URL+"farm").then(e => e.json()).then(j => j.farms).then(c => c.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardFarm onClose={handleClose} key={v._id} farmID={v._id} name={v.name} router={v.routerId} pid={v.pid} pendingFName={v.pendingFName} referral={v.hasReferral} masterchefAddress={v.masterchefAddress} masterchefAbi={v.masterchefAbi} stakeToken={v.stakeTokenId} rewardToken={v.rewardTokenId} logo={v.logoUrl} ></CardFarm></Grid>)).then((a) => {setFarmList(a);});      
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
            Add farm
          </Button>
        </Box>
          <AddFarmModal
            open={open}
            onClose={handleClose}
          />
        <Grid container spacing={3}>
          {farmList} 
        </Grid>
      </>
    );
  }