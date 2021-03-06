import {
    Button,
    Grid,
    Box,
  } from '@mui/material';
  import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
  import { CardPool } from './CardPool'
  import { useState, useEffect } from 'react';
  import { AddPoolModal } from './AddPoolModal'
  
  
  export function PoolList() {
    const [open, setOpen] = useState(false);
    const [poolList, setPoolList] = useState([]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = (value) => {
      setOpen(false);
    };
  
    useEffect(() => {
      // new Pool().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardPool onClose={handleClose} key={v.id} poolID={v.id} name={v.data().name} logo={v.data().logoUrl} farm={v.data().farmID} reward={v.data().rewardTokenID} stake={v.data().stakeTokenID} exit={v.data().exitTokenID} id={v.data().id} ></CardPool></Grid>)).then((a) => {setPoolList(a);})
      fetch(process.env.REACT_APP_DB_API_URL+"pool").then(e => e.json()).then(j => j.pools).then(c => c.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardPool onClose={handleClose} key={v.id} poolId={v._id} name={v.name} logo={v.logoUrl} farm={v.farmId} reward={v.rewardTokenId} stake={v.stakeTokenId} exit={v.exitTokenId} id={v.id} ></CardPool></Grid>)).then((a) => {setPoolList(a)});
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