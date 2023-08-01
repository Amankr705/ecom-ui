import { API } from '../../backend';

//category calls
export const createCategory = async (userId, token, category) => {
  try {
    // console.log({userId})
    // console.log(userId)
    // console.log(token)
    // console.log(category)
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

//get all categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${API}/category/all`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

//update a category
//TODO:
export const updateCategory = async (categoryId, userId, token, category) => {
  // console.log(category);
  try {
    const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: category,
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

//delete a category
//TODO:
export const deleteCategory = async (categoryId, userId, token) => {
  // console.log(categoryId)
  // console.log(userId)
  // console.log(token)

  try {
    const response = await fetch(`${API}/product/${categoryId}/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application.json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

//product calls

//create a product
export const createProduct = async (userId, token, product) => {
  // console.log(userId)
  // console.log(token)
  console.log(product);
  try {
    const response = await fetch(`${API}/product/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

//get all products
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

//get a product
export const getProduct = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

//update a product
//TODO:
export const updateProduct = async (productId, userId, token, product) => {
  // console.log(product);
  try {
    const response = await fetch(`${API}/product/${productId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },

      body: product,
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

//delete a product
export const deleteProduct = async (productId, userId, token) => {
  // console.log(productId)
  // console.log(userId)
  // console.log(token)

  try {
    const response = await fetch(`${API}/product/${productId}/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application.json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};
