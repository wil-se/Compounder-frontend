import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export function UpdateCompounderModal({onClose, open, id, pool, tick, gasBoost, depositSpeedup, emergencySpeedup, harvestSpeedup, swapSpeedup, approveSpeedup, theshold, slippage, stdGas,}) {
    const [poolList, setPoolList] = useState([]);
    
    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      };
      fetch(process.env.REACT_APP_DB_API_URL+'compounder/'+id, requestOptions);
      onClose(value);
    };

    useEffect(() => {
      fetch(process.env.REACT_APP_DB_API_URL+"pool").then(e => e.json()).then(j => j.pools).then(c => c.map((v, k) => <MenuItem key={v._id} data-name={v.name} value={v._id}>{v.name}</MenuItem>)).then((a) => {setPoolList(a)});
    }, []);
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Compounder info</DialogTitle>
        <List sx={{ pt: 0 }}>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Pool</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={pool}
                label="Pool"
                fullWidth
              >
              {poolList}
              </Select>
            </FormControl>
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="THICK"
                helperText=""
                fullWidth
                type="number"
                defaultValue={tick}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="GAS BOOST"
                helperText=""
                fullWidth
                type="number"
                defaultValue={gasBoost}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="DEPOSIT SPEEDUP"
                helperText=""
                fullWidth
                type="number"
                defaultValue={depositSpeedup}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="EMERGENCY SPEEDUP"
                helperText=""
                fullWidth
                type="number"
                defaultValue={emergencySpeedup}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="HARVEST SPEEDUP"
                helperText=""
                fullWidth
                type="number"
                defaultValue={harvestSpeedup}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="SWAP SPEEDUP"
                helperText=""
                fullWidth
                type="number"
                defaultValue={swapSpeedup}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="APPROVE SPEEDUP"
                helperText=""
                fullWidth
                type="number"
                defaultValue={approveSpeedup}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="THESHOLD"
                helperText=""
                fullWidth
                type="number"
                defaultValue={theshold}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="SLIPPAGE"
                helperText=""
                fullWidth
                type="number"
                defaultValue={slippage}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="STD GAS"
                helperText=""
                fullWidth
                type="number"
                defaultValue={stdGas}
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete compounder"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  