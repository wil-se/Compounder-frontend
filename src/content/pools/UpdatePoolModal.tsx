import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import TextField from '@mui/material/TextField';
import { Farm } from '../../db/models/farm';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Token } from '../../db/models/token';
import { Pool } from '../../db/models/pool';


export function UpdatePoolModal({onClose, open, poolId, name, logo, farm, reward, stake, exit, id}) {
    const [farmList, setFarmList] = useState([]);
    const [stakeTokenList, setStakeTokenList] = useState([]);
    const [rewardTokenList, setRewardTokenList] = useState([]);
    const [exitTokenList, setExitTokenList] = useState([]);
    
    const handleClose = () => {
      onClose();
    };
    const handleDelete = () => {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      };
      fetch(process.env.REACT_APP_DB_API_URL+'pool/'+poolId, requestOptions);
      onClose();
    };
    
    useEffect(() => {
      fetch(process.env.REACT_APP_DB_API_URL+"farm").then(e => e.json()).then(j => j.farms).then(c => c.map((v, k) => <MenuItem key={v._id} data-name={v.name} value={v._id}>{v.name}</MenuItem>)).then((a) => {setFarmList(a)});
      fetch(process.env.REACT_APP_DB_API_URL+"token").then(e => e.json()).then(j => j.tokens).then(c => c.map((v, k) => <MenuItem key={v._id} data-name={v.name} value={v._id}>{v.name}</MenuItem>)).then((a) => {setStakeTokenList(a);setRewardTokenList(a);setExitTokenList(a);});
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
                value={farm}
                label="Farm"
                defaultValue={farm}
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
                value={stake}
                label="Stake Token"
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
                value={reward}
                label="Reward Token"
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
                value={exit}
                label="Exit Token"
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
                fullWidth
                defaultValue={logo}
              />
            </ListItem>

            <ListItem autoFocus button onClick={() => handleDelete()}>
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete pool"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }
  