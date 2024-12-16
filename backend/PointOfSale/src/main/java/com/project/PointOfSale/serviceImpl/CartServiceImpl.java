package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.enums.CartStatus;
import com.project.PointOfSale.model.Cart;
import com.project.PointOfSale.repo.CartRepo;
import com.project.PointOfSale.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartRepo cartRepo;

    @Override
    public List<Cart> listOfCartProduct() {
        return cartRepo.findAllByCartStatus(CartStatus.PENDING);
    }

    @Override
    public Cart saveCart(Cart cart) {
        return cartRepo.save(cart);
    }

    @Override
    public Cart updateCart(Cart cart) {
        Cart oldCart = cartRepo.findById(cart.getId()).get();
        oldCart.setQuantity(cart.getQuantity());
        oldCart.setSubtotal(cart.getSubtotal());
        return cartRepo.save(oldCart);
    }

    @Override
    public void clearCart() {
        cartRepo.deleteAll();

    }

    @Override
    public void deleteCart(long id) {
        cartRepo.deleteById(id);

    }

    @Override
    public int updateCartStatus(CartStatus cartStatus) {
        return this.cartRepo.updateCartStatusForPendingOrders(cartStatus);
    }
}
