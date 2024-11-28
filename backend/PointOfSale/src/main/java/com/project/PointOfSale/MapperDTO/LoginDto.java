package com.project.PointOfSale.MapperDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class LoginDTO {
   private Long id;
   private String role;
   private String username;
   private String name;
   private String shopName;
}
