import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getCategories, deleteCategory } from './helper/AdminApiCalls';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = async () => {
    try {
      const data = await getCategories();
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.log('Error while fetching products:', error);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = async (categoryId) => {
    try {
      const data = await deleteCategory(categoryId, user._id, token);
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    } catch (error) {
      console.log('Error while deleting product:', error);
    }
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">All categories</h2>

          {categories.map((category, index) => {
            return (
              <div className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
