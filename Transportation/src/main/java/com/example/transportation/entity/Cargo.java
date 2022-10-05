package com.example.transportation.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String cargo;
    private Double weight;
    private String unitOfMeasurement;


    @ManyToOne
    private Delivery delivery;

}
