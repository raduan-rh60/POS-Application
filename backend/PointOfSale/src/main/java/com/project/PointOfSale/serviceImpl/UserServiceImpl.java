package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.LoginDto;
import com.project.PointOfSale.model.User;
import com.project.PointOfSale.repo.UserRepo;
import com.project.PointOfSale.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;


    @Override
    public List<User> userList() {
        return userRepo.findAll();
    }

    @Override
    public LoginDto loginData(String userName,String password) {

        return userRepo.findByUsernameAndPassword(userName,password);
    }

    @Override
    public User saveUser(User user) {
        return userRepo.save(user);
    }
}
