package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.model.Product;
import com.project.PointOfSale.repo.ProductRepo;
import com.project.PointOfSale.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Override
    public List<Product> allProduct() {
        return productRepo.findAll();
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepo.save(product);
    }
}
