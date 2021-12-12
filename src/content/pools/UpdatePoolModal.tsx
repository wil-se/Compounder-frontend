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
import { Router } from '../../db/models/router';
import { Pool } from '../../db/models/pool';


export function UpdatePoolModal(props) {
    let {
        onClose,
        open,
        poolID,
        name,
        logo,
        farm,
        reward,
        stake,
        exit,
        id
    } = props;


    const [selectedValueName, setSelectedValueName] = useState(name);
    const [farmList, setFarmList] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(farm);
    const [selectedPid, setSelectedPid] = useState(id);
    const [stakeTokenList, setStakeTokenList] = useState([]);
    const [selectedStakeToken, setSelectedStakeToken] = useState(stake);
    const [rewardTokenList, setRewardTokenList] = useState([]);
    const [selectedRewardToken, setSelectedRewardToken] = useState(reward);
    const [exitTokenList, setExitTokenList] = useState([]);
    const [selectedExitToken, setSelectedExitToken] = useState(exit);
    const [selectedLogo, setSelectedLogo] = useState(logo);

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
      pool.delete(poolID);
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
        <DialogTitle>Pool info</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Name"
                helperText=""
                onChange={handleSelectName}
                fullWidth
                defaultValue={name}
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
                defaultValue={farm}
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
                defaultValue={id}
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
                defaultValue={logo}
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete pool"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  