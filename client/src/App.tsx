import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AgeVerification from './components/AgeVerification';
import Layout from './components/Layout';
import SEOHead from './components/SEOHead';
import Home from './pages/Home';
import Shop from './pages/Shop';
import OrderSummary from './components/OrderSummary';

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
            </Routes>
            <OrderSummary />
          </Layout>
        </>
      )}
    </>
  );
}

export default App;
