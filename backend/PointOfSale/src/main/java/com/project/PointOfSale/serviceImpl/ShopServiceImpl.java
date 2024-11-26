package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.model.Shop;
import com.project.PointOfSale.repo.ShopRepo;
import com.project.PointOfSale.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepo shopRepo;

    @Override
    public List<Shop> shopList() {
        return shopRepo.findAll();
    }

    @Override
    public Shop saveShop(Shop shop) {
        return shopRepo.save(shop);
    }
}
