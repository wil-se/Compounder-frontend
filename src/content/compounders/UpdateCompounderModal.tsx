import { useState, useEffect } from 'react';
import { Network } from '../../db/models/network';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import TextField from '@mui/material/TextField';
import { Farm } from '../../db/models/farm';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CountertopsOutlined } from '@mui/icons-material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Token } from '../../db/models/token';
import { Compounder } from '../../db/models/compounder';
import { Pool } from '../../db/models/pool';


export function UpdateCompounderModal(props) {
    let {
        onClose,
        open,
        id,
        pool,
        tick,
        gasBoost,
        depositSpeedup,
        emergencySpeedup,
        harvestSpeedup,
        swapSpeedup,
        approveSpeedup,
        theshold,
        slippage,
        stdGas,
    } = props;


    const [poolList, setPoolList] = useState([]);
    const [selectedPool, setSelectedPool] = useState(pool);
    const [tickValue, setTickValue] = useState(tick);
    const [gasBoostValue, setGasBoostValue] = useState(gasBoost);
    const [depositSpeedupValue, setDepositSpeedupValue] = useState(depositSpeedup);
    const [emergencySpeedupValue, setEmergencySpeedupValue] = useState(emergencySpeedup);
    const [harvestSpeedupValue, setHarvestSpeedupValue] = useState(harvestSpeedup);
    const [swapSpeedupValue, setSwapSpeedupValue] = useState(swapSpeedup);
    const [approveSpeedupValue, setApproveSpeedupValue] = useState(approveSpeedup);
    const [thesholdValue, setThesholdValue] = useState(theshold);
    const [slippageValue, setSlippageValue] = useState(slippage);
    const [stdGasValue, setStdGasValue] = useState(stdGas);

    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
      let compounder = new Compounder();
      compounder.delete(id);
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
        <DialogTitle>Compounder info</DialogTitle>
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
                defaultValue={tickValue}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="GAS BOOST"
                helperText=""
                onChange={handleGasBoostChange}
                fullWidth
                type="number"
                defaultValue={gasBoostValue}
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
                defaultValue={depositSpeedupValue}
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
                defaultValue={emergencySpeedupValue}
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
                defaultValue={harvestSpeedupValue}
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
                defaultValue={swapSpeedupValue}
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
                defaultValue={approveSpeedupValue}
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
                defaultValue={thesholdValue}
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
                defaultValue={slippageValue}
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
                defaultValue={stdGasValue}
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete compounder"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  