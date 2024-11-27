package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.LoginDTO;
import com.project.PointOfSale.model.User;
import com.project.PointOfSale.repo.UserRepo;
import com.project.PointOfSale.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<User> userList() {
        return userRepo.findAll();
    }

    @Override
    public User loginData(String userName,String password) {

        return userRepo.findByUsernameAndPassword(userName,password);
    }

    @Override
    public User saveUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public LoginDTO getUserById(long id) {
        User loginUser = userRepo.findById(id).get();

        return modelMapper.map(loginUser,LoginDTO.class);
    }

    @Override
    public User getUserByIdall(long id) {
        return userRepo.findById(id).get();
    }
}
