package com.ecommerce.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private Long oderItemId;
    private ProductDTO product;
    private Integer quantity;
    private double discount;
    private double orderedDiscountPrice;

}
