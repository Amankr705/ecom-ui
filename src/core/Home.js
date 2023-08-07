import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/CoreApiCalls';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = async () => {
    try {
      const data = await getProducts();
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    } catch (error) {
      setError('Error while loading products');
    }
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  // console.log('API IS', API);
  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white mb-4">All of tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
      {/* <h1 className="text-white">Home Page</h1> */}
    </Base>
  );
}
