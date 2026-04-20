import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';


import Navbar from './components/navbar'

import { Contacts } from './pages/Contacts';
import { Projects } from './pages/Projects';
import Career from './pages/Career';
import MatrixRain from './components/MatrixRain'
import ErrorPage from './pages/ErrorPage';

//https://reactrouter.com/en/6.21.1
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <MatrixRain />
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} errorElement={<ErrorPage />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/career" element={<Career />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
