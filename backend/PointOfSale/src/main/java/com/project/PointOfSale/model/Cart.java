package com.project.PointOfSale.model;

import com.project.PointOfSale.enums.CartStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private int quantity;
    private double price;
    private double subtotal;
    private double subTotalPurchasePrice;

    @Enumerated(EnumType.STRING)
    private CartStatus cartStatus;

    private long productId;



}
