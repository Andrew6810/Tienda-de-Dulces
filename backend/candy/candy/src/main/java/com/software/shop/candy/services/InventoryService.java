package com.software.shop.candy.services;

import com.software.shop.candy.models.Inventory;
import com.software.shop.candy.models.Product;
import com.software.shop.candy.repositories.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    @Override
    private ProductRepository productRepository;

    public Inventory updateInventoryReal(Integer quantityReal) {
        Product product = productRepository.findById(productId).orElse(null) {
            product.
        }
    }
}
