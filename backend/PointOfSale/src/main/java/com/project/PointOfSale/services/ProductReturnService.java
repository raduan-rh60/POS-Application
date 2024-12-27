package com.project.PointOfSale.services;

import com.project.PointOfSale.MapperDTO.ProductReturnDTO;
import com.project.PointOfSale.model.ProductReturn;

import java.util.List;

public interface ProductReturnService {
    List<ProductReturn> getAllProductReturn();
    ProductReturn saveProductReturn(ProductReturnDTO productReturnDTO);
}
