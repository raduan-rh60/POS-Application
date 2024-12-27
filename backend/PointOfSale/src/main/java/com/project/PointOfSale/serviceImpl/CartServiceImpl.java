package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.enums.CartStatus;
import com.project.PointOfSale.model.Cart;
import com.project.PointOfSale.model.Product;
import com.project.PointOfSale.repo.CartRepo;
import com.project.PointOfSale.repo.ProductRepo;
import com.project.PointOfSale.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartRepo cartRepo;
    @Autowired
    ProductRepo productRepo;

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
        if(cart.getReturnQuantity()>0){
            oldCart.setReturnQuantity(cart.getReturnQuantity());
        }
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

    public Cart addProductToCart(Long productId) {
        // Fetch product information from Product table
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        // Check if the product is already in the cart
        Cart cartItem = cartRepo.findByProductIdAndCartStatus(productId, CartStatus.PENDING);

        if (cartItem != null) {
            // If the product is already in the cart, update the quantity
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            cartItem.setSubtotal(cartItem.getQuantity() * cartItem.getPrice());
            cartItem.setSubTotalPurchasePrice(cartItem.getQuantity() * cartItem.getPurchasePrice());
        } else {
            // If the product is not in the cart, create a new cart item
            cartItem = new Cart();
            cartItem.setName(product.getName());
            cartItem.setQuantity(1);
            cartItem.setPrice(product.getPrice());
            cartItem.setPurchasePrice(product.getPurchasePrice());
            cartItem.setSubtotal(cartItem.getQuantity() * cartItem.getPrice());
            cartItem.setSubTotalPurchasePrice(cartItem.getQuantity() * cartItem.getPurchasePrice());
            cartItem.setCartStatus(CartStatus.PENDING);
            cartItem.setProductId(productId);
        }

        // Save or update the cart item
        return cartRepo.save(cartItem);
    }

    public Cart findCartByID(long id){
        return cartRepo.findById(id).get();
    }
}
