package com.project.PointOfSale.services;

import com.project.PointOfSale.MapperDTO.BrandDTO;
import com.project.PointOfSale.MapperDTO.CategoryDTO;
import com.project.PointOfSale.model.Brand;
import com.project.PointOfSale.model.Category;

import java.util.List;

public interface BrandService {
    List<BrandDTO> brandList();
    Brand save(Brand brand);

    Brand update(Brand brand);
    void deleteBrand(long id);
}
