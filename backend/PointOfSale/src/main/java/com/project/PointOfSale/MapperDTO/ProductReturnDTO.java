package com.project.PointOfSale.MapperDTO;

import com.project.PointOfSale.model.Cart;
import lombok.Data;

import java.util.List;

@Data
public class ProductReturnDTO {
    private long orderID;
    private double returnAmount;
    private double discount;
    List<Cart> returnItems;
}
