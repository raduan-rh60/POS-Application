package com.project.PointOfSale.controller;

import com.project.PointOfSale.MapperDTO.LoginDto;
import com.project.PointOfSale.model.User;
import com.project.PointOfSale.serviceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/login")
    public LoginDto loginData(@RequestParam String username, @RequestParam String password){
        return userService.loginData(username,password);
    }
    @GetMapping
    public List<User> allUser(){
        return userService.userList();
    }

    @PostMapping
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }
}
