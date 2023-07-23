import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  let location = useLocation();

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === '/cart' ? 'active' : ''
            }`}
            to="/cart"
          >
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === '/user/dashboard' ? 'active' : ''
            }`}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === '/admin/dashboard' ? 'active' : ''
            }`}
            to="/admin/dashboard"
          >
            Adm Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === '/signup' ? 'active' : ''
            }`}
            to="/signup"
          >
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === '/signin' ? 'active' : ''
            }`}
            to="/signin"
          >
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === '/signout' ? 'active' : ''
            }`}
            to="/signout"
          >
            Signout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
