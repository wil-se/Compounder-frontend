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


export function UpdateFarmModal(props) {
    let {
        onClose,
        open,
        farmID,
        name,
        router,
        pid,
        pendingFName,
        referral,
        masterchefAddress,
        masterchefAbiIn,
        stakeToken,
        rewardToken,
        logo
    } = props;


    const [selectedValueName, setSelectedValueName] = useState(name);
    const [routerList, setRouterList] = useState([]);
    const [selectedRouter, setSelectedRouter] = useState(router);
    const [selectedPid, setSelectedPid] = useState(pid);
    const [selectedPendingFName, setSelectedPendingFName] = useState(pendingFName);
    const [selectedReferral, setSelectedReferral] = useState(referral);
    const [selectedMasterchefAddress, setSelectedMasterchefAddress] = useState(masterchefAddress);
    const [masterchefAbi, setMasterchefAbi] = useState(masterchefAbiIn);
    const [stakeTokenList, setStakeTokenList] = useState([]);
    const [selectedStakeToken, setSelectedStakeToken] = useState(stakeToken);
    const [rewardTokenList, setRewardTokenList] = useState([]);
    const [selectedRewardToken, setSelectedRewardToken] = useState(rewardToken);
    const [selectedLogo, setSelectedLogo] = useState(logo);
    
    const handleSelectPendingFName = (val) => {
      setSelectedPendingFName(val.target.value);
    };
    const handleSelectName = (val) => {
      setSelectedValueName(val.target.value);
    };
    const handleSelectPid = (val) => {
        setSelectedPid(val.target.value);
    };
    const handleSelectReferral = (val) => {
        console.log(val.target.checked)
        setSelectedReferral(val.target.checked);
    };
    const handleSelectMasterchefAddress = (val) => {
        setSelectedMasterchefAddress(val.target.value);
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
    const handleMasterchefAbi = (event) => {
        setMasterchefAbi(event.target.value);
      };
    const handleClose = () => {
      onClose();
    };
    const handleListItemClick = (value) => {
      let farm = new Farm();
      farm.delete(farmID);
      onClose(value);
    };
    const handleRouterChange = (event) => {   
        setSelectedRouter(event.target.value);
    };

    useEffect(() => {
      new Router().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setRouterList(a);});
      new Token().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setStakeTokenList(a);setRewardTokenList(a);});
    }, []);
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Farm info</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Name"
                helperText=""
                onChange={handleSelectName}
                fullWidth
                defaultValue={selectedValueName}
              />
            </ListItem>

            <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Router</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedRouter}
                label="Router"
                onChange={handleRouterChange}
              >
              {routerList}
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
                defaultValue={selectedPid}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="PendingFName"
                helperText=""
                onChange={handleSelectPendingFName}
                fullWidth
                defaultValue={selectedPendingFName}
              />
            </ListItem>

            <ListItem>
                <FormGroup>
                    <FormControlLabel onChange={handleSelectReferral} control={<Checkbox defaultChecked={selectedReferral} />} label="Has referral" />
                </FormGroup>            
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Masterchef address"
                helperText=""
                onChange={handleSelectMasterchefAddress}
                fullWidth
                defaultValue={selectedMasterchefAddress}
              />
            </ListItem>

            <ListItem>
            <TextField
                id="outlined-helperText"
                label="Masterchef ABI"
                multiline
                maxRows={16}
                helperText=""
                onChange={handleMasterchefAbi}
                fullWidth
                defaultValue={masterchefAbi}
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
                defaultValue={stakeToken}
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
                defaultValue={rewardToken}
              >
              {rewardTokenList}
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
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete farm"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  