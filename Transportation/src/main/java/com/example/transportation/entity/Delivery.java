package com.example.transportation.entity;


import com.example.transportation.enums.DeliveryState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "delivery",cascade = CascadeType.ALL)
    private List<Cargo> cargoes;

    @Embedded
    @AttributeOverrides(value = {
            @AttributeOverride(name = "city", column = @Column(name = "destination_address_city")),
            @AttributeOverride(name = "street", column = @Column(name = "destination_address_street")),
            @AttributeOverride(name = "country", column = @Column(name = "destination_address_country"))
    })
    private Address destinationAddress;
    @Embedded
    @AttributeOverrides(value = {
            @AttributeOverride(name = "city", column = @Column(name = "departure_address_city")),
            @AttributeOverride(name = "street", column = @Column(name = "departure_address_street")),
            @AttributeOverride(name = "country", column = @Column(name = "departure_address_country"))
    })
    private Address departureAddress;

    private String description;

    @Enumerated(EnumType.STRING)
    private DeliveryState state;

    private ZonedDateTime creatingTime = ZonedDateTime.now();
    private ZonedDateTime departureDate;
    private ZonedDateTime arrivalDate ;

    @ManyToOne
    private Customer customer;


    @OneToMany(mappedBy = "delivery")
    private List<Offer> offers;


}
