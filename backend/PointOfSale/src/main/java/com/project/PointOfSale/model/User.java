package com.project.PointOfSale.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.PointOfSale.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Enumerated
    private Role role;



    @ManyToOne
    @JoinColumn(name = "shop_id")
    @JsonIgnoreProperties("users")
    private Shop shop;

    @OneToOne(mappedBy = "manager", cascade = CascadeType.ALL)
    @JsonIgnore
    private Shop shop1;

}

