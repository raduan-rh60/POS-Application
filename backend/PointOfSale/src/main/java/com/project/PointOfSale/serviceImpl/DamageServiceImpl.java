package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.DamageDTO;
import com.project.PointOfSale.model.Damage;
import com.project.PointOfSale.model.Product;
import com.project.PointOfSale.repo.DamageRepo;
import com.project.PointOfSale.repo.ProductRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DamageServiceImpl {

    @Autowired
    private DamageRepo damageRepository;

    @Autowired
    private ProductRepo productRepository;
    @Autowired
    private ModelMapper modelMapper;

    // Create or update a Damage
    @Transactional
    public DamageDTO createDamage(DamageDTO damageDTO) {
        // Find the Product by its ID (or productName if required)
        Product product = productRepository.findById(damageDTO.getProductId())  // Assuming productId is a String
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Ensure the product exists and its quantity is sufficient for the damage
        if (product.getStock() < damageDTO.getQuantity()) {
            throw new RuntimeException("Insufficient product quantity");
        }

        // Create or update the Damage entity
        Damage damage = new Damage();
        if (damageDTO.getId() != 0) {
            damage = damageRepository.findById(damageDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Damage not found"));
        }

        // Set damage properties from DTO
        damage.setReason(damageDTO.getReason());
        damage.setQuantity(damageDTO.getQuantity());
        damage.setDamageAmount(damageDTO.getProductPrice()*damageDTO.getQuantity());
        damage.setDate(LocalDate.now());

        // Link the damage with the product
        damage.setProduct(product);

        // Save the damage entity
        damage = damageRepository.save(damage);

        // Decrease the product quantity based on the damage quantity
        product.setStock(product.getStock() - damageDTO.getQuantity());

        // Save the updated product entity
        productRepository.save(product);

        modelMapper.typeMap(Damage.class, DamageDTO.class).addMappings(mapper -> {
            // Map productId from Product -> Damage
            mapper.map(src -> src.getProduct().getId(), DamageDTO::setProductId);

            // Map productName from Product -> Damage
            mapper.map(src -> src.getProduct().getName(), DamageDTO::setProductName);
            mapper.map(src -> src.getProduct().getPrice(), DamageDTO::setProductPrice);
        });
        // Return the DTO representation of the damage
        return modelMapper.map(damage, DamageDTO.class);
    }

    public List<DamageDTO> damageList(){
        List<Damage> damages = damageRepository.findAll();
        return damages.stream()
                .map(damage -> {
                    // Create a DamageDTO instance using ModelMapper for the standard fields
                    DamageDTO damageDTO = modelMapper.map(damage, DamageDTO.class);

                    // Manually map specific product fields
                    if (damage.getProduct() != null) {
                        // Set productId, productName, and productPrice manually
                        damageDTO.setProductId(damage.getProduct().getId());
                        damageDTO.setProductName(damage.getProduct().getName());
                        damageDTO.setProductPrice(damage.getProduct().getPrice());
                    } else {
                        // If no product is associated, set these fields to defaults
                        damageDTO.setProductId(0);  // Default value
                        damageDTO.setProductName("Unknown");  // Default value
                        damageDTO.setProductPrice(0.0);  // Default value
                    }

                    return damageDTO;
                })
                .collect(Collectors.toList());
    }

    public void deleteReport(long id){
        damageRepository.deleteById(id);
    }

}