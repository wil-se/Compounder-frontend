import { Card, Box, Typography, Avatar } from '@mui/material';

import { styled } from '@mui/material/styles';
import Label from 'src/components/Label';
import Text from 'src/components/Text';


const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-right: ${theme.spacing(0.5)};
`
);


export function CardInstance() {

  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center">
          <AvatarWrapper>
            <img alt="WCRO" src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/mco.svg" />
          </AvatarWrapper>
          <Box>
            <Typography variant="h4" noWrap>
              WCRO
            </Typography>
            <Typography variant="subtitle1" noWrap>
              CRF
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pt: 3
          }}
        >
          <Typography variant="h2" sx={{ pr: 1, mb: 1 }}>
            $56,475.99
          </Typography>
          <Text color="success">
            <b>+12.5%</b>
          </Text>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Label color="success">+$500</Label>
          <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
            last 24h
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
