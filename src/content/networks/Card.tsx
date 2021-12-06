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
              <AvatarWrapper>
                <img
                  alt="BTC"
                  src="/static/images/placeholders/logo/ethereum.png"
                />
              </AvatarWrapper>
              <Typography variant="h5" noWrap>
                Ethereum
              </Typography>
              <Typography variant="subtitle1" noWrap>
                ETH
              </Typography>
              <Box sx={{ pt: 3 }}>
                <Typography variant="h3" gutterBottom noWrap>
                  $3,586.22
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  1.25843 ETH
                </Typography>
              </Box>
            </CardContent>
          </Card>
    )
}

export default CardGrid