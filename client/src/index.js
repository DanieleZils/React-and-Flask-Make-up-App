import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WrappedApp from './components/App';


const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(<WrappedApp />);

