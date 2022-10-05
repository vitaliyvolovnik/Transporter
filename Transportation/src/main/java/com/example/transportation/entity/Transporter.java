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
public class Transporter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String companyName;
    private String phoneNumber;

    @OneToOne(cascade=CascadeType.PERSIST)
    private User user;

    @OneToMany(mappedBy = "transporter",fetch = FetchType.LAZY)
    private List<Offer> offers;

}
