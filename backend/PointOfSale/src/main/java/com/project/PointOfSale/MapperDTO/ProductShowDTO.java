package com.project.PointOfSale.MapperDTO;

import lombok.Data;

@Data
public class ProductShowDTO {
    private long id;
    private String name;
    private int stock;
    private double purchasePrice;
    private double price;
    private byte[] image;
    private String category;
    private String brand;
}
