package com.example.transportation.service;

import com.example.transportation.Security.SecurityService;
import com.example.transportation.dto.DeliveryDto;
import com.example.transportation.dto.DeliveryShortDto;
import com.example.transportation.entity.Cargo;
import com.example.transportation.entity.Customer;
import com.example.transportation.entity.Delivery;
import com.example.transportation.enums.DeliveryState;
import com.example.transportation.enums.OfferState;
import com.example.transportation.exception.NotFoundException;
import com.example.transportation.mapper.Mapper;
import com.example.transportation.repository.CustomerRepository;
import com.example.transportation.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DeliveryService {
    private final DeliveryRepository deliveryRepository;
    private final CustomerRepository customerRepository;
    private final Mapper mapper;
    private final SecurityService securityService;
    private final OfferService offerService;

    public DeliveryDto get(long id) {
        return mapper.toDeliveryDto(retrieve(id));
    }

    public List<DeliveryShortDto> getAll() {

        return deliveryRepository.findAll().stream().map(mapper::toDeliveryShortDto).toList();
    }
    public List<DeliveryShortDto> getCurrentCustomerDeliveries(){
        return this.customerRepository.findByUserEmail(this.securityService.getCurrentUserEmail()).getDeliveries().stream().map(mapper::toDeliveryShortDto).toList();
    }

    public DeliveryDto create(DeliveryDto deliveryDto) {
        Delivery delivery = mapper.toDelivery(deliveryDto);

        Customer customer = securityService.getUser().getCustomer();

        for (Cargo cargo : delivery.getCargoes()) {
            cargo.setDelivery(delivery);
        }
        delivery.setCustomer(customer);

        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }

    public DeliveryDto update(long id, DeliveryDto deliveryDto) {
        Delivery delivery = retrieve(id);
        mapper.margeDelivery(deliveryDto, delivery);
        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }

    public void delete(long id) {
        deliveryRepository.delete(retrieve(id));
    }

    private Delivery retrieve(long id) {
        return deliveryRepository.findById(id).orElseThrow(() -> new NotFoundException("Delivery", id));
    }

    public DeliveryDto acceptOffer(long id, long offerId) {
        Delivery delivery = retrieve(id);

        delivery.setState(DeliveryState.OFFER_ACCEPTED);
        delivery.getOffers().stream().forEach((offer)->{
            offer.setState((offer.getId()==offerId)? OfferState.ACCEPTED:OfferState.REJECTED);
            offerService.update(offer.getId(),mapper.toOfferDto(offer));
        });
        delivery.setAcceptedOffer(delivery.getOffers().stream().filter(o->o.getId()==offerId).findFirst().orElse(null));

        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }
    public DeliveryDto cancelDelivery(long id){
        Delivery delivery = retrieve(id);


        delivery.setState(DeliveryState.CANCELED);
        delivery.getOffers().stream().forEach((offer)->{
            offer.setState(OfferState.REJECTED);
            offerService.update(offer.getId(),mapper.toOfferDto(offer));
        });
        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }
}
