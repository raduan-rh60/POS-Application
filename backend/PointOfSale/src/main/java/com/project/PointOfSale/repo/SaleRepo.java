package com.project.PointOfSale.repo;

import com.project.PointOfSale.enums.OrderStatus;
import com.project.PointOfSale.enums.OrderType;
import com.project.PointOfSale.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleRepo extends JpaRepository<Sale, Long> {

    //    @Query(nativeQuery = true,value = "select * from pos.sale where order_type = ?1")
//    List<Sale> findAllByOrderType(OrderType orderType);
    @Query("SELECT s FROM Sale s WHERE s.orderType = :orderType")
    List<Sale> findAllByOrderType(@Param("orderType") OrderType orderType);

}
