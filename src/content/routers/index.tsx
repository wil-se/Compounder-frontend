import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { RouterList } from './RoutersList';

function Routers() {
  return (
    <>
      <Helmet>
        <title>Routers</title>
      </Helmet>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="xl">
        <RouterList/>
      </Container>
      <Footer />
    </>
  );
}

export default Routers;
