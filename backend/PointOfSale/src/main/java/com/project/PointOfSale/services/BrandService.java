package com.project.PointOfSale.services;

import com.project.PointOfSale.model.Brand;

import java.util.List;

public interface BrandService {
    List<Brand> categoryList();
    Brand save(Brand brand);
}
