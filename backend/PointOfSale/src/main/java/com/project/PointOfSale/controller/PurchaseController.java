package com.project.PointOfSale.controller;

import com.project.PointOfSale.model.Purchase;
import com.project.PointOfSale.serviceImpl.PurchaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/purchases")
@CrossOrigin
public class PurchaseController {

    @Autowired
    private PurchaseServiceImpl purchaseService;

    // Get all purchases
    @GetMapping
    public List<Purchase> getAllPurchases() {
        return purchaseService.getAllPurchases();
    }

    // Get purchase by ID
    @GetMapping("/{id}")
    public ResponseEntity<Purchase> getPurchaseById(@PathVariable long id) {
        Optional<Purchase> purchase = purchaseService.getPurchaseById(id);
        return purchase.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create or update a purchase
    @PostMapping
    public ResponseEntity<Purchase> createPurchase(@RequestBody Purchase purchase) {
        Purchase savedPurchase = purchaseService.savePurchase(purchase);
        return new ResponseEntity<>(savedPurchase, HttpStatus.OK);
    }

    // Update a purchase
    @PutMapping("/{id}")
    public ResponseEntity<Purchase> updatePurchase(@PathVariable long id, @RequestBody Purchase purchase) {
        Optional<Purchase> existingPurchase = purchaseService.getPurchaseById(id);
        if (existingPurchase.isPresent()) {
            purchase.setId(id); // Ensure the ID stays the same
            Purchase updatedPurchase = purchaseService.savePurchase(purchase);
            return ResponseEntity.ok(updatedPurchase);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a purchase
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchase(@PathVariable long id) {
        purchaseService.deletePurchase(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("year-month")
    public List<Map<String, Object>> findGroupByYearAndMonth(){
        return purchaseService.getPurchasesGroupedByYearAndMonth();
    }
}

