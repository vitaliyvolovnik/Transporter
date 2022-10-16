package com.example.transportation.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstname;
    private String lastname;
    private String phoneNumber;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private User user;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    private List<Delivery> deliveries;


}
