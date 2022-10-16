package com.example.transportation.dto;

import com.example.transportation.enums.OfferState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@Getter
@Setter
public class OfferShortDto {
    private Long id;

    private String information;
    private Double price;
    private ZonedDateTime creatingTime;

    private OfferState state;

    private TransporterShortDto transporter;
}
