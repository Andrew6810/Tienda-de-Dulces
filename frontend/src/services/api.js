const API_URL = 'http://localhost:8080/api';

export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products/all`);
    return response.json();
};

export const getProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
};

export const updateProduct = async (data) => {
    const response = await fetch(`${API_URL}/products/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const saveCustomerInfo = async (data) => {
    const response = await fetch(`${API_URL}/customer/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export default { getProducts, getProduct, updateProduct, saveCustomerInfo };
