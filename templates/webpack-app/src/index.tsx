import '@cbhq/cds-icons/fonts/web/icon-font.css';
import '@cbhq/cds-web/globalStyles';
import '@cbhq/cds-web/defaultFontStyles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = document.createElement('div');
document.body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
