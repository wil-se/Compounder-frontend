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
import { Farm } from '../../db/models/farm';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Token } from '../../db/models/token';


export function AddFarmModal(props) {
    let {
        onClose,
        open,
    } = props;

    const [selectedValueName, setSelectedValueName] = useState("");
    const [routerList, setRouterList] = useState([]);
    const [selectedRouter, setSelectedRouter] = useState("");
    const [selectedPid, setSelectedPid] = useState(0);
    const [selectedPendingFName, setSelectedPendingFName] = useState("");
    const [selectedReferral, setSelectedReferral] = useState(false);
    const [selectedMasterchefAddress, setSelectedMasterchefAddress] = useState("");
    const [masterchefAbi, setMasterchefAbi] = useState("");
    const [stakeTokenList, setStakeTokenList] = useState([]);
    const [selectedStakeToken, setSelectedStakeToken] = useState("");
    const [rewardTokenList, setRewardTokenList] = useState([]);
    const [selectedRewardToken, setSelectedRewardToken] = useState("");
    const [selectedLogo, setSelectedLogo] = useState("");

    
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
      farm.setFarm(selectedValueName, selectedRouter, selectedPid, selectedPendingFName, selectedReferral, selectedMasterchefAddress, masterchefAbi, selectedStakeToken, selectedRewardToken, selectedLogo);
      farm.create();
      onClose(value);
    };
    const handleRouterChange = (event) => {   
        console.log();   
        setSelectedRouter(event.target.value);
    };

    useEffect(() => {
      new Router().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setRouterList(a);});
      new Token().all().then(e => e.docs.map((v, k) => <MenuItem key={v.id} data-name={v.data().name} value={v.id}>{v.data().name}</MenuItem>)).then((a) => {setStakeTokenList(a);setRewardTokenList(a);});
    }, []);
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add farm</DialogTitle>
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
              <InputLabel id="demo-simple-select-helper-label">Router</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedRouter}
                label="Network"
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
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="PendingFName"
                helperText=""
                onChange={handleSelectPendingFName}
                fullWidth
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
              <TextField
                id="outlined-helperText"
                label="Logo url"
                helperText=""
                onChange={handleSelectLogo}
                fullWidth
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleListItemClick('')}>
                <AddIcon /> <ListItemText primary={"Add farm"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  