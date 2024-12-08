package com.project.PointOfSale.controller;

import com.project.PointOfSale.MapperDTO.CategoryDTO;
import com.project.PointOfSale.model.Category;
import com.project.PointOfSale.serviceImpl.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/category")
@CrossOrigin(value = "*")
public class CategoryController {

    @Autowired
    CategoryServiceImpl categoryService;

    @GetMapping
    public List<CategoryDTO> allCategory(){
        return categoryService.categoryList();
    }

    @PostMapping("save")
    public Category save(@RequestBody Category category){
        return categoryService.save(category);
    }

    @PutMapping("edit")
    public Category edit(@RequestBody Category category){
        return categoryService.update(category);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable long id){
        categoryService.deleteCategory(id);
        return new ResponseEntity<>("delete Successful", HttpStatus.OK);
    }



}
