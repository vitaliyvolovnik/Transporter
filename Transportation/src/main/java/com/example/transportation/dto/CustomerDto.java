package com.example.transportation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Data
public class CustomerDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String number;
    private UserDto user;

    private List<DeliveryShortDto> deliveries;
}
