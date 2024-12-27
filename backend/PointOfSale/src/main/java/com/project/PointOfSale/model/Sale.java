package com.project.PointOfSale.model;

import com.project.PointOfSale.enums.OrderStatus;
import com.project.PointOfSale.enums.OrderType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sale")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerName;
    private LocalDate saleDate;
    private LocalTime saleTime;
    private String customerAddress;
    private String customerPhone;
    private double totalAmount;
    private double discount;
    private String note;
    private String transactionType;
    private double totalPurchasePrice;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @OneToMany( cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<Cart> orderItems;


}
