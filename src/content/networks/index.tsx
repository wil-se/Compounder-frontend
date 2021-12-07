import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { Card } from '@mui/material';
import NetworkList from './NetworkList';


function Networks() {
  return (
    <>
      <Helmet>
        <title>Networks</title>
      </Helmet>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="xl">
          <NetworkList/>
      </Container>
      <Footer />
    </>
  );
}

export default Networks;
