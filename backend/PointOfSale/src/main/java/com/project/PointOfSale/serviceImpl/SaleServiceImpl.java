package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.SaleDTO;
import com.project.PointOfSale.enums.CartStatus;
import com.project.PointOfSale.model.Cart;
import com.project.PointOfSale.model.Sale;
import com.project.PointOfSale.repo.CartRepo;
import com.project.PointOfSale.repo.SaleRepo;
import com.project.PointOfSale.services.SaleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleServiceImpl implements SaleService {
    @Autowired
    SaleRepo saleRepo;

    @Autowired
    CartRepo cartRepo;


    @Override
    @Transactional
    public Sale createSale(SaleDTO saleDTO) {
        // Fetch all items from the cart
        List<Cart> cartItems = cartRepo.findAllByCartStatus(CartStatus.PENDING);

        // If the cart is empty, throw an exception or handle the case
        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Cart is empty, cannot create order.");
        }
        Sale sale = new Sale();
        sale.setCustomerName(saleDTO.getCustomerName());
        sale.setSaleDate(saleDTO.getSaleDate());
        sale.setNote(saleDTO.getNote());
        sale.setCustomerPhone(saleDTO.getCustomerPhone());
        sale.setCustomerAddress(saleDTO.getCustomerAddress());
        sale.setOrderType(saleDTO.getOrderType());
        sale.setOrderStatus(saleDTO.getOrderStatus());
        sale.setTotalAmount(saleDTO.getTotalAmount());
        sale.setTransactionType(saleDTO.getTransactionType());

        sale.setOrderItems(cartItems);

        System.out.println(sale);

        return saleRepo.save(sale);
    }

    @Override
    public List<Sale> getAllSales() {
        return saleRepo.findAll();
    }

    @Override
    public Sale getSaleById(long id) {
        return saleRepo.findById(id).get();
    }
}
