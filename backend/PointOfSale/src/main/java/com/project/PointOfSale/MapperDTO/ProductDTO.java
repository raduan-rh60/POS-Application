package com.project.PointOfSale.MapperDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.PointOfSale.model.Brand;
import com.project.PointOfSale.model.Category;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class ProductDTO {
    private long id;
    private String name;
    private int stock;
    private double purchasePrice;
    private double price;
    private String image;
    private long category;
    private long brand;
}
