import '@cbhq/cds-icons/fonts/web/icon-font.css';
import '@cbhq/cds-web/globalStyles';
import '@cbhq/cds-web/defaultFontStyles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
