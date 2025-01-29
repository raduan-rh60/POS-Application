package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.model.Purchase;
import com.project.PointOfSale.repo.PurchaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class PurchaseServiceImpl {
    @Autowired
    private PurchaseRepo purchaseRepository;

    public Purchase savePurchase(Purchase purchase) {
        purchase.setSub_total(purchase.getQuantity() * purchase.getRate());// Calculate sub_total
        purchase.setDate(LocalDate.now());
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

    public List<Map<String, Object>> getPurchasesGroupedByYearAndMonth() {
        // Fetch grouped data from the repository
        List<Object[]> results = purchaseRepository.getPurchasesGroupedByYearAndMonth();

        // Create a map to group by year and month
        Map<Integer, Map<Integer, Double>> purchasesGroupedByYearAndMonth = new LinkedHashMap<>();

        for (Object[] result : results) {
            Integer year = (Integer) result[0];
            Integer month = (Integer) result[1];
            Double totalAmount = (Double) result[2];

            // Ensure the year exists in the map
            purchasesGroupedByYearAndMonth
                    .computeIfAbsent(year, k -> new LinkedHashMap<>())
                    .put(month, totalAmount);
        }

        // Now map it into the desired response format
        List<Map<String, Object>> response = new ArrayList<>();
        for (Map.Entry<Integer, Map<Integer, Double>> entry : purchasesGroupedByYearAndMonth.entrySet()) {
            Map<String, Object> yearData = new HashMap<>();
            yearData.put("year", entry.getKey());
            yearData.put("monthData", entry.getValue());
            response.add(yearData);
        }

        return response;
    }
}
