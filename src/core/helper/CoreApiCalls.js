import { API } from '../../backend';

//get all Products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API}/products`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};
