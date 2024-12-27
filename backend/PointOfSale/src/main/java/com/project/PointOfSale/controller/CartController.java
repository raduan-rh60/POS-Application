package com.project.PointOfSale.controller;

import com.project.PointOfSale.enums.CartStatus;
import com.project.PointOfSale.model.Cart;
import com.project.PointOfSale.serviceImpl.CartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cart")
@CrossOrigin(value = "*")
public class CartController {

    @Autowired
    CartServiceImpl cartService;

    @GetMapping
    public List<Cart> getAllCart(){
        return cartService.listOfCartProduct();
    }

    @PostMapping
    public Cart saveCart(@RequestBody Cart cart){
        return cartService.saveCart(cart);
    }

    @PutMapping("edit")
    public Cart updateCart(@RequestBody Cart cart){
        return cartService.updateCart(cart);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteById(@PathVariable long id){
        cartService.deleteCart(id);
        return new ResponseEntity<String>("item removed ", HttpStatus.OK);
    }
    @DeleteMapping("clear")
    public ResponseEntity<String> clearCart(){
        cartService.clearCart();
        return new ResponseEntity<String>("Cart Cleared", HttpStatus.OK);
    }

    @CrossOrigin
    @PatchMapping("status")
    public ResponseEntity<String> updateOrderTypeForPendingOrders(@RequestParam String cartStatus) {
        // Update the orderType for all orders with orderType 'PENDING'

        CartStatus status = CartStatus.valueOf(cartStatus);
       int updatedCount = cartService.updateCartStatus(status);

        if (updatedCount > 0) {
            return ResponseEntity.ok("Successfully updated " + updatedCount + " orders.");
        } else {
            return ResponseEntity.status(400).body("No orders were updated. Please check if there are orders with 'PENDING' status.");
        }
    }
    @PostMapping("new")
    @CrossOrigin
    public Cart addToCart(@RequestParam long productId){
        return cartService.addProductToCart(productId);
    }
}
