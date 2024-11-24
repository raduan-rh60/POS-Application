package com.project.PointOfSale.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.PointOfSale.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String username;
    private String password;
    private String email;
    private String address;
    private String phone;

//    Enum for role
    @Enumerated(EnumType.STRING)
    private Role role;

//    self joining for manager_id
    @ManyToOne
    @JoinColumn(name = "manager_id")
    @JsonIgnore
    private User manager;

    @OneToMany(mappedBy = "manager")
    @JsonIgnore
    private List<User> subordinates;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    private Shop shop;



}

