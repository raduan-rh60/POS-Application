package com.project.PointOfSale.services;

import com.project.PointOfSale.MapperDTO.CategoryDTO;
import com.project.PointOfSale.model.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> categoryList();
    Category save(Category category);
    Category update(Category category);
    void deleteCategory(long id);
}
