import {
  Button,
  Grid,
  Box,
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { CardToken } from './CardToken'
import { useState, useEffect } from 'react';
import { Token } from '../../db/models/token';
import { AddTokenModal } from './AddTokenModal'


export function TokenList() {
  const [open, setOpen] = useState(false);
  const [tokenList, setTokenList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {    
    setOpen(false);
  };

  useEffect(() => {
    new Token().all().then(e => e.docs.map((v, k) => <Grid key={k} xs={12} sm={6} md={3} item><CardToken onClose={handleClose} key={v.id} name={v.data().name} networkId={v.data().network} logo={v.data().logo} address={v.data().address} abi={v.data().abi} ></CardToken></Grid>)).then((a) => {setTokenList(a);})
  }, []);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }} p={2}
      >
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Add token
        </Button>
      </Box>
        <AddTokenModal
          open={open}
          onClose={handleClose}
        />
      <Grid container spacing={3}>
        {tokenList} 
      </Grid>
    </>
  );
}