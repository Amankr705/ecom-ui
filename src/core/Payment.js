import React, { useState, useEffect } from 'react';
import { loadCart, cartEmpty } from './helper/CartHelper';
import { Link } from 'react-router-dom';
import { getmeToken, processPayment } from './helper/PaymentHelper';
import { createOrder } from './helper/OrderHelper';
import { isAuthenticated } from '../auth/helper';

import DropIn from 'braintree-web-drop-in-react';

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = async (userId, token) => {
    try {
      const info = await getmeToken(userId, token);
      // console.log('INFORMATION', info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    } catch (error) {
      console.log('Error in getToken:', error);
    }
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-block btn-outline-success"
              onClick={onPurchase}
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  const onPurchase = async () => {
    try {
      setInfo({ loading: true });

      const data = await info.instance.requestPaymentMethod();
      const nonce = data.nonce;

      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };

      const response = await processPayment(userId, token, paymentData);

      if (response.success) {
        console.log('PAYMENT SUCCESS');

        const orderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
        };

        await createOrder(userId, token, orderData);
        cartEmpty(() => {
          console.log('Cart emptied');
        });

        setReload(!reload);
        setInfo({ ...info, success: true, loading: false });
      } else {
        console.log('PAYMENT FAILED');
        setInfo({ loading: false, success: false });
      }
    } catch (error) {
      console.error('Error in onPurchase:', error);
      setInfo({ loading: false, success: false });
    }
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your Bill is {getAmount()} $</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Payment;
