import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { PoolList } from './PoolList';

function Pools() {
  return (
    <>
      <Helmet>
        <title>Pools</title>
      </Helmet>
      <Container maxWidth="xl">
        <PoolList/>
      </Container>
      <Footer />
    </>
  );
}

export default Pools;
