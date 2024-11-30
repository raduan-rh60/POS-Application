package com.project.PointOfSale.MapperDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.PointOfSale.enums.JobTitle;
import com.project.PointOfSale.model.Employee;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class EmployeeDTO {
    private long id;

    private String name;
    private String number;
    private double salary;
    private JobTitle jobTitle;
    private long managerID;
    private Employee subordinates;


}
