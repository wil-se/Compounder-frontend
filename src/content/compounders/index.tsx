import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { Card } from '@mui/material';


function Compounders() {
  return (
    <>
      <Helmet>
        <title>Compounders</title>
      </Helmet>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="xl">
      </Container>
      <Footer />
    </>
  );
}

export default Compounders;
