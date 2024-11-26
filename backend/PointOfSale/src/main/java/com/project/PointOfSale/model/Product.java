package com.project.PointOfSale.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private int stock;
    private double purchasePrice;
    private double price;

//    private int category_id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id",nullable = false)
    @JsonIgnoreProperties("products")
    private Category category;

//    private int brand_id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "brand_id",nullable = true)
    @JsonIgnoreProperties("products")
    private Brand brand;



}
