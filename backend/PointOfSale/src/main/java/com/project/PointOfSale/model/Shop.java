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
@Table(name = "shop")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String location;


    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false) // Ensures a shop must have a manager
    @JsonIgnoreProperties("shops") // Prevents infinite recursion
    private User manager;



}