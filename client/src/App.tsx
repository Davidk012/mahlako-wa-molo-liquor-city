import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AgeVerification from './components/AgeVerification';
import Layout from './components/Layout';
import SEOHead from './components/SEOHead';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Specials from './pages/Specials';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './components/Cart';

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  return (
    <>
      {!isAgeVerified && (
        <AgeVerification onVerified={() => setIsAgeVerified(true)} />
      )}
      
      {isAgeVerified && (
        <>
          <SEOHead />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/specials" element={<Specials />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Cart />
          </Layout>
        </>
      )}
    </>
  );
}

export default App;
