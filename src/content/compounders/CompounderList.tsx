import {
    Button,
    Grid,
    Box,
  } from '@mui/material';
  import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
  import { CardCompounder } from './CardCompounder'
  import { useState, useEffect } from 'react';
  import { Compounder } from '../../db/models/compounder';
  import { AddCompounderModal } from './AddCompounderModal'

  
  export function CompounderList() {
    const [open, setOpen] = useState(false);
    const [compounderList, setCompounderList] = useState([]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = (value) => {
      setOpen(false);
    };
  
    useEffect(() => {
      // new Compounder().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardCompounder onClose={handleClose} key={k} id={v.id} logoUrl={v.data().logoUrl} poolNumber={v.data().poolNumber} name={v.data().name} approveSpeedup={v.data().approveSpeedup} depositSpeedup={v.data().depositSpeedup} emergencySpeedup={v.data().emergencySpeedup} gasBoost={v.data().gasBoost} harvestSpeedup={v.data().harvestSpeedup} poolID={v.data().poolID} slippage={v.data().slippage} stdGas={v.data().stdGas} swapSpeedup={v.data().swapSpeedup} theshold={v.data().theshold} tick={v.data().tick}  ></CardCompounder></Grid>)).then((a) => {setCompounderList(a);});
      fetch(process.env.REACT_APP_DB_API_URL+"compounder").then(e => e.json()).then(j => j.compounders).then(c => c.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardCompounder onClose={handleClose} key={k} id={v._id} logoUrl={v.logoUrl} poolNumber={v.poolNumber} name={v.name} approveSpeedup={v.approveSpeedup} depositSpeedup={v.depositSpeedup} emergencySpeedup={v.emergencySpeedup} gasBoost={v.gasBoost} harvestSpeedup={v.harvestSpeedup} poolID={v.poolId} slippage={v.slippage} stdGas={v.stdGas} swapSpeedup={v.swapSpeedup} theshold={v.threshold} tick={v.tick}  ></CardCompounder></Grid>)).then((a) => {setCompounderList(a);});      
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
            Add compounder
          </Button>
        </Box>
          <AddCompounderModal
            open={open}
            onClose={handleClose}
          />
        <Grid container spacing={3}>
          {compounderList} 
        </Grid>
      </>
    );
  }