package com.project.PointOfSale.controller;

import com.project.PointOfSale.model.Product;
import com.project.PointOfSale.serviceImpl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/product")
public class ProductController {
    @Autowired
    private ProductServiceImpl productService;

    @GetMapping
    public List<Product> getAllProducts(){
        return this.productService.allProduct();
    }

    @PostMapping
    public Product saveProduct(@RequestPart("file") MultipartFile file, @RequestBody Product product) throws IOException {
        Product passProduct = Product.builder().image(file.getBytes()).build();
//        passProduct.setName(product.getName());
//        passProduct.setBrand(product.getBrand());
//        passProduct.setPrice(product.getPrice());
//        passProduct.setStock(product.getStock());
//        passProduct.setPurchasePrice(product.getPurchasePrice());
//        passProduct.setCategory(product.getCategory());
//        passProduct.setImage(product.builder().image(file.getBytes()).build());

       return productService.saveProduct(passProduct);
    }

}
