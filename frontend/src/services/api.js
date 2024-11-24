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

export const createInvoice = async (data) => {
    const response = await fetch(`${API_URL}/invoice/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const getInvoices = async () => {
    const response = await fetch(`${API_URL}/invoice/all`);
    return response.json();
};

export const getCustomersById = async (id) => {
    const response = await fetch(`${API_URL}/customer/${id}`);
    return response.json();
};

export const addProduct = async (data) => {
    const response = await fetch(`${API_URL}/products/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const deleteProduct = async (productId) => {
    const response = await fetch(`${API_URL}/products/delete/${productId}`, {
        method: 'DELETE',
    });
    return null;
};

export default { getProducts, getProduct, updateProduct, saveCustomerInfo, createInvoice, getInvoices, getCustomersById, addProduct, deleteProduct };
