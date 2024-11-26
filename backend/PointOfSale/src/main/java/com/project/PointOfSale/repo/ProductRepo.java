package com.project.PointOfSale.repo;

import com.project.PointOfSale.model.Brand;
import com.project.PointOfSale.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {
}
