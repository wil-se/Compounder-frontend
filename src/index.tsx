import App from './App';
import ReactDOM from 'react-dom';
import 'src/utils/chart';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { SidebarProvider } from './contexts/SidebarContext';
import { DAppProvider } from "@usedapp/core";
import { StrictMode } from 'react';


ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
      <StrictMode>
      <DAppProvider config={{}}>
        <App />
      </DAppProvider>
      </StrictMode>
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
