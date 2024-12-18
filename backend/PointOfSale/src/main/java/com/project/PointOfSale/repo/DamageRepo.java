package com.project.PointOfSale.repo;

import com.project.PointOfSale.model.Brand;
import com.project.PointOfSale.model.Damage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DamageRepo extends JpaRepository<Damage,Long> {
}
