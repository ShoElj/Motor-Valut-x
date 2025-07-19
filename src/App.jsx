import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Imports - We no longer need Home.jsx or CarDetail.jsx
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';

// Component Imports
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Admin Login page is now the root of the application.
          When anyone visits your app's URL, this is the first page they will see.
        */}
        <Route path="/" element={<AdminLogin />} />

        {/* The Dashboard remains protected and is accessible after login */}
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