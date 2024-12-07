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
        List<Category> category = categoryRepo.findAll();
        modelMapper.typeMap(Category.class, CategoryDTO.class).addMappings(mapping ->{
//            mapping.map(src->src.getName(),CategoryDTO::setName);
//            mapping.map(src->src.getId(),CategoryDTO::setId);
            mapping.map(src-> src.getProducts() == null ? 0 : src.getProducts().size(),CategoryDTO::setProductCount);
        });
        return category.stream().map( category1 -> modelMapper.map(category, CategoryDTO.class)).collect(Collectors.toList());
    }

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
    public void delete(long id) {
        categoryRepo.deleteById(id);
    }

    public List<Category> test(){
        return categoryRepo.findAll();
    }
}
