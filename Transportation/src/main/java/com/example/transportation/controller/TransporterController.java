package com.example.transportation.controller;

import com.example.transportation.dto.TransporterDto;
import com.example.transportation.dto.TransporterShortDto;
import com.example.transportation.service.TransporterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transporter")
public class TransporterController {


    private final TransporterService transporterService;


    @GetMapping("/{id}")
    public TransporterDto get(@PathVariable long id){ return transporterService.get(id);}

    @GetMapping()
    public Page<TransporterShortDto> get(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        return transporterService.getAll(pageable);
    }

    @PostMapping
    public TransporterDto create(@RequestBody TransporterDto transporterDto){return transporterService.create(transporterDto);}
    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){transporterService.delete(id);}

    @PutMapping("/{id}")
    public TransporterDto update(@PathVariable long id,@RequestBody TransporterDto transporterDto){
        return transporterService.update(id,transporterDto);
    }
}
