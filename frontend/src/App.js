import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import './App.css';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <About />
      <Services />
      <Stats />
      <Portfolio />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;