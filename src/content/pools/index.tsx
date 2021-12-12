import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';
// import { PoolList } from './PoolList';

function Pools() {
  return (
    <>
      <Helmet>
        <title>Pools</title>
      </Helmet>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="xl">
        {/* <RouterList/> */}
      </Container>
      <Footer />
    </>
  );
}

export default Pools;
