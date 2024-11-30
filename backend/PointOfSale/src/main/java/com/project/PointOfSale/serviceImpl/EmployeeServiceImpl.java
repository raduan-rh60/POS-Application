package com.project.PointOfSale.serviceImpl;

import com.project.PointOfSale.MapperDTO.EmployeeDTO;
import com.project.PointOfSale.model.Employee;
import com.project.PointOfSale.repo.EmployeeRepo;
import com.project.PointOfSale.services.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    ModelMapper modelMapper;


    @Override
    public List<Employee> employeeList() {
        return employeeRepo.findAll();
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    @Override
    public List<EmployeeDTO> employeeListDTO() {
        List<Employee> employeeData = employeeRepo.findAll();

        modelMapper.typeMap(Employee.class,EmployeeDTO.class).addMappings(mapper->{
            mapper.map(src->src.getManager().getId(),EmployeeDTO::setManagerID);
//            mapper.map(src->src.getSubordinates().toArray().length,EmployeeDTO::setSubordinates);
        });
        return employeeData.stream().map(
                employee->modelMapper.map(employee,EmployeeDTO.class)).collect(Collectors.toList());
    }
}
