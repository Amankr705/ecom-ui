import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './helper/AdminApiCalls';
import { isAuthenticated } from '../auth/helper';

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    photo: '',
    categories: '',
    category: '',
    loading: false,
    error: '',
    createdProduct: '',
    getaRedirect: false,
    formData: '',
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = async () => {
    try {
      const data = await getCategories();
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    } catch (error) {
      console.error('Error in preload:', error);
      setValues({ ...values, error: 'Failed to load categories' });
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    // console.log('formData:', formData);

    try {
      setValues({ ...values, error: '', loading: true });

      const data = await createProduct(user._id, token, formData);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          photo: '',
          stock: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
      setValues({
        ...values,
        error: 'Failed to create product',
        loading: false,
      });
    }
  };

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;

    // Update the formData with the correct value
    formData.set(name, value);

    // Update the state with the new form field value
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <div className="alert alert-success mt-3" style={{ display: createdProduct ? '' : 'none' }}>
        {createdProduct && <h4>{createdProduct} created Successfully</h4>}
      </div>
    );
  };
  
  const warningMessage = () => {
    return (
      error && <h4 className="alert alert-danger mt-3">Failed to create Product</h4>
    );
  };
  

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success bg1">
          <input
            onChange={handleChange('photo')}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('name')}
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange('description')}
          type="text"
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('price')}
          type="number"
          name="pricr"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange('category')}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('stock')}
          type="number"
          name="stock"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );
  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createProductForm()}
        </div>
      </div>
      {/* <h1 className="text-white">Add Product</h1> */}
    </Base>
  );
};

export default AddProduct;
