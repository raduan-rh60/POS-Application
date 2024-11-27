package com.project.PointOfSale.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.PointOfSale.enums.JobTitle;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Table(name="employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String number;
    private double salary;

    @Enumerated(EnumType.STRING)
    private JobTitle jobTitle;

    //    self join for manager
    @ManyToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "manager_id",nullable = true)
    @JsonIgnoreProperties("subordinates")
    private Employee manager;

    @OneToMany(mappedBy = "manager")
    @JsonIgnoreProperties("manager")
    private List<Employee> subordinates;


    @ManyToOne
    @JoinColumn(name = "shop_id")  // Foreign key for the shop
    private Shop shopEmp;
}
