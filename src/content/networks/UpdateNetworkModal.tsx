import { useState } from 'react';
import { Network } from '../../db/models/network';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import TextField from '@mui/material/TextField';


export function UpdateNetworkModal(props) {
    let {
        onClose,
        open,
        networkId,
        name,
        wss,
        rpc,
        logoUrl
    } = props;

    const [selectedValueName, setSelectedValueName] = useState(name);
    const [selectedValueId, setSelectedValueId] = useState(networkId);
    const [selectedValueWss, setSelectedValueWss] = useState(wss);
    const [selectedValueRpc, setSelectedValueRpc] = useState(rpc);
    const [selectedValueLogo, setSelectedValueLogo] = useState(logoUrl);

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
    const handleListItemClick = () => {
      var net = new Network();
      console.log(selectedValueWss);
      net.update(Number(networkId), Number(selectedValueId), selectedValueName, selectedValueWss.split(";"), selectedValueRpc.split(";"), selectedValueLogo);
      onClose();
    };
    const handleDelete = (value) => {
      var net = new Network();
      net.delete(value);
      onClose();
    };

    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Update network</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="Name"
                defaultValue={name}
                helperText=""
                onChange={handleSelectName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>
  
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="ID"
                defaultValue={networkId}
                helperText=""
                onChange={handleSelectId}
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>
    
            <ListItem>
            <TextField
                id="filled-multiline-flexible"
                label="WSS;WSS;WSS;"
                multiline
                maxRows={128}
                variant="outlined"
                defaultValue={wss}
                onChange={handleSelectWss}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>
  
            <ListItem>
              <TextField
                id="outlined-helperText"
                label="RPC;RPC;RPC;"
                multiline
                maxRows={128}
                defaultValue={rpc}
                helperText=""
                onChange={handleSelectRpc}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>

            <ListItem>
              <TextField
                id="outlined-helperText"
                label="LOGO URL"
                defaultValue={logoUrl}
                helperText=""
                onChange={handleSelectLogo}
                InputProps={{
                  readOnly: true,
                }}
              />
            </ListItem>
{/*   
            <ListItem autoFocus button onClick={() => handleListItemClick()}>
                <AddIcon /> <ListItemText primary={"Update network"} />
            </ListItem>
         */}
            <ListItem autoFocus button onClick={() => handleDelete(networkId)}>
                <RemoveTwoToneIcon /> <ListItemText primary={"Delete"} />
            </ListItem>
                 
        </List>
      </Dialog>
    );
  }