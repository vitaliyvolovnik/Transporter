package com.example.transportation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class CargoShortDto {

    private long id;

    private String cargo;
    private Double weight;
    private String unitOfMeasurement;
}
