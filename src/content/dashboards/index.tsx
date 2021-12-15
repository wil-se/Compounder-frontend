import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { MouseEvent, useState } from 'react';
import {
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Card,
  Typography,
  Container
} from '@mui/material';
import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import { CardInstance } from './CardInstance';


function Dashboard() {
  const [tabs, setTab] = useState<string | null>('watch_list_columns');

  const handleViewOrientation = (
    event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">

<Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Active instances</Typography>
        <ToggleButtonGroup
          value={tabs}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton disableRipple value="watch_list_columns">
            <ViewWeekTwoToneIcon />
          </ToggleButton>
          <ToggleButton disableRipple value="watch_list_rows">
            <TableRowsTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        {tabs === 'watch_list_columns' && (
          <>
            <Grid item lg={4} xs={12}>
              <CardInstance></CardInstance>
            </Grid>
            <Grid item lg={4} xs={12}>
            </Grid>
            <Grid item lg={4} xs={12}>
            </Grid>
          </>
        )}

        {tabs === 'watch_list_rows' && (
          <Grid item xs={12}>
          </Grid>
        )}

        {!tabs && (
          <Grid item xs={12}>
            <Card sx={{ textAlign: 'center', p: 3 }}>

              <Typography
                align="center"
                variant="h2"
                fontWeight="normal"
                color="text.secondary"
                sx={{ mt: 3 }}
                gutterBottom
              >
                Click something, anything!
              </Typography>
              <Button variant="contained" size="large" sx={{ mt: 4 }}>
                Maybe, a button?
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>

    
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
