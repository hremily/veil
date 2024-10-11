import React from 'react';
import { createRoot } from 'react-dom/client';
// import { App } from './App';
import App from './App';

const domNode = document.getElementById('react-app');
console.log('DOM Node:', domNode);
const root = createRoot(domNode);

root.render(<App />);
