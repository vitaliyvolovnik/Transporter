package com.example.transportation.service;

import com.example.transportation.dto.TransporterDto;
import com.example.transportation.dto.TransporterShortDto;
import com.example.transportation.entity.Transporter;
import com.example.transportation.exception.NotFoundException;
import com.example.transportation.mapper.Mapper;
import com.example.transportation.repository.TransporterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class TransporterService {

    private final TransporterRepository transporterRepository;
    private final Mapper mapper;
    private final PasswordEncoder passwordEncoder;

    public TransporterDto get(long id){
        return mapper.toTransporterDto(retrieve(id));
    }
    public Page<TransporterShortDto> getAll(Pageable pageable){
        return transporterRepository.findAll(pageable).map(mapper::toTransporterShortDto);
    }
    public TransporterDto create(TransporterDto transporterDto){
        Transporter transporter = mapper.toTransporter(transporterDto);
        transporter.getUser().setPassword(passwordEncoder.encode("password"));

        return mapper.toTransporterDto(transporterRepository.save(transporter));
    }
    public TransporterDto update(long id, TransporterDto transporterDto){
        Transporter transporter = retrieve(id);
        mapper.margeTransporter(transporterDto,transporter);
        return mapper.toTransporterDto(transporterRepository.save(transporter));
    }
    public void delete(long id)
    {
        transporterRepository.delete(retrieve(id));
    }
    private Transporter retrieve(long id){
        return transporterRepository.findById(id).orElseThrow(() -> new NotFoundException("Transporter",id));
    }

}
