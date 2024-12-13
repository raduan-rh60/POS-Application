package com.project.PointOfSale.controller;

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

}
