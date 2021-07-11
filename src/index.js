import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CardListProvider } from './components/Hooks/useListCards';

ReactDOM.render(
  <React.StrictMode>
    <CardListProvider>
      <App />
    </CardListProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
