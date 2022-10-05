package com.example.transportation.service;

import com.example.transportation.dto.CustomerDto;
import com.example.transportation.dto.CustomerShortDto;
import com.example.transportation.entity.Customer;
import com.example.transportation.entity.User;
import com.example.transportation.exception.NotFoundException;
import com.example.transportation.mapper.Mapper;
import com.example.transportation.repository.CustomerRepository;
import com.example.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    private final Mapper mapper;
    private final PasswordEncoder passwordEncoder;


    public CustomerDto get(long id){
        return mapper.toCustomerDto(retrieve(id));
    }
    public List<CustomerShortDto> getAll(){
        return customerRepository.findAll().stream().map(mapper::toCustomerShortDto).toList();
    }
    public CustomerDto create(CustomerDto customerDto){
        Customer customer = mapper.toCustomer(customerDto);
        customer.getUser().setPassword(passwordEncoder.encode("password"));

        return mapper.toCustomerDto(customerRepository.save(customer));
    }
    public CustomerDto update(long id,CustomerDto customerDbo){
        var customer = retrieve(id);
        mapper.margeCustomer(customerDbo,customer);
        return mapper.toCustomerDto(customerRepository.save(customer));
    }
    public void delete(long id){
        customerRepository.delete(retrieve(id));
    }

    private Customer retrieve(long id){
        return customerRepository.findById(id).orElseThrow(() -> new NotFoundException("Customer",id));
    }
}