package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.ProductReturnDTO;
import com.project.PointOfSale.model.Cart;
import com.project.PointOfSale.model.Product;
import com.project.PointOfSale.model.ProductReturn;
import com.project.PointOfSale.model.Sale;
import com.project.PointOfSale.repo.CartRepo;
import com.project.PointOfSale.repo.ProductRepo;
import com.project.PointOfSale.repo.ProductReturnRepo;
import com.project.PointOfSale.repo.SaleRepo;
import com.project.PointOfSale.services.ProductReturnService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductReturnServiceImpl implements ProductReturnService {
    @Autowired
    ProductReturnRepo productReturnRepo;
    @Autowired
    CartRepo cartRepo;
    @Autowired
    ProductRepo productRepo;
    @Autowired
    SaleRepo saleRepo;

    @Override
    public List<ProductReturn> getAllProductReturn() {
        return productReturnRepo.findAll();
    }


    @Override
    @Transactional
    public ProductReturn saveProductReturn(ProductReturnDTO productReturnDTO) {
        System.out.println(productReturnDTO);

        // Create a new ProductReturn entity from the DTO
        ProductReturn productReturn = new ProductReturn();

        // Set the return amount and discount from the DTO
        productReturn.setReturnAmount(productReturnDTO.getReturnAmount());
        productReturn.setDiscount(productReturnDTO.getDiscount());
        productReturn.setDate(LocalDate.now());

        // Process the return items
        for (Cart cart : productReturnDTO.getReturnItems()) {
            // Retrieve the existing Cart entity using the cartDTO id
            Optional<Cart> existingCartOpt = cartRepo.findById(cart.getId());

            if (existingCartOpt.isPresent()) {
                // Get the existing Cart item from the database
                Cart existingCart = existingCartOpt.get();

                // Set the returnQuantity for the Cart item based on the DTO
                existingCart.setReturnQuantity(cart.getReturnQuantity());

                // Retrieve the associated Product from the Cart item
                Optional<Product> associatedProductOpt = productRepo.findById(existingCart.getProductId());

                if (associatedProductOpt.isPresent()) {
                    Product associatedProduct = associatedProductOpt.get();
                    // Update the stock of the Product
                    associatedProduct.setStock(associatedProduct.getStock() + cart.getReturnQuantity());

                    // Save the updated Product entity
                    productRepo.save(associatedProduct); // Persist the changes to Product
                } else {
                    // Handle case where Product is not found
                    System.out.println("Product with ID " + existingCart.getProductId() + " not found.");
                }

                // Reattach the Cart entity to the session using merge
                cartRepo.save(existingCart); // Merge the Cart entity into the current session
            } else {
                // Handle case where Cart item is not found
                System.out.println("Cart item with ID " + cart.getId() + " not found.");
            }
        }

        // Set the order Foreign Key from the Invoice (Sale entity)
        Optional<Sale> invoiceOpt = saleRepo.findById(productReturnDTO.getOrderID());
        if (invoiceOpt.isPresent()) {
            Sale invoice = invoiceOpt.get();
            productReturn.setOrder_id(invoice);
        } else {
            // Handle the case where Sale (Invoice) is not found
            throw new EntityNotFoundException("Sale with ID " + productReturnDTO.getOrderID() + " not found");
        }


        // Save the ProductReturn entity to the database
        return productReturnRepo.save(productReturn); // Persist the ProductReturn entity
    }



}
