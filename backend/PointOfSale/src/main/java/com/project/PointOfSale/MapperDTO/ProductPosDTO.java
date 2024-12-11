package com.project.PointOfSale.MapperDTO;

import com.project.PointOfSale.model.Category;
import lombok.Data;

@Data
public class ProductPosDTO {
    private long id;
    private String name;
    private int stock;
    private double price;
    private String category;
    private String brand;
    private byte[] image;
}
