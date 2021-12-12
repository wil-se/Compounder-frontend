import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { FarmList } from './FarmList';


function Farms() {
  return (
    <>
      <Helmet>
        <title>Tokens</title>
      </Helmet>
      <Container maxWidth="xl">
        <FarmList></FarmList>
      </Container>
      <Footer />
    </>
  );
}

export default Farms;
