package com.project.PointOfSale.services;

import com.project.PointOfSale.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> allProduct();
    Product saveProduct(Product product);
}
