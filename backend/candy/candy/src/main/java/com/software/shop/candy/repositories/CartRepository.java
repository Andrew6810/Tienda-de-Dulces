package com.software.shop.candy.repositories;

import com.software.shop.candy.models.Cart;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;

@Entity
public interface CartRepository extends JpaRepository<Cart, Integer> {
}
