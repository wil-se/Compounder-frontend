import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
// import { Network } from '../../../db/models/network';


function DashboardCrypto() {
  // const net: Network = new Network(0, "Cronos");
  // net.all().then(e => e.forEach(k => console.log(k.data())));
  // net.create();
  
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
          </Grid>
          <Grid item lg={8} xs={12}>
          </Grid>
          <Grid item lg={4} xs={12}>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
