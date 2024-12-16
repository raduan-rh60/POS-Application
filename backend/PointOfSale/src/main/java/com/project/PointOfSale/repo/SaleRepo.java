package com.project.PointOfSale.repo;

import com.project.PointOfSale.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepo extends JpaRepository<Sale,Long> {
}
