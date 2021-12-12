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
import { UpdatePoolModal } from './UpdatePoolModal';


const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-left: -${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(1)};
        margin-top: ${theme.spacing(2)};
`
);

export function CardPool({onClose, poolID, name, logo, farm, reward, stake, exit, id }) {

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
                  <img alt={name} src={logo} />
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
      <UpdatePoolModal open={open} onClose={handleClose} poolID={poolID} name={name} logo={logo} farm={farm} reward={reward} stake={stake} exit={exit} id={id}/>
      </div>
      </div>
    )
}