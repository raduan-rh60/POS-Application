package com.project.PointOfSale.repo;

import com.project.PointOfSale.enums.CartStatus;
import com.project.PointOfSale.model.Cart;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart,Long> {

    List<Cart> findAllByCartStatus(CartStatus cartStatus);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Cart c SET c.cartStatus = :newStatusType WHERE c.cartStatus = 'PENDING'")
    int updateCartStatusForPendingOrders(@Param("newStatusType") CartStatus newStatusType);

    Cart findByProductIdAndCartStatus(Long productId, CartStatus cartStatus);
}
