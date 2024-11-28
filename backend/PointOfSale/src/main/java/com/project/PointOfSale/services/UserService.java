package com.project.PointOfSale.services;

import com.project.PointOfSale.MapperDTO.LoginDTO;
import com.project.PointOfSale.model.User;

import java.util.List;

public interface UserService {
   List<User> userList();
   User loginData(String userName,String Password);
   User saveUser(User user);
   LoginDTO getUserById(long id);
   User getUserByIdall(long id);
   public List<LoginDTO> getUserDto();
}
