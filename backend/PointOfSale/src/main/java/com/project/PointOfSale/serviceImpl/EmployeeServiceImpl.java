package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.model.Employee;
import com.project.PointOfSale.repo.EmployeeRepo;
import com.project.PointOfSale.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;
    @Override
    public List<Employee> employeeList() {
        return employeeRepo.findAll();
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }
}
