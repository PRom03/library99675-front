
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.jsx'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);