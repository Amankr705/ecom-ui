import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { deleteProduct, getProducts } from './helper/AdminApiCalls';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = async () => {
    try {
      const data = await getProducts();
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.log('Error while fetching products:', error);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = async (productId) => {
    try {
      const data = await deleteProduct(productId, user._id, token);
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
      <Link className="btn btn-info bg3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">All products</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success bg1"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                        deleteThisProduct(product._id);
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

export default ManageProducts;
