package com.example.transportation.dto;

import com.example.transportation.entity.Address;
import com.example.transportation.entity.Cargo;
import com.example.transportation.enums.DeliveryState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Data
public class DeliveryDto {
    private Long id;

    private List<CargoShortDto> cargoes;


    private Address destinationAddress;
    private Address departureAddress;

    private String description;
    private DeliveryState state;

    private ZonedDateTime creatingTime;
    private ZonedDateTime departureDate;
    private ZonedDateTime arrivalDate ;

    private CustomerShortDto customer;
    private List<OfferShortDto> offer;
}
