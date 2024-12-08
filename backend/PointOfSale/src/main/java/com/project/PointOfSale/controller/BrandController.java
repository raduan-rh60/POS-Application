package com.project.PointOfSale.controller;

import com.project.PointOfSale.MapperDTO.BrandDTO;
import com.project.PointOfSale.MapperDTO.BrandDTO;
import com.project.PointOfSale.model.Brand;
import com.project.PointOfSale.serviceImpl.BrandServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/brand")
@CrossOrigin(value = "*")
public class BrandController {
    
    @Autowired
    BrandServiceImpl brandService;

    @GetMapping
    public List<BrandDTO> allBrand(){
        return brandService.brandList();
    }

    @PostMapping("save")
    public Brand save(@RequestBody Brand brand){
        return brandService.save(brand);
    }

    @PutMapping("edit")
    public Brand edit(@RequestBody Brand brand){
        return brandService.update(brand);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable long id){
        brandService.deleteBrand(id);
        return new ResponseEntity<>("delete Successful", HttpStatus.OK);
    }
}
