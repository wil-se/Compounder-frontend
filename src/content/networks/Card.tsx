import {
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Avatar,
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

function CardNetwork({name, networkId, logoUrl}) {
  if(name === "")
    name = "NO_NAME"
  if(networkId === "")
    networkId = "NO_NET_ID"
  if(logoUrl === "")
    logoUrl = "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/black/generic.svg"
  
  
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
                  alt={name}
                  src={logoUrl}
                />
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
    )
}

export default CardNetwork