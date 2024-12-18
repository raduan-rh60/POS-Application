package com.project.PointOfSale.controller;

import com.project.PointOfSale.MapperDTO.DamageDTO;
import com.project.PointOfSale.serviceImpl.DamageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/damages")
@CrossOrigin
public class DamageController {

    @Autowired
    private DamageServiceImpl damageService;

    // Endpoint to create or update a Damage
    @PostMapping("/createOrUpdate")
    public ResponseEntity<DamageDTO> createOrUpdateDamage(@RequestBody DamageDTO damageDTO) {
        try {
            // Call the service to create or update the damage record
            DamageDTO savedDamage = damageService.createDamage(damageDTO);
            return ResponseEntity.ok(savedDamage);  // Return the saved DamageDTO with HTTP 200 OK
        } catch (RuntimeException e) {
            // Handle errors (like product not found, insufficient quantity)
            return ResponseEntity.badRequest().body(null);  // Return HTTP 400 with an error message
        }
    }

    // Endpoint to retrieve all Damage records
    @GetMapping
    public ResponseEntity<List<DamageDTO>> getDamageList() {
        // Call the service to fetch the list of damage records
        List<DamageDTO> damages = damageService.damageList();
        return ResponseEntity.ok(damages);  // Return the list of DamageDTOs with HTTP 200 OK
    }

    // Endpoint to delete a Damage record by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDamage(@PathVariable long id) {
        try {
            // Call the service to delete the damage record
            damageService.deleteReport(id);
            return ResponseEntity.ok("Damage report deleted successfully");  // Return success message
        } catch (RuntimeException e) {
            // Handle errors (like record not found)
            return ResponseEntity.badRequest().body("Damage report not found");  // Return HTTP 400 with an error message
        }
    }
}
