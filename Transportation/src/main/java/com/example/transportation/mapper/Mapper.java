package com.example.transportation.mapper;


import com.example.transportation.dto.*;
import com.example.transportation.entity.*;
import org.aspectj.apache.bcel.generic.TABLESWITCH;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.net.StandardSocketOptions;

@org.mapstruct.Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface Mapper {

    //Customer
    Customer toCustomer(CustomerDto dto);
    CustomerDto toCustomerDto(Customer entity);
    CustomerShortDto toCustomerShortDto(Customer entity);

    @Mapping(target = "deliveries",ignore = true)
    @Mapping(target = "user", ignore = true)
    void margeCustomer(CustomerDto dto, @MappingTarget Customer entity);

    //Transporter
    Transporter toTransporter(TransporterDto dto);
    TransporterDto toTransporterDto(Transporter entity);
    TransporterShortDto toTransporterShortDto(Transporter entity);

    @Mapping(target = "offers",ignore = true)
    @Mapping(target = "user", ignore = true)
    void margeTransporter(TransporterDto dto,@MappingTarget Transporter transporter);

    //Delivery
    @Mapping(target = "creatingTime",ignore = true)
    @Mapping(target = "state",defaultExpression = "java(com.example.transportation.enums.DeliveryState.PUBLISHED)")
    Delivery toDelivery(DeliveryDto dto);

    DeliveryDto toDeliveryDto(Delivery entity);
    DeliveryShortDto toDeliveryShortDto(Delivery entity);

    @Mapping(target = "customer",ignore = true)
    @Mapping(target = "offers", ignore = true)
    @Mapping(target = "cargoes", ignore = true)
    void margeDelivery(DeliveryDto dto,@MappingTarget Delivery entity);

    //Cargo
    Cargo toCargo(CargoDto cargoDto);
    CargoDto toCargoDto(Cargo entity);
    CargoShortDto toCargoShortGto(Cargo entity);

    //Offer

    @Mapping(target = "creatingTime",ignore = true)
    @Mapping(target = "state",defaultExpression = "java(com.example.transportation.enums.OfferState.PENDING)")
    Offer toOffer(OfferDto dto);

    OfferDto toOfferDto(Offer entity);
    OfferShortDto toOfferShortDto(Offer entity);

    @Mapping(target = "delivery",ignore = true)
    @Mapping(target = "transporter",ignore = true)
    void margeOffer(OfferDto dto,@MappingTarget Offer entity);





    //Registration
    Customer toCustomer(RegisterDto dto);
    Transporter toTransporter(RegisterDto dto);

    UserDto toUserDto(User user);

    @Mapping(target = "role", defaultExpression = "java(com.example.transportation.enums.Role.CUSTOMER)")
    @Mapping(target = "active",ignore = true)
    User toUser(UserDto dto);

}