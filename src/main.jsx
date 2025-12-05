
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import {BrowserRouter} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter basename="/react"><App /></BrowserRouter>);