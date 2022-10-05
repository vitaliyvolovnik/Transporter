package com.example.transportation.entity;

import lombok.*;

import javax.persistence.Embeddable;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class Address {
    private String street;
    private String city;
    private String country;
}



