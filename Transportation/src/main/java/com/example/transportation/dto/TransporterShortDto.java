package com.example.transportation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@Data
public class TransporterShortDto {
    private Long id;

    private String companyName;
    private String number;
    private String email;
}
