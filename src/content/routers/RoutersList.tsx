import {
    Button,
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Avatar
  } from '@mui/material';
  
  import { styled } from '@mui/material/styles';
  import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
    
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemAvatar from '@mui/material/ListItemAvatar';
  import ListItemText from '@mui/material/ListItemText';
  import DialogTitle from '@mui/material/DialogTitle';
  import Dialog from '@mui/material/Dialog';
  import AddIcon from '@mui/icons-material/Add';
  import TextField from '@mui/material/TextField';
  
  
  
  
  import PropTypes from 'prop-types';
  import { useState } from 'react';
  
  
  const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
          background: transparent;
          margin-left: -${theme.spacing(0.5)};
          margin-bottom: ${theme.spacing(1)};
          margin-top: ${theme.spacing(2)};
  `
  );

  
  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set up router</DialogTitle>
        <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            id="outlined-helperText"
            label="Name"
            defaultValue=""
            helperText=""
          />
        </ListItem>
  
        <ListItem>
        
          <TextField
            id="outlined-helperText"
            label="Address"
            defaultValue=""
            helperText=""
          />
        </ListItem>

        <ListItem>
        
        <TextField
            id="filled-multiline-flexible"
            label="ABI"
            multiline
            maxRows={128}
            variant="outlined"
          />
        </ListItem>
  
          <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add network" />
          </ListItem>
        
        </List>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  
  
    
  
  function RoutersList() {
  
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
  
  
    return (
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pb: 3 }} p={2}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleClickOpen}
          >
  
            Add new router
          </Button>
          </Box>
  
          <SimpleDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                  />
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3} item>
          <Card sx={{ px: 1 }}>
            <CardContent>
            <Box
  display="flex" justifyContent="center" alignItems="center"
>
  
              </Box>
            
              <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <AvatarWrapper>
                <img
                  alt="BTC"
                  src="/static/images/placeholders/logo/ethereum.png"
                />
              </AvatarWrapper>

  </Grid>

  <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
  <Typography variant="h5" noWrap>
                Ethereum
              </Typography>
  </Grid>
  <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
  <Typography variant="subtitle1" noWrap>
                ETH
              </Typography>

  </Grid>


</Grid>

            </CardContent>
          </Card>

          </Grid>
        </Grid>
      </>
    );
  }
  
  export default RoutersList;