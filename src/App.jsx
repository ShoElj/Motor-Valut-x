import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import CarDetail from './pages/CarDetail';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
