package com.example.transportation.dto;

import com.example.transportation.entity.Delivery;
import lombok.*;


@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CargoDto {

    private long id;

    private String cargo;
    private Double weight;
    private String unitOfMeasurement;

    private DeliveryShortDto delivery;

}
