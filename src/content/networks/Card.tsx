import {
    Button,
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Avatar,
    Tooltip,
    CardActionArea
  } from '@mui/material';

import { styled } from '@mui/material/styles';


const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-left: -${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(1)};
        margin-top: ${theme.spacing(2)};
`
);

function CardGrid(){
    return (
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
    )
}

export default CardGrid