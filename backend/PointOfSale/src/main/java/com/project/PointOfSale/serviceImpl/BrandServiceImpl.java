package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.model.Brand;
import com.project.PointOfSale.repo.BrandRepo;
import com.project.PointOfSale.services.BrandService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepo brandRepo;

    @Override
    public List<Brand> categoryList() {
        return brandRepo.findAll();
    }

    @Override
    public Brand save(Brand brand) {
        return brandRepo.save(brand);
    }
}
