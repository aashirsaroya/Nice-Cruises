import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grommet } from 'grommet';
import { UserProvider } from './pages/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Home from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import ManageBookings from './pages/ManageBookings';
import ContactSupport from './pages/ContactSupport';
import AdminDashboard from './pages/AdminDashboard'; 

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Arial',
      size: '18px',
      height: '20px',
    },
  },
};

const App = () => (
  <UserProvider>
    <Grommet theme={theme} full>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route
            path="/manage-bookings"
            element={
              <PrivateRoute element={<ManageBookings />} allowedRoles={['customer']} />
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute element={<AdminDashboard />} allowedRoles={['admin']} />
            }
          />
        </Routes>
      </Router>
    </Grommet>
  </UserProvider>
);
export default App;
