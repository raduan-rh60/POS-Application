package com.project.PointOfSale.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "shop")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String location;

//  User bi-direction
    @OneToMany(mappedBy = "shop")
    @JsonIgnoreProperties("shop") // Prevents infinite recursion
    private List<User> users;

//  Bi-direction for employee and manager
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "manager_id",nullable = false)
    @JsonIgnoreProperties(value = "shopEmp")
    private Employee shopManager;

//  uni-direction for products and shop
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "product_shop",
            joinColumns = @JoinColumn(name = "shop_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

}