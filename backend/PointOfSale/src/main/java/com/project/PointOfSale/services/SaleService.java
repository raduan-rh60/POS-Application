package com.project.PointOfSale.services;

import com.project.PointOfSale.MapperDTO.SaleDTO;
import com.project.PointOfSale.enums.OrderStatus;
import com.project.PointOfSale.enums.OrderType;
import com.project.PointOfSale.model.Sale;

import java.util.List;

public interface SaleService {
    public Sale createSale(SaleDTO sale);
    public List<Sale> getAllSales();
    Sale getSaleById(long id);
    List<Sale> getAllSalesByOrderType(String oderType);
}
