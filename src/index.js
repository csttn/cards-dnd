import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { UseCardListProvider } from './components/Hooks/useListCards';

ReactDOM.render(
  <React.StrictMode>
    <UseCardListProvider>
      <App />
    </UseCardListProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
