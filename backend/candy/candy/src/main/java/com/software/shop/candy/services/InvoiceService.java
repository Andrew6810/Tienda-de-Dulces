package com.software.shop.candy.services;

import com.software.shop.candy.models.Cart;
import com.software.shop.candy.models.Invoice;
import com.software.shop.candy.models.Product;
import com.software.shop.candy.repositories.CartRepository;
import com.software.shop.candy.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    CartRepository cartRepository;

    public double calculateInvoiceTotal(Integer idCart) {
        Cart cart = cartRepository.findById(idCart).orElse(null);

        if (cart == null) {
            throw new IllegalArgumentException("Cart not found with id: "+ idCart);
        }

        double total = 0.0;
        for (Product product: cart.getProducts()) {
            total += product.getQuantity() * product.getPrice();
        }

        Invoice invoice = new Invoice();
        invoice.setCart(cart);
        invoice.setTotal(total);
        invoice.setDate(new java.sql.Timestamp(System.currentTimeMillis()));
        invoiceRepository.save(invoice);

        return total;

    }


}
