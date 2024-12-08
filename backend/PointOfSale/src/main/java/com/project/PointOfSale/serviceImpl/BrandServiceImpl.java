package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.BrandDTO;
import com.project.PointOfSale.model.Brand;
import com.project.PointOfSale.repo.BrandRepo;
import com.project.PointOfSale.services.BrandService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepo brandRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<BrandDTO> brandList() {
        List<Brand> repoBrand = brandRepo.findAll();

        return repoBrand.stream().map(brand -> {
            // Create a CategoryDTO instance
            BrandDTO brandDTO = modelMapper.map(brand, BrandDTO.class);

            // Manually set the product count (size of the products collection)
            if (brand.getProducts() != null) {
                brandDTO.setProductCount(brand.getProducts().size()); // Set product count
            } else {
                brandDTO.setProductCount(0); // Set product count as 0 if no products are present
            }

            return brandDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public Brand save(Brand brand) {
        return brandRepo.save(brand);
    }

    @Override
    public Brand update(Brand brand) {
        Brand oldBrand = brandRepo.findById(brand.getId()).get();
        oldBrand.setName(brand.getName());

        return brandRepo.save(oldBrand);
    }

    @Override
    public void deleteBrand(long id) {
        brandRepo.deleteById(id);
    }
}
