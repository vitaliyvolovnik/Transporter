package com.example.transportation.dto;

import com.example.transportation.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@AllArgsConstructor
@Getter
@Setter
@Data
public class CustomerShortDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String phoneNumber;
}
