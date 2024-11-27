package com.project.PointOfSale.controller;

import com.project.PointOfSale.MapperDTO.LoginDTO;
import com.project.PointOfSale.model.User;
import com.project.PointOfSale.serviceImpl.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/login")
    public User loginData(@RequestParam String username, @RequestParam String password){
        return userService.loginData(username,password);
    }
    @GetMapping
    public List<User> allUser(){
        return userService.userList();
    }

    @GetMapping("loginUser/{id}")
    public LoginDTO loginDataByID(@PathVariable long id){

        return userService.getUserById(id);
    }
    @GetMapping("new/{id}")
    public User loginDataByIDAll(@PathVariable long id){

        return userService.getUserByIdall(id);
    }

    @PostMapping
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }


}
