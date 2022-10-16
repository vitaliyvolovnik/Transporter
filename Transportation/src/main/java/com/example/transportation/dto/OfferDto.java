package com.example.transportation.dto;


import com.example.transportation.enums.OfferState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

@AllArgsConstructor
@Getter
@Setter
@Data
public class OfferDto {
    private Long id;

    private String information;
    private Double price;
    private ZonedDateTime creatingTime;

    private OfferState state;

    private TransporterShortDto transporter;
    private DeliveryShortDto delivery;
}
