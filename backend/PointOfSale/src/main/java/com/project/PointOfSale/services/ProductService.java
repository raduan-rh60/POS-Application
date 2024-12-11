package com.project.PointOfSale.services;

import com.project.PointOfSale.MapperDTO.ProductDTO;
import com.project.PointOfSale.MapperDTO.ProductPosDTO;
import com.project.PointOfSale.MapperDTO.ProductShowDTO;
import com.project.PointOfSale.model.Product;

import java.util.List;

public interface ProductService {
    List<ProductShowDTO> allProduct();
    Product saveProduct(ProductDTO productDTO);
    Product editProduct(ProductDTO productDTO,long id);
    void delete(long id);

//    Product listing for POS Module;
    ProductPosDTO ProductByID(long id);
    List<ProductPosDTO> allProductByName(String name);
    List<ProductPosDTO> allProductByCategory(long category);
}
