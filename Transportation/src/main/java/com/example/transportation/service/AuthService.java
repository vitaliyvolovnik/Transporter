package com.example.transportation.service;


import com.example.transportation.dto.RegisterDto;
import com.example.transportation.dto.UserDto;
import com.example.transportation.entity.Customer;
import com.example.transportation.entity.Transporter;
import com.example.transportation.entity.User;
import com.example.transportation.enums.Role;
import com.example.transportation.mapper.Mapper;
import com.example.transportation.repository.CustomerRepository;
import com.example.transportation.repository.TransporterRepository;
import com.example.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final TransporterRepository transporterRepository;

    private final Mapper mapper;
    private final PasswordEncoder passwordEncoder;

    public boolean isExist(String email) {
        return userRepository.existByEmail(email);
    }

    public UserDto signupCustomer(RegisterDto registerDto) {
        /*if(registerDto.getRole()== Role.TRANSPORTER){
            Transporter transporter = new Transporter();
            transporter.setCompanyName(registerDto.getCompanyName());
            transporter.setNumber(registerDto.getNumber());


            transporter.setUser(mapper.toUser(registerDto));
            transporter.getUser().setPassword(passwordEncoder.encode(registerDto.getPassword()));

            transporterRepository.save(transporter);
            return mapper.toUserDto(userRepository.save(transporter.getUser()));
        }
        else{
            Customer customer = new Customer();
            customer.setLastname(registerDto.getLastname());
            customer.setFirstname(registerDto.getFirstname());
            customer.setNumber(registerDto.getNumber());

            customer.setUser(mapper.toUser(registerDto));
            customer.getUser().setPassword(passwordEncoder.encode(registerDto.getPassword()));

            customerRepository.save(customer);
            return mapper.toUserDto(userRepository.save(customer.getUser()));
        }*/
        if(registerDto.getUser().getRole()== Role.TRANSPORTER){
            Transporter transporter = mapper.toTransporter(registerDto);
            transporter.getUser().setPassword(passwordEncoder.encode(registerDto.getPassword()));

            return mapper.toUserDto(transporterRepository.save(transporter).getUser());
        }
        else{
            Customer customer = mapper.toCustomer(registerDto);
            customer.getUser().setPassword(passwordEncoder.encode(registerDto.getPassword()));

            return mapper.toUserDto(customerRepository.save(customer).getUser());
        }
    }
}
