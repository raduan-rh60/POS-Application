package com.project.PointOfSale.controller;

import com.project.PointOfSale.MapperDTO.SaleDTO;
import com.project.PointOfSale.model.Sale;
import com.project.PointOfSale.serviceImpl.SaleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/sale")
@CrossOrigin
public class SaleController {

    @Autowired
    private SaleServiceImpl saleService;

    @GetMapping
    public List<Sale> allOrders(){
        return saleService.getAllSales();
    }

    @PostMapping("save")
    public Sale saveSale(@RequestBody SaleDTO saleDTO){
        return saleService.createSale(saleDTO);
    }

    @GetMapping("{id}")
    public Sale getSaleById(@PathVariable long id){
        return saleService.getSaleById(id);
    }

    @GetMapping("order-type")
    public List<Sale> getOrderTypeSale(@RequestParam String orderType){
        return saleService.getAllSalesByOrderType(orderType);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSale(@PathVariable long id){
        saleService.delete(id);
        return ResponseEntity.ok("delete Successful");
    }
}
