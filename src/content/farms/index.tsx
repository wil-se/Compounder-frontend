import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { Card } from '@mui/material';


function Farms() {
  return (
    <>
      <Helmet>
        <title>Tokens</title>
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

export default Farms;
