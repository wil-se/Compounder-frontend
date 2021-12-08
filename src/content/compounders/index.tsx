import { Helmet } from 'react-helmet-async';
import {  Container } from '@mui/material';
import Footer from 'src/components/Footer';


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
