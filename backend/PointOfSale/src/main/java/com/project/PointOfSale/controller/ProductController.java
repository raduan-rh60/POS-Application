package com.project.PointOfSale.controller;

import com.project.PointOfSale.MapperDTO.ProductDTO;
import com.project.PointOfSale.MapperDTO.ProductPosDTO;
import com.project.PointOfSale.MapperDTO.ProductShowDTO;
import com.project.PointOfSale.model.Product;
import com.project.PointOfSale.serviceImpl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/product")
@CrossOrigin(value = "*")
public class ProductController {
    @Autowired
    private ProductServiceImpl productService;

    @GetMapping
    public List<ProductShowDTO> getAllProducts(){
        return this.productService.allProduct();
    }

    @PostMapping("save")
    public Product saveProduct( @RequestBody ProductDTO productDTO) {
        System.out.println(productDTO);
       return productService.saveProduct(productDTO);
    }

    @CrossOrigin(value = "*")
    @PutMapping("edit/{id}")
    public Product editProduct(@RequestBody ProductDTO productDTO, @PathVariable long id){
       return this.productService.editProduct(productDTO,id);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id){
        productService.delete(id);
        return new ResponseEntity<>("Deleted Succesful", HttpStatus.OK);
    }

    @GetMapping("pos")
    public List<ProductPosDTO> allPOSProductByName(@RequestParam String name){
        return productService.allProductByName(name);
    }

    @GetMapping("pos/category")
    public List<ProductPosDTO> allPOSProductByCategory(@RequestParam("id") long categoryId){
        return productService.allProductByCategory(categoryId);
    }

    @GetMapping("{id}")
    public ProductPosDTO productById(@PathVariable long id){
        return productService.ProductByID(id);
    }


}
