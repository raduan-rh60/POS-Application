package com.project.PointOfSale.repo;

import com.project.PointOfSale.model.Shop;
import com.project.PointOfSale.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopRepo extends JpaRepository<Shop,Integer> {
}
