package com.project.PointOfSale.MapperDTO;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class DamageDTO {
    private long id;
    private long productId;
    private String productName;
    private String reason;
    private int quantity;
    private double ProductPrice;
    private double damageAmount;
    private LocalDate date;
}
