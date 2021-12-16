import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';


function DetailsUser() {
  return (
    <>
      <Helmet>
        <title>Networks</title>
      </Helmet>
      <Container maxWidth="xl">
      </Container>
      <Footer />
    </>
  );
}

export default DetailsUser;
