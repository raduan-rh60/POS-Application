package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.model.Purchase;
import com.project.PointOfSale.repo.PurchaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PurchaseServiceImpl {
    @Autowired
    private PurchaseRepo purchaseRepository;

    public Purchase savePurchase(Purchase purchase) {
        purchase.setSub_total(purchase.getQuantity() * purchase.getRate()); // Calculate sub_total
        return purchaseRepository.save(purchase);
    }

    // Get all purchases
    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    // Get purchase by ID
    public Optional<Purchase> getPurchaseById(long id) {
        return purchaseRepository.findById(id);
    }

    // Delete a purchase by ID
    public void deletePurchase(long id) {
        purchaseRepository.deleteById(id);
    }
}
