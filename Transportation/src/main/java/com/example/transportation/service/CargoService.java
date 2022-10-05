package com.example.transportation.service;


import com.example.transportation.dto.CargoDto;
import com.example.transportation.dto.CargoShortDto;
import com.example.transportation.entity.Cargo;
import com.example.transportation.exception.NotFoundException;
import com.example.transportation.mapper.Mapper;
import com.example.transportation.repository.CargoRepository;
import com.example.transportation.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CargoService {
    private final CargoRepository cargoRepository;
    private final DeliveryRepository deliveryRepository;
    private final Mapper mapper;


    public CargoShortDto get(long id) {
        return mapper.toCargoShortGto(retrieve(id));
    }

    public List<CargoShortDto> getAll() {
        return cargoRepository.findAll().stream().map(mapper::toCargoShortGto).toList();
    }

    public CargoShortDto create(CargoDto dto) {
        Cargo cargo = mapper.toCargo(dto);
        cargo.setDelivery(deliveryRepository.findById(dto.getDelivery().getId()).orElseThrow(() -> new NotFoundException("delivery", dto.getDelivery().getId())));

        return mapper.toCargoShortGto(cargoRepository.save(cargo));
    }

    public void delete(long id) {
        cargoRepository.delete(retrieve(id));
    }

    public CargoShortDto update(long id, CargoShortDto dto) {
        Cargo cargo = cargoRepository.findById(id).orElseThrow(() -> new NotFoundException("Cargo", dto.getId()));

        cargo.setCargo(dto.getCargo());
        cargo.setWeight(dto.getWeight());
        cargo.setUnitOfMeasurement(dto.getUnitOfMeasurement());

        return mapper.toCargoShortGto(cargoRepository.save(cargo));
    }


    public Cargo retrieve(long id) {
        return cargoRepository.findById(id).orElseThrow(() -> new NotFoundException("Cargo", id));
    }
}
