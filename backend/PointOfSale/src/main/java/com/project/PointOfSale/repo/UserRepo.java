package com.project.PointOfSale.repo;

import com.project.PointOfSale.MapperDTO.LoginDto;
import com.project.PointOfSale.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    LoginDto findByUsernameAndPassword(String username,String password);
}
