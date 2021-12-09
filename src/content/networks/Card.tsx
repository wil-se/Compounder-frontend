import {
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Avatar,
  } from '@mui/material';

import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { NetworkModal } from './Modal';


const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-left: -${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(1)};
        margin-top: ${theme.spacing(2)};
`
);

function CardNetwork({name, networkId, logoUrl}) {
  if(name === "")
    name = "NO_NAME"
  if(networkId === "")
    networkId = "NO_NET_ID"
  if(logoUrl === "")
    logoUrl = "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/black/generic.svg"
  

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  
    return (
      <div>
     <div style={{ cursor: 'pointer' }} onClick={handleClickOpen}> 
        <Card sx={{ px: 1 }}>
          <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center"></Box>
            <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                <AvatarWrapper>
                  <img alt={name} src={logoUrl} />
                </AvatarWrapper>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h5" noWrap>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
              <Typography variant="subtitle1" noWrap>
                {networkId}
              </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <div>
      <NetworkModal
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  title="Update network"
                  buttonText="Update"
                  name={name}
                  networkId={networkId}
                  wss={["abcdde","saf34gthgfe","324t56y453t4q"]}
                  rpc={["456hgfdebtbvc", "ergth64wgrtsf", "45hwgea"]}
                  logoUrl={logoUrl}
                  del={true}
                />
      </div>
      </div>
    )
}

export default CardNetwork