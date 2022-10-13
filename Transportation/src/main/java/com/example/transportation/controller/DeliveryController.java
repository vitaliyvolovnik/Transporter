package com.example.transportation.controller;

import com.example.transportation.dto.DeliveryDto;
import com.example.transportation.dto.DeliveryShortDto;
import com.example.transportation.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @GetMapping("/{id}")
    public DeliveryDto get(@PathVariable long id){
        return deliveryService.get(id);
    }

    @GetMapping()
    public List<DeliveryShortDto> get(){return deliveryService.getAll();}

    @GetMapping("/current")
    public List<DeliveryShortDto> getCurrent(){return deliveryService.getCurrentCustomerDeliveries();}

    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @PostMapping
    public DeliveryDto create(@RequestBody DeliveryDto deliveryDto){return deliveryService.create(deliveryDto);}

    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){deliveryService.delete(id);}

    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @PutMapping("/{id}")
    public DeliveryDto update(@PathVariable long id,@RequestBody DeliveryDto deliveryDto){
        return deliveryService.update(id,deliveryDto);
    }

}
