package com.example.transportation.controller;

import com.example.transportation.dto.CargoDto;
import com.example.transportation.dto.CargoShortDto;
import com.example.transportation.dto.CustomerShortDto;
import com.example.transportation.service.CargoService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/cargo")
public class CargoController {

    private final CargoService cargoService;


    @GetMapping("/{id}")
    public CargoShortDto get(@PathVariable long id){
        return cargoService.get(id);
    }

    @GetMapping()
    public List<CargoShortDto> getAll(){
        return cargoService.getAll();
    }

    @PostMapping()
    public CargoShortDto create(@RequestBody CargoDto dto){
        return cargoService.create(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){
        cargoService.delete(id);
    }

    @PutMapping("/{id}")
    public CargoShortDto update(@PathVariable long id, @RequestBody CargoShortDto dto){
        return cargoService.update(id , dto);
    }
}
