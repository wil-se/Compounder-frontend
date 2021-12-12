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
import { UpdateNetworkModal } from './UpdateNetworkModal';


const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-left: -${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(1)};
        margin-top: ${theme.spacing(2)};
`
);

export function CardNetwork({name, networkId, logoUrl, wss, rpc, onClose}) {
    const [open, setOpen] = useState(false);
    
    const handleClose = () => {
      onClose()
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
  
    return (
      <div>
        <div style={{ cursor: 'pointer' }} onClick={handleOpen}> 
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
          <UpdateNetworkModal open={open} onClose={handleClose} networkId={networkId} name={name} wss={wss} rpc={rpc} logoUrl={logoUrl} />
        </div>
      </div>
    )
}