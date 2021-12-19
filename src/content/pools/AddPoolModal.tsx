import { useState, useEffect } from 'react';
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


export function AddPoolModal({onClose, open,}) {
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

    const handleClose = () => {
      onClose();
    };
    const handleAdd = (value) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedValueName,
          farmId: selectedFarm,
          rewardTokenId: selectedRewardToken,
          stakeTokenId: selectedStakeToken,
          exitTokenId: selectedExitToken,
          id: selectedPid,
          logoUrl: selectedLogo,
        })
      }
      fetch(process.env.REACT_APP_DB_API_URL+'pool', requestOptions);

      onClose(value);
    };
    const handleFarmChange = (event) => {   
        setSelectedFarm(event.target.value);
    };
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

    useEffect(() => {
      fetch(process.env.REACT_APP_DB_API_URL+"farm").then(e => e.json()).then(j => j.farms).then(c => c.map((v, k) => <MenuItem key={v._id} data-name={v.name} value={v._id}>{v.name}</MenuItem>)).then((a) => {setFarmList(a)});
      fetch(process.env.REACT_APP_DB_API_URL+"token").then(e => e.json()).then(j => j.tokens).then(c => c.map((v, k) => <MenuItem key={v._id} data-name={v.name} value={v._id}>{v.name}</MenuItem>)).then((a) => {setStakeTokenList(a);setRewardTokenList(a);setExitTokenList(a);});
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
            </FormControl>
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="POOL ID"
                helperText=""
                onChange={handleSelectPid}
                fullWidth
                type="number"
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

            <ListItem autoFocus button onClick={() => handleAdd('')}>
                <AddIcon /> <ListItemText primary={"Add pool"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  