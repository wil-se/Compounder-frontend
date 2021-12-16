import { useContext } from 'react';

import { Box, Hidden, IconButton, Tooltip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderMenu from './Menu';
import HeaderButtons from './Buttons';
import Logo from 'src/components/Logo';
import Typography from '@mui/material/Typography';

import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'



const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account) 

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Hidden lgUp>
          <Logo />
        </Hidden>
        <Hidden mdDown>
          <HeaderMenu />
        </Hidden>
      </Box>
      <Box display="block" alignItems="center">
      {account && <p>{account}</p>}
      </Box>
      <Box display="block" alignItems="center">
      {etherBalance && <p>{parseFloat(formatEther(etherBalance)).toFixed(3)} ETH</p>}
      </Box>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        <Button
          size="small"
          variant="contained"
          onClick={() => activateBrowserWallet()}
        >
          
          {!account ? "Connect wallet" : "Connected"}
        </Button>
        
        <Hidden lgUp>
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Hidden>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
