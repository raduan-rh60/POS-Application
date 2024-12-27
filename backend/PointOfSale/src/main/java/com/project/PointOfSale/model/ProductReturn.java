package com.project.PointOfSale.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_return")
public class ProductReturn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate date;
    private double returnAmount;
    private double discount;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Sale order_id;
}
