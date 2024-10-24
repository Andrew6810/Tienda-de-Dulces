package com.software.shop.candy.controllers;

import com.software.shop.candy.models.Product;
import com.software.shop.candy.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts(){
    List<Product> products = productService.getAllProducts();
    return ResponseEntity.ok(products);
    }

    @GetMapping("/name")
    public ResponseEntity<Product> getProductByName(@RequestParam("name") String name) {
        Product product = productService.getProductByName(name);
        if (product != null){
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
