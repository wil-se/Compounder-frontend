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


export function AddPoolModal(props) {
    let {
        onClose,
        open,
    } = props;

    const [selectedValueName, setSelectedValueName] = useState("");
    const [farmList, setFarmList] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState("");
    const [selectedPid, setSelectedPid] = useState(0);
    const [stakeTokenList, setStakeTokenList] = useState([]);
    const [selectedStakeToken, setSelectedStakeToken] = useState("");
    const [rewardTokenList, setRewardTokenList] = useState([]);
    const [selectedRewardToken, setSelectedRewardToken] = useState("");
    const [exitTokenList, setExitTokenList] = useState([]);
    const [selectedExitToken, setSelectedExitToken] = useState("");
    const [selectedLogo, setSelectedLogo] = useState("");


    const handleSelectName = (val) => {
      setSelectedValueName(val.target.value);
    };
    const handleSelectPid = (val) => {
        setSelectedPid(val.target.value);
    };
    const handleSelectLogo = (val) => {
        setSelectedLogo(val.target.value);
    };
    const handleStakeTokenChange = (val) => {
        setSelectedStakeToken(val.target.value);
    };
    const handleRewardTokenChange = (val) => {
        setSelectedRewardToken(val.target.value);
    };
    const handleExitTokenChange = (val) => {
        setSelectedExitToken(val.target.value);
    };
    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
      let pool = new Pool();
      pool.setPool(selectedValueName, selectedFarm, selectedRewardToken, selectedStakeToken, selectedExitToken, selectedPid, selectedLogo);
      pool.create();
      onClose(value);
    };
    const handleFarmChange = (event) => {   
        setSelectedFarm(event.target.value);
    };

    useEffect(() => {
      new Farm().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setFarmList(a);});
      new Token().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setStakeTokenList(a);setRewardTokenList(a);setExitTokenList(a);});
    }, []);
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add pool</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Name"
                helperText=""
                onChange={handleSelectName}
                fullWidth
              />
            </ListItem>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Farm</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedFarm}
                label="Farm"
                onChange={handleFarmChange}
              >
              {farmList}
              </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="POOL ID"
                helperText=""
                onChange={handleSelectPid}
                fullWidth
              />
            </ListItem>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Stake token</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedStakeToken}
                label="Stake Token"
                onChange={handleStakeTokenChange}
              >
              {stakeTokenList}
              </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            </ListItem>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Reward token</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedRewardToken}
                label="Reward Token"
                onChange={handleRewardTokenChange}
              >
              {rewardTokenList}
              </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            </ListItem>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Exit token</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedExitToken}
                label="Exit Token"
                onChange={handleExitTokenChange}
              >
              {exitTokenList}
              </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Logo url"
                helperText=""
                onChange={handleSelectLogo}
                fullWidth
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <AddIcon /> <ListItemText primary={"Add pool"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  