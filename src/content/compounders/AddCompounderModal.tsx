import { useState, useEffect } from 'react';
import { Router } from '../../db/models/router';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Pool } from '../../db/models/pool';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Token } from '../../db/models/token';
import { Farm } from '../../db/models/farm';
import { Compounder } from '../../db/models/compounder';


export function AddCompounderModal(props) {
    let {
        onClose,
        open,
    } = props;

    const [poolList, setPoolList] = useState([]);
    const [selectedPool, setSelectedPool] = useState("");
    const [tickValue, setTickValue] = useState(300);
    const [gasBoostValue, setGasBoostValue] = useState(1);
    const [depositSpeedupValue, setDepositSpeedupValue] = useState(1);
    const [emergencySpeedupValue, setEmergencySpeedupValue] = useState(1);
    const [harvestSpeedupValue, setHarvestSpeedupValue] = useState(1);
    const [swapSpeedupValue, setSwapSpeedupValue] = useState(1);
    const [approveSpeedupValue, setApproveSpeedupValue] = useState(1);
    const [thesholdValue, setThesholdValue] = useState(1);
    const [slippageValue, setSlippageValue] = useState(1);
    const [stdGasValue, setStdGasValue] = useState(1);

    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
      let compounder = new Compounder();
      compounder.setCompounder(selectedPool, tickValue, gasBoostValue, depositSpeedupValue, emergencySpeedupValue, harvestSpeedupValue, swapSpeedupValue, approveSpeedupValue, thesholdValue, slippageValue, stdGasValue);
      compounder.create();
      onClose(value);
    };
    const handlePoolChange = (event) => {   
        setSelectedPool(event.target.value);
    };
    const handleTickChange = (event) => {   
        setTickValue(event.target.value);
    };
    const handleGasBoostChange = (event) => {   
        setGasBoostValue(event.target.value);
    };
    const handleDepositSpeedupChange = (event) => {   
        setDepositSpeedupValue(event.target.value);
    };
    const handleEmergencySpeedupChange = (event) => {   
        setEmergencySpeedupValue(event.target.value);
    };
    const handleHarvestSpeedupValueChange = (event) => {   
        setHarvestSpeedupValue(event.target.value);
    };
    const handleSwapSpeedupValueChange = (event) => {   
        setSwapSpeedupValue(event.target.value);
    };
    const handleApproveSpeedupValueChange = (event) => {   
        setApproveSpeedupValue(event.target.value);
    };
    const handleThesholdChange = (event) => {   
        setThesholdValue(event.target.value);
    };
    const handleSlippageChange = (event) => {   
        setSlippageValue(event.target.value);
    };
    
    const handleStdGasChange = (event) => {   
        setStdGasValue(event.target.value);
    };
    
    

    useEffect(() => {
      // new Farm().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setFarmList(a);});
      // new Token().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setStakeTokenList(a);setRewardTokenList(a);setExitTokenList(a);});
      new Pool().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setPoolList(a);});
    }, []);
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add compounder</DialogTitle>
        <List sx={{ pt: 0 }}>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Pool</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedPool}
                label="Pool"
                onChange={handlePoolChange}
                fullWidth
              >
              {poolList}
              </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="THICK"
                helperText=""
                onChange={handleTickChange}
                fullWidth
                type="number"
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="GAS BOOS"
                helperText=""
                onChange={handleGasBoostChange}
                fullWidth
                type="number"
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="DEPOSIT SPEEDUP"
                helperText=""
                onChange={handleDepositSpeedupChange}
                fullWidth
                type="number"
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="EMERGENCY SPEEDUP"
                helperText=""
                onChange={handleEmergencySpeedupChange}
                fullWidth
                type="number"
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="HARVEST SPEEDUP"
                helperText=""
                onChange={handleHarvestSpeedupValueChange}
                fullWidth
                type="number"
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="SWAP SPEEDUP"
                helperText=""
                onChange={handleSwapSpeedupValueChange}
                fullWidth
                type="number"
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="APPROVE SPEEDUP"
                helperText=""
                onChange={handleApproveSpeedupValueChange}
                fullWidth
                type="number"
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="THESHOLD"
                helperText=""
                onChange={handleThesholdChange}
                fullWidth
                type="number"
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="SLIPPAGE"
                helperText=""
                onChange={handleSlippageChange}
                fullWidth
                type="number"
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="STD GAS"
                helperText=""
                onChange={handleStdGasChange}
                fullWidth
                type="number"
              />
            </ListItem>

            
            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <AddIcon /> <ListItemText primary={"Add compounder"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  