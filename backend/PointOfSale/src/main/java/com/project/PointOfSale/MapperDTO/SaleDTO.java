package com.project.PointOfSale.MapperDTO;

import com.project.PointOfSale.enums.OrderStatus;
import com.project.PointOfSale.enums.OrderType;
import lombok.Data;

@Data
public class SaleDTO {
    private String customerName;
    private String customerAddress="";
    private String customerPhone;
    private String note;
    private double totalAmount;
    private double discount;

    private double totalPurchasePrice;
    
    private String transactionType;

    private OrderType orderType;

    private OrderStatus orderStatus = OrderStatus.COMPLETE;

}
