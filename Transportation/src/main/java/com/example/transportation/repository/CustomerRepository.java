package com.example.transportation.repository;

import com.example.transportation.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    @Query("""
        SELECT u FROM Customer u
        WHERE (u.user.email = :email)
    """)
    Customer findByUserEmail(String email);

}
