import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/AdminApiCalls';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setSuccess(false);

      // Backend request fired
      // console.log(user._id)
      // console.log(token)
      // console.log(name)
      const data = await createCategory(user._id, token, { name });

      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
        setName('');
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
      setError('An error occurred while creating the category.');
    }
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created Successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create Category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="for Ex. Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="Add a new category for tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {/* <h2>Hello</h2> */}
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
