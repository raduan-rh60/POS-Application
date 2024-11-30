package com.project.PointOfSale.services;

import com.project.PointOfSale.MapperDTO.EmployeeDTO;
import com.project.PointOfSale.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> employeeList();
    Employee saveEmployee(Employee employee);
    List<EmployeeDTO> employeeListDTO();
}
