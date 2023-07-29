import React, { useState } from 'react';
import Base from '../core/Base';
import { useNavigate } from 'react-router-dom';

import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'alok@gmail.com', //{Default values for admin login, kind of saved creds}
    password: '124563',
    error: '',
    loading: false,
    didRedirect: false,
  });

  let navigate = useNavigate();
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setValues({ ...values, error: false, loading: true });
      const data = await signin({ email, password });

      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    } catch (error) {
      console.log('Error in sign-in:', error);
    }
  };

  const performRedirect = () => {
    // Redirect to the dashboard on successful sign-in
    if (didRedirect) {
      if (user && user.role === 1) {
        return navigate('/admin/dashboard');
      } else {
        return navigate('/user/dashboard');
      }
    }
    if (isAuthenticated()) {
      return navigate('/');
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange('email')}
                value={email}
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange('password')}
                value={password}
                type="password"
                className="form-control"
              />
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Signin Page" description="A Page for User to Signin">
      {/* <h1>Signin Works</h1> */}
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
