package com.project.PointOfSale.services;

import com.project.PointOfSale.model.Cart;

import java.util.List;

public interface CartService {
    List<Cart> listOfCartProduct();
    Cart saveCart(Cart cart);
    Cart updateCart(Cart cart);
    void clearCart();
    void deleteCart(long id);
}
