package com.project.PointOfSale.controller;

import com.project.PointOfSale.model.Shop;
import com.project.PointOfSale.model.User;
import com.project.PointOfSale.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("user")
    public List<User> listUser(){
        return userService.allUser();
    }

    @GetMapping("shop")
    public List<Shop> listShop(){
        return userService.allShop();
    }

    @PostMapping("user-add")
    public User addUser(@RequestBody User user){
    return userService.saveUser(user);
    }

    @PostMapping("create-shop")
    public Shop addShop(@RequestBody Shop shop){
    return userService.saveShop(shop);
    }
}
