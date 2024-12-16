package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.CategoryDTO;
import com.project.PointOfSale.model.Category;
import com.project.PointOfSale.repo.CategoryRepo;
import com.project.PointOfSale.services.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CategoryDTO> categoryList() {
        // Fetch all categories from the repository
        List<Category> repoCategory = categoryRepo.findAll();

        // Convert each Category to CategoryDTO
        return repoCategory.stream().map(category -> {
            // Create a CategoryDTO instance
            CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);

            // Manually set the product count (size of the products collection)
            if (category.getProducts() != null) {
                categoryDTO.setProductCount(category.getProducts().size()); // Set product count
            } else {
                categoryDTO.setProductCount(0); // Set product count as 0 if no products are present
            }

            return categoryDTO;
        }).collect(Collectors.toList());
    }




//    public List<CategoryDTO> categoryList() {
//        List<Category> repoCategory = categoryRepo.findAll();
//
//        // Set up a custom mapping to handle the PersistentBag correctly
//        modelMapper.typeMap(Category.class, CategoryDTO.class).addMappings(mapping -> {
//            // Map the size of the products list (PersistentBag) to the productCount in DTO
//            mapping.map(src -> src.getProducts() == null ? 0 : src.getProducts().size(), CategoryDTO::setProductCount);
//        });
//
//        // Map each Category object to CategoryDTO
//        return repoCategory.stream()
//                .map(category -> modelMapper.map(category, CategoryDTO.class))
//                .collect(Collectors.toList());
//    }

    @Override
    public Category save(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public Category update(Category category) {
        Category oldCategory = categoryRepo.findById(category.getId()).get();
        oldCategory.setName(category.getName());

        return categoryRepo.save(oldCategory);
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepo.deleteById(id);
    }



}
