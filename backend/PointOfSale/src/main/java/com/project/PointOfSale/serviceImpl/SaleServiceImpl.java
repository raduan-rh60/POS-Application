package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.SaleDTO;
import com.project.PointOfSale.enums.CartStatus;
import com.project.PointOfSale.enums.OrderStatus;
import com.project.PointOfSale.enums.OrderType;
import com.project.PointOfSale.model.Cart;
import com.project.PointOfSale.model.Product;
import com.project.PointOfSale.model.Sale;
import com.project.PointOfSale.repo.CartRepo;
import com.project.PointOfSale.repo.ProductRepo;
import com.project.PointOfSale.repo.SaleRepo;
import com.project.PointOfSale.services.SaleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SaleServiceImpl implements SaleService {
    @Autowired
    SaleRepo saleRepo;

    @Autowired
    CartRepo cartRepo;

    @Autowired
    ProductRepo productRepo;


    @Override
    @Transactional
    public Sale createSale(SaleDTO saleDTO) {
        // Fetch all items from the cart
        List<Cart> cartItems = cartRepo.findAllByCartStatus(CartStatus.PENDING);
        // Create a new Sale entity and set details from SaleDTO
        Sale sale = new Sale();
        sale.setCustomerName(saleDTO.getCustomerName());
        sale.setSaleDate(LocalDate.now());  // Set the current date
        sale.setSaleTime(LocalTime.now());  // Set the current time
        sale.setNote(saleDTO.getNote());
        sale.setCustomerPhone(saleDTO.getCustomerPhone());
        sale.setCustomerAddress(saleDTO.getCustomerAddress());
        sale.setOrderType(saleDTO.getOrderType());
        sale.setOrderStatus(saleDTO.getOrderStatus());
        sale.setTransactionType(saleDTO.getTransactionType());

        // Initialize total amounts
        double totalAmount = 0;
        double totalPurchasePrice = 0;

        // Loop through the cart items and process each product
        for (Cart cartItem : cartItems) {
            // Fetch product from the Product table using the productId from the Cart
            Product product = productRepo.findById(cartItem.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + cartItem.getProductId()));

            // Check if there is enough stock for the product in the cart
            int newStock = product.getStock() - cartItem.getQuantity();
            if (newStock < 0) {
                throw new IllegalStateException("Insufficient stock for product: " + product.getName());
            }

            // Update the product quantity in the Product table
            product.setStock(newStock);
            productRepo.save(product);

            // Calculate the totals
            totalAmount += cartItem.getSubtotal();  // Subtotal is already set in the Cart
            totalPurchasePrice += cartItem.getSubTotalPurchasePrice();  // Subtotal purchase price is also set in the Cart
        }

        // Calculate discount based on the percentage
        double discountAmount = (saleDTO.getDiscount() / 100) * totalAmount;  // Apply discount on the totalAmount
        double discountedTotalAmount = totalAmount - discountAmount;


        // Apply discount to the totalAmount and totalPurchasePrice
        sale.setTotalAmount(discountedTotalAmount);
        sale.setTotalPurchasePrice(totalPurchasePrice);  // You can apply a similar discount to totalPurchasePrice if needed
        sale.setDiscount(discountAmount);  // Store the discount amount applied

        sale.setOrderItems(cartItems);  // Set the cart items in the sale

        // Save the sale and return the result
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

    @Override
    public List<Sale> getAllSalesByOrderType(String oderType) {
        OrderType enumValue = OrderType.valueOf(oderType);
        System.out.println(enumValue);
        return saleRepo.findAllByOrderType(enumValue);
    }

    public void delete(long id){
        saleRepo.deleteById(id);
    }

    public Sale updateSale(Long saleId, SaleDTO saleDTO) {
        // Fetch the existing sale by its ID
        Sale existingSale = saleRepo.findById(saleId)
                .orElseThrow(() -> new IllegalStateException("Sale not found with id: " + saleId));

        // Update the sale properties with the values from the SaleDTO
        existingSale.setCustomerName(saleDTO.getCustomerName());
        existingSale.setSaleDate(LocalDate.now());
        existingSale.setNote(saleDTO.getNote());
        existingSale.setCustomerPhone(saleDTO.getCustomerPhone());
        existingSale.setCustomerAddress(saleDTO.getCustomerAddress());
        existingSale.setOrderType(saleDTO.getOrderType());
        existingSale.setOrderStatus(saleDTO.getOrderStatus());
        existingSale.setTotalAmount(saleDTO.getTotalAmount());
        existingSale.setTransactionType(saleDTO.getTransactionType());
        existingSale.setTotalPurchasePrice(saleDTO.getTotalPurchasePrice());


        // Save the updated sale back to the repository
        return saleRepo.save(existingSale);
    }
}
