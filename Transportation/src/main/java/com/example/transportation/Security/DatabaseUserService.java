package com.example.transportation.Security;

import com.example.transportation.entity.Customer;
import com.example.transportation.entity.Transporter;
import com.example.transportation.repository.CustomerRepository;
import com.example.transportation.repository.TransporterRepository;
import com.example.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@RequiredArgsConstructor
@Component
public class DatabaseUserService implements UserDetailsService {

    private  final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return userRepository.findByEmail(username).map(CustomUserDetails::new).orElseThrow(()->new UsernameNotFoundException(username));
    }


}
