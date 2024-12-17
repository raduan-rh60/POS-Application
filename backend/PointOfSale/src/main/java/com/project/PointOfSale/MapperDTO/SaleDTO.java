package com.project.PointOfSale.MapperDTO;

import com.project.PointOfSale.enums.OrderStatus;
import com.project.PointOfSale.enums.OrderType;
import com.project.PointOfSale.model.Cart;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class SaleDTO {
    private Date saleDate;
    private String customerName;
    private String customerAddress="";
    private String customerPhone;
    private String note;
    private double totalAmount;

    private double totalPurchasePrice;
    
    private String transactionType;

    private OrderType orderType;

    private OrderStatus orderStatus = OrderStatus.COMPLETE;

}
