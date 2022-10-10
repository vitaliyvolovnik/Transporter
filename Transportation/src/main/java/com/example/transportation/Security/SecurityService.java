package com.example.transportation.Security;

import com.example.transportation.entity.User;
import com.example.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityService {

    private final UserRepository userRepository;

    public User getUser() {
        //TODO create exception
        return this.userRepository.findByEmail(getCurrentUserEmail()).orElseThrow();
    }

    public String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
