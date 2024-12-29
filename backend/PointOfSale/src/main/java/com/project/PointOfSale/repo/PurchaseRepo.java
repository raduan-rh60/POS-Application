package com.project.PointOfSale.repo;

import com.project.PointOfSale.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepo extends JpaRepository<Purchase,Long> {

        @Query("SELECT YEAR(p.date) AS year, MONTH(p.date) AS month, SUM(p.sub_total) AS totalAmount " +
                "FROM Purchase p " +
                "GROUP BY YEAR(p.date), MONTH(p.date)")
        List<Object[]> getPurchasesGroupedByYearAndMonth();

}
