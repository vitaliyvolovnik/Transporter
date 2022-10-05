package com.example.transportation.service;


import com.example.transportation.dto.OfferDto;
import com.example.transportation.entity.Delivery;
import com.example.transportation.entity.Offer;
import com.example.transportation.entity.Transporter;
import com.example.transportation.enums.DeliveryState;
import com.example.transportation.exception.NotFoundException;
import com.example.transportation.mapper.Mapper;
import com.example.transportation.repository.DeliveryRepository;
import com.example.transportation.repository.OfferRepository;
import com.example.transportation.repository.TransporterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final DeliveryRepository deliveryRepository;
    private final OfferRepository offerRepository;
    private final TransporterRepository transporterRepository;
    private final Mapper mapper;

    public OfferDto get(long id){
        return  mapper.toOfferDto(retrieve(id));
    }
    public List<OfferDto> getAll(){
        return offerRepository.findAll().stream().map(mapper::toOfferDto).toList();
    }
    public OfferDto create(OfferDto offerDto){
        Offer offer = mapper.toOffer(offerDto);

        Delivery delivery = deliveryRepository.findById(offerDto.getDelivery().getId()).orElseThrow(()->new NotFoundException("Delivery",offer.getDelivery().getId()));
        Transporter transporter =transporterRepository.findById(offerDto.getTransporter().getId()).orElseThrow(()->new NotFoundException("Transporter",offer.getTransporter().getId()));

        offer.setDelivery(delivery);
        offer.setTransporter(transporter);

        delivery.setState(DeliveryState.HAS_OFFER);
        deliveryRepository.save(delivery);
        return mapper.toOfferDto(offerRepository.save(offer));
    }
    public OfferDto update(long id,OfferDto offerDto){
        Offer offer = retrieve(id);
        mapper.margeOffer(offerDto,offer);
        return mapper.toOfferDto(offerRepository.save(offer));
    }
    public void delete(long id)
    {
        offerRepository.delete(retrieve(id));
    }
    public Offer retrieve(long id){
        return offerRepository.findById(id).orElseThrow(() -> new NotFoundException("Offer",id));
    }



}
