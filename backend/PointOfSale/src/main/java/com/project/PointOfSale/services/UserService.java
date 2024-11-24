package com.project.PointOfSale.services;

import com.project.PointOfSale.model.Shop;
import com.project.PointOfSale.model.User;
import com.project.PointOfSale.repo.ShopRepo;
import com.project.PointOfSale.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ShopRepo shopRepo;


    public List<User> allUser(){
        return this.userRepo.findAll();
    }

    public User saveUser(User user){
        return userRepo.save(user);
    }
    public List<Shop> allShop(){
        return this.shopRepo.findAll();
    }

    public Shop saveShop(Shop shop){
        return shopRepo.save(shop);
    }

}
