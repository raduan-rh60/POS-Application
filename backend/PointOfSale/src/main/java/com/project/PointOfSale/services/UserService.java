package com.project.PointOfSale.services;

import com.project.PointOfSale.MapperDTO.LoginDto;
import com.project.PointOfSale.model.User;

import java.util.List;

public interface UserService {
   List<User> userList();
   LoginDto loginData(String userName,String Password);
   User saveUser(User user);
}
