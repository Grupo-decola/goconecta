import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import './styles/Style.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const App = () => {
  return (
    <MantineProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </MantineProvider>
  );
};

export default App;