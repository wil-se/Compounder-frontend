import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';
import RoutersList from './RoutersList';

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
        <RoutersList/>
      </Container>
      <Footer />
    </>
  );
}

export default Routers;
