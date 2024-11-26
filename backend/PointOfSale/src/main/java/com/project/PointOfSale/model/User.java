package com.project.PointOfSale.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.PointOfSale.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.engine.internal.Cascade;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String username;
    private String password;
    private String email;
    private String phone;

//    Enum for role
    @Enumerated(EnumType.STRING)
    private Role role;




    @ManyToOne
    @JoinColumn(name = "shop_id",nullable = true)
    @JsonIgnoreProperties(value = "users")
    private Shop shop;



}

