package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.LoginDTO;
import com.project.PointOfSale.model.User;
import com.project.PointOfSale.repo.UserRepo;
import com.project.PointOfSale.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.Destination;
import java.util.List;
import java.util.stream.Collectors;

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


      modelMapper.typeMap(User.class, LoginDTO.class).addMappings(mapper -> {
//  mapper.map(src -> src.getShop().getId(),LoginDTO::setShopId);
  mapper.map(src -> src.getShop().getName(),LoginDTO::setShopName);
});
        return modelMapper.map(loginUser,LoginDTO.class);
    }

    @Override
    public User getUserByIdall(long id) {
        return userRepo.findById(id).get();
    }

    @Override
    public List<LoginDTO> getUserDto() {
        List<User> loginUser = userRepo.findAll();


        modelMapper.typeMap(User.class, LoginDTO.class).addMappings(mapper -> {
//  mapper.map(src -> src.getShop().getId(),LoginDTO::setShopId);
            mapper.map(src -> src.getShop().getName(),LoginDTO::setShopName);
        });
        return loginUser.stream()
                .map(user -> modelMapper.map(user, LoginDTO.class))
                .collect(Collectors.toList());
    }

}



