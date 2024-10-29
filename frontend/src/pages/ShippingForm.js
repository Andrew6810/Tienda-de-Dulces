import React, { useState } from 'react';
import '../styles/components/ShippingForm.css';
import { useNavigate } from 'react-router-dom';
import API from '../services/api.js';

const ShippingForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        address: '',
        mail: '',
        phone: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Guardar los datos en sessionStorage (opcional)
        sessionStorage.setItem('shippingInfo', JSON.stringify(formData));
        // Actualizar stock de cada item en el carrito
        const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
        const updatedCartItems = cartItems.map((item) => {
            return { ...item, quantity: item.stock - item.purchaseQuantity
            };
        });
        sessionStorage.setItem('updatedCartItems', JSON.stringify(updatedCartItems));
        // Enviar la información al backend
        updatedCartItems.forEach((item) => {
            item ={
                id: item.id,
                description: item.description,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            }
            API.updateProduct(item).then(() => {
                console.log('Stock actualizado');
            });
        });
        // Limpiar el carrito
        sessionStorage.setItem('cartItems', JSON.stringify([]));
        // Mostrar mensaje de confirmación
        setSubmitted(true);
        navigate('/');

    };

    return (
        <div className="shipping-form-container">
        <h2>Información de Envío</h2>
        {submitted ? (
            <p>¡Gracias! Su información de envío ha sido guardada.</p>
        ) : (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Apellido:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="address">Dirección:</label>
                <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="mail">Email:</label>
                <input
                type="email"
                id="mail"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Teléfono:</label>
                <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                />
            </div>

            <button type="submit" className="submit-button">Guardar Información de Envío</button>
            </form>
        )}
        </div>
    );
};

export default ShippingForm;
