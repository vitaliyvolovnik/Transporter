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
public class TransporterDto {
    private Long id;

    private String companyName;
    private String phoneNumber;
    private UserDto user;

    private List<OfferDto> offers;
}
