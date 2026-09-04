import '@coinbase/cds-icons/fonts/web/icon-font.css';
import '@coinbase/cds-web/globalStyles';
import '@coinbase/cds-web/defaultFontStyles';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
