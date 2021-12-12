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
import { UpdateCompounderModal } from './UpdateCompounderModal';


const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-left: -${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(1)};
        margin-top: ${theme.spacing(2)};
`
);

export function CardCompounder({onClose, id, poolNumber, logoUrl, name, approveSpeedup, depositSpeedup, emergencySpeedup, gasBoost, harvestSpeedup, poolID, slippage, stdGas, swapSpeedup, theshold, tick}) {
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
        <div>
        <UpdateCompounderModal 
          open={open}
          id={id}
          onClose={handleClose}
          pool={poolID}
          tick={tick}
          gasBoost={gasBoost}
          depositSpeedup={depositSpeedup}
          emergencySpeedup={emergencySpeedup}
          harvestSpeedup={harvestSpeedup}
          swapSpeedup={swapSpeedup}
          approveSpeedup={approveSpeedup}
          theshold={theshold}
          slippage={slippage}
          stdGas={stdGas}
         />
        </div>
      </div>
    )
}