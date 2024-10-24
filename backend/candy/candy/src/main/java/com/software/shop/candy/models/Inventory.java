package com.software.shop.candy.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idProduct", nullable = false)
    private Product product;

    private Integer quantityTemp;
    private Integer quantityReal;

}
