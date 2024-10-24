package com.software.shop.candy.services;

import com.software.shop.candy.models.Cart;
import com.software.shop.candy.models.Inventory;
import com.software.shop.candy.models.Product;
import com.software.shop.candy.repositories.InventoryRepository;
import com.software.shop.candy.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public void updateInventory(Integer productId) throws Exception {
        Product product = productRepository.findById(productId).orElse(null);
        Inventory inventory = inventoryRepository.findById(productId).orElse(null);
        Cart cart = new Cart();
        if (cart.getStatus() == Boolean.TRUE) {
            inventory.setQuantityTemp(inventory.getQuantityReal() - product.getQuantity() );
        }else {
            inventory.setQuantityReal(inventory.getQuantityTemp());
        }

        // Update product availability
    }
}
