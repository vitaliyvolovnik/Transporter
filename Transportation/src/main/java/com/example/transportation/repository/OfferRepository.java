package com.example.transportation.repository;

import com.example.transportation.dto.OfferDto;
import com.example.transportation.entity.Customer;
import com.example.transportation.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer,Long> {

    @Query("""
        SELECT u FROM Offer u
        WHERE (u.transporter.user.email = :email)
    """)
    List<Offer> findByUserEmail(String email);

    @Query("""
        SELECT u FROM Offer u
        WHERE (u.delivery.id = :id)
    """)
    List<Offer> findByDeliveryId(Long id);
}
