package com.project.PointOfSale.controller;

import com.project.PointOfSale.MapperDTO.ProductReturnDTO;
import com.project.PointOfSale.model.ProductReturn;
import com.project.PointOfSale.serviceImpl.ProductReturnServiceImpl;
import com.project.PointOfSale.services.ProductReturnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("api/return")
@CrossOrigin
public class ProductReturnController {
    @Autowired
    ProductReturnServiceImpl productReturnService;

    @GetMapping
    List<ProductReturn> allReturn(){
        return productReturnService.getAllProductReturn();
    }

    @PostMapping
    ProductReturn saveReturn(@RequestBody ProductReturnDTO productReturnDTO){
        return productReturnService.saveProductReturn(productReturnDTO);
    }


}
