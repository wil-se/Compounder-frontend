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
        sx={{ p: 3 }}
      >
        <Typography variant="h3">Active instances</Typography>        
        
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >

      <Grid item lg={4} xs={12}>
        <CardInstance></CardInstance>
      </Grid>
      <Grid item lg={4} xs={12}>
      </Grid>
      <Grid item lg={4} xs={12}>
      </Grid>

      
      </Grid>

    
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
