package com.example.transportation.controller;

import com.example.transportation.dto.OfferDto;
import com.example.transportation.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/offer")
public class OfferController {
    private final OfferService offerService;

    @GetMapping("/{id}")
    public OfferDto get(@PathVariable long id){ return offerService.get(id);}
    @GetMapping("delivery/{id}")
    public List<OfferDto> getDeliveryOrders(@PathVariable long id){ return offerService.getByDeliveryId(id);}
    @GetMapping()
    public List<OfferDto> get(){return offerService.getAll();}
    @GetMapping("/currentOffer")
    public List<OfferDto> getCurrentOffer(){return offerService.getCurrentTransporterOffers();}

    @PreAuthorize("hasAnyRole('ADMIN','TRANSPORTER')")
    @PostMapping
    public OfferDto create(@RequestBody OfferDto offerDto){return offerService.create(offerDto);}
    @PreAuthorize("hasAnyRole('ADMIN','TRANSPORTER')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){offerService.delete(id);}
    @PreAuthorize("hasAnyRole('ADMIN','TRANSPORTER')")
    @PutMapping("/{id}")
    public OfferDto update(@PathVariable long id,@RequestBody OfferDto offerDto){return offerService.update(id,offerDto);}
}
