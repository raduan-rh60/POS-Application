package com.project.PointOfSale.services;

import com.project.PointOfSale.model.Shop;

import java.util.List;

public interface ShopService {
    List<Shop> shopList();
    Shop saveShop(Shop shop);
}
