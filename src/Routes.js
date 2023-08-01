import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

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
          <Route
            path="/admin/create/category"
            element={<AdminRoute element={AddCategory} />}
          />
          <Route
            path="/admin/category/all"
            element={<AdminRoute element={ManageCategories} />}
          />
          <Route
            path="/admin/create/product"
            element={<AdminRoute element={AddProduct} />}
          />
          <Route
            path="/admin/products"
            element={<AdminRoute element={ManageProducts} />}
          />
          <Route
            path="/admin/product/update/:productId"
            element={<AdminRoute element={UpdateProduct} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
