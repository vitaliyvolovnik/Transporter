package com.example.transportation.dto;

import com.example.transportation.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterDto {

    private String companyName;

    private String firstname;
    private String lastname;
    private String number;

    private UserDto user;
    private String password;



}
