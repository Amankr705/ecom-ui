import React from 'react';
import AppRoutes from './Routes';
import ReactDOM from 'react-dom';

// ReactDOM.render(<AppRoutes />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  );
