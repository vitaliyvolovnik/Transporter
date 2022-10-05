package com.example.transportation.repository;

import com.example.transportation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select count(c)>0 from User c where c.email = ?1")
    boolean existByEmail(String email);

    Optional<User> findByEmail(String email);

}
