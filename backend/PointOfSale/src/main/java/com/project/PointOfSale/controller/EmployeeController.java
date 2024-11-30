package com.project.PointOfSale.controller;

import com.project.PointOfSale.MapperDTO.EmployeeDTO;
import com.project.PointOfSale.model.Employee;
import com.project.PointOfSale.serviceImpl.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServiceImpl employeeService;

    @GetMapping
    public List<Employee> allEmployee(){
        return employeeService.employeeList();
    }
    @PostMapping
    public Employee saveEmpl(@RequestBody Employee employee){
        return employeeService.saveEmployee(employee);
    }

    @GetMapping("emplDto")
    public List<EmployeeDTO> dtoList(){
        return employeeService.employeeListDTO();
    }
}
