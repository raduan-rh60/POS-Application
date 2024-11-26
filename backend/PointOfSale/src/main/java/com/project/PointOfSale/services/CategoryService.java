package com.project.PointOfSale.services;

import com.project.PointOfSale.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> categoryList();
    Category save(Category category);
}
