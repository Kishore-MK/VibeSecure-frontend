import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import SubmitPage from './pages/SubmitPage';
import DashboardPage from './pages/DashboardPage';
import { AuthSuccess } from './pages/AuthSuccess';
import History from './pages/History';

function App() {
  return (
    <BrowserRouter>
    
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/dashboard/:runId" element={<DashboardPage />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;