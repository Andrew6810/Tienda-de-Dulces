const API_URL = 'http://localhost:8080/api';
export const API = 'https://api.example.com';

// Obtener todos los productos
export const getProducts = async (filter = 'all') => {
    try {
        const response = await fetch(`${API_URL}/products/all`);
        const data = await response.json();

        // Si se pasa un filtro, filtra los productos
        if (filter === 'offer') {
            return data.filter(product => product.onOffer === true); // Filtrar productos en oferta
        }

        return data; // Retorna todos los productos si no hay filtro
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; // Retorna un arreglo vacío en caso de error
    }
};

// Obtener un producto por su ID
export const getProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        return response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null; // Retorna null en caso de error
    }
};

// Actualizar un producto
export const updateProduct = async (data) => {
    try {
        const response = await fetch(`${API_URL}/products/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
};

// Guardar la información del cliente
export const saveCustomerInfo = async (data) => {
    try {
        const response = await fetch(`${API_URL}/customer/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        console.error('Error saving customer info:', error);
        return null;
    }
};

export default { getProducts, getProduct, updateProduct, saveCustomerInfo };
