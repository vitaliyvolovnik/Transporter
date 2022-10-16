package com.example.transportation.entity;

import com.example.transportation.enums.OfferState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String information;
    private Double price;
    private ZonedDateTime creatingTime = ZonedDateTime.now();


    @ManyToOne()
    private Transporter transporter;

    @ManyToOne()
    private Delivery delivery;


    @Enumerated(EnumType.STRING)
    private OfferState state;



}
