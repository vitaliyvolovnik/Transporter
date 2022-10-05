package com.example.transportation.controller;

import com.example.transportation.dto.CustomerDto;
import com.example.transportation.dto.CustomerShortDto;
import com.example.transportation.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {
    private final CustomerService customerService;

    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @GetMapping("/{id}")
    public CustomerDto get(@PathVariable long id){ return customerService.get(id);}

    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @GetMapping()
    public List<CustomerShortDto> get(){return customerService.getAll();}

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public CustomerDto create(@RequestBody CustomerDto dto){return customerService.create(dto);}

    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){customerService.delete(id);}

    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @PutMapping("/{id}")
    public CustomerDto update(@PathVariable long id,@RequestBody CustomerDto dto){
        return customerService.update(id,dto);
    }
}