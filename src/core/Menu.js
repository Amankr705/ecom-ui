import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';

const Menu = () => {
  let location = useLocation();
  let navigate = useNavigate();

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
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === '/user/dashboard' ? 'active' : ''
              }`}
              to="/user/dashboard"
            >
              User Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === '/admin/dashboard' ? 'active' : ''
              }`}
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <>
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
                className={`nav-link text-success ${
                  location.pathname === '/signin' ? 'active' : ''
                }`}
                to="/signin"
              >
                Signin
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  navigate('/');
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
