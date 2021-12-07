import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { Card } from '@mui/material';
import TokenList from './TokenList';


function Tokens() {
  return (
    <>
      <Helmet>
        <title>Tokens</title>
      </Helmet>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="xl">
        <TokenList />
      </Container>
      <Footer />
    </>
  );
}

export default Tokens;
