package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.model.Category;
import com.project.PointOfSale.repo.CategoryRepo;
import com.project.PointOfSale.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public List<Category> categoryList() {
        return categoryRepo.findAll();
    }

    @Override
    public Category save(Category category) {
        return categoryRepo.save(category);
    }
}
