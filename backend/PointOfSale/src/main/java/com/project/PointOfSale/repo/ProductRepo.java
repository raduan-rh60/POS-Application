package com.project.PointOfSale.repo;

import com.project.PointOfSale.model.Brand;
import com.project.PointOfSale.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM product WHERE name Like %?%1")
    public List<Product> findAllByName(String name);

    @Query(nativeQuery = true, value = "SELECT * FROM product WHERE category_id =?1")
    public List<Product> findAllByCategory(long category_id);

    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.stock = :stock WHERE p.id = :id")
    void updateProductQuantity(Long id, int stock);

}
