import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';


export function AddNetworkModal({onClose, open}) {
    const [selectedValueName, setSelectedValueName] = useState("");
    const [selectedValueId, setSelectedValueId] = useState(0);
    const [selectedValueWss, setSelectedValueWss] = useState("");
    const [selectedValueRpc, setSelectedValueRpc] = useState("");
    const [selectedValueLogo, setSelectedValueLogo] = useState("");
  
    const handleClose = () => {
      onClose();
    };
    const handleAdd = (value) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedValueId,
          name: selectedValueName,
          wss: selectedValueWss.split(";"),
          rpc: selectedValueRpc.split(";"),
          logoUrl: selectedValueLogo,
        })
      }
      fetch(process.env.REACT_APP_DB_API_URL+'network', requestOptions);

      onClose(value);
    };
    const handleSelectName = (val) => {
      setSelectedValueName(val.target.value);
    };
    const handleSelectId = (val) => {
      setSelectedValueId(val.target.value);
    };
    const handleSelectWss = (val) => {
      setSelectedValueWss(val.target.value);
    };
    const handleSelectRpc = (val) => {
      setSelectedValueRpc(val.target.value);
    };
    const handleSelectLogo = (val) => {
      setSelectedValueLogo(val.target.value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Name"
                helperText=""
                onChange={handleSelectName}
              />
            </ListItem>
  
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="ID"
                helperText=""
                type="number"
                onChange={handleSelectId}
              />
            </ListItem>
  
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="LOGO URL"
                helperText=""
                onChange={handleSelectLogo}
              />
            </ListItem>
  
            <ListItem>
            <TextField
                id="filled-multiline-flexible"
                label="WSS;WSS;WSS;"
                multiline
                maxRows={128}
                variant="outlined"
                onChange={handleSelectWss}
                fullWidth
              />
            </ListItem>
  
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="RPC;RPC;RPC;"
                multiline
                maxRows={128}
                helperText=""
                onChange={handleSelectRpc}
                fullWidth
              />
            </ListItem>
  
            <ListItem autoFocus button onClick={() => handleAdd('')}>
                <AddIcon /> <ListItemText primary={"Add"} />
            </ListItem>

        </List>
      </Dialog>
    );
  }