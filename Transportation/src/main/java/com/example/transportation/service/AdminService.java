package com.example.transportation.service;

import com.example.transportation.entity.User;
import com.example.transportation.exception.NotFoundException;
import com.example.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;

    public void ChangeActive(Long id,boolean active){
        User user = this.userRepository.findById(id).orElseThrow(() -> new NotFoundException("User",id));
        user.setActive(active);
        this.userRepository.save(user);
    }






}
