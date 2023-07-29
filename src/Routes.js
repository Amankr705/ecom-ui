import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Signin" element={<Signin />} />
          <Route
            path="/user/dashboard"
            element={<PrivateRoute element={UserDashBoard} />}
          />
          <Route
            path="/admin/dashboard"
            element={<AdminRoute element={AdminDashBoard} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
