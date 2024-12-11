package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.ProductDTO;
import com.project.PointOfSale.MapperDTO.ProductPosDTO;
import com.project.PointOfSale.MapperDTO.ProductShowDTO;
import com.project.PointOfSale.model.Brand;
import com.project.PointOfSale.model.Category;
import com.project.PointOfSale.model.Product;
import com.project.PointOfSale.repo.BrandRepo;
import com.project.PointOfSale.repo.CategoryRepo;
import com.project.PointOfSale.repo.ProductRepo;
import com.project.PointOfSale.services.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private BrandRepo brandRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ProductShowDTO> allProduct() {

        List<Product> product = productRepo.findAll();

        modelMapper.typeMap(Product.class, ProductShowDTO.class).addMappings(mapping -> {
            mapping.map(src -> src.getCategory().getName(), ProductShowDTO::setCategory);
            mapping.map(src -> src.getBrand().getName(), ProductShowDTO::setBrand);
        });
        return product.stream().map(product1 -> modelMapper.map(product1, ProductShowDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Product saveProduct(ProductDTO productDTO) {
        String base64String = productDTO.getImage().split(",")[1];
        byte[] imageBytes = Base64.getDecoder().decode(base64String);
        Category category = categoryRepo.findById(productDTO.getCategory()).get();
        Brand brand = brandRepo.findById(productDTO.getBrand()).get();

        Product product = Product.builder().
                name(productDTO.getName()).
                price(productDTO.getPrice()).
                purchasePrice(productDTO.getPurchasePrice()).
                stock(productDTO.getStock()).
                image(imageBytes).
                category(category).
                brand(brand).
                build();

        return productRepo.save(product);
    }

    @Override
    public Product editProduct(ProductDTO productDTO, long id) {
        Product product = productRepo.findById(id).get();

        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setPurchasePrice(productDTO.getPurchasePrice());
        product.setStock(productDTO.getStock());

        if(productDTO.getImage()!=null && !productDTO.getImage().isEmpty()){
            String base64String = productDTO.getImage().split(",")[1];
            byte[] imageBytes = Base64.getDecoder().decode(base64String);
            product.setImage(imageBytes);
        }

        Category category = categoryRepo.findById(productDTO.getCategory()).get();
        product.setCategory(category);

        Brand brand = brandRepo.findById(productDTO.getBrand()).get();
        product.setBrand(brand);


        return productRepo.save(product);
    }

    @Override
    public void delete(long id) {
        productRepo.deleteById(id);
    }

    @Override
    public ProductPosDTO ProductByID(long id) {
        Product product = productRepo.findById(id).get();

        modelMapper.typeMap(Product.class, ProductPosDTO.class).addMappings(mapping -> {
            mapping.map(src -> src.getCategory().getName(), ProductPosDTO::setCategory);
            mapping.map(src -> src.getBrand().getName(), ProductPosDTO::setBrand);
        });
        return modelMapper.map(product, ProductPosDTO.class);
    }



    @Override
    public List<ProductPosDTO> allProductByName(String name) {

        List<Product> product = productRepo.findAllByName(name);

        modelMapper.typeMap(Product.class, ProductPosDTO.class).addMappings(mapping -> {
            mapping.map(src -> src.getCategory().getName(), ProductPosDTO::setCategory);
            mapping.map(src -> src.getBrand().getName(), ProductPosDTO::setBrand);
        });
        return product.stream().map(product1 -> modelMapper.map(product1, ProductPosDTO.class)).collect(Collectors.toList());
    }

    @Override
    public List<ProductPosDTO> allProductByCategory(long category) {
        List<Product> product = productRepo.findAllByCategory(category);

        modelMapper.typeMap(Product.class, ProductPosDTO.class).addMappings(mapping -> {
            mapping.map(src -> src.getCategory().getName(), ProductPosDTO::setCategory);
            mapping.map(src -> src.getBrand().getName(), ProductPosDTO::setBrand);
        });
        return product.stream().map(product1 -> modelMapper.map(product1, ProductPosDTO.class)).collect(Collectors.toList());
    }




}
