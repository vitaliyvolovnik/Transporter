package com.example.transportation.Security;

import com.example.transportation.entity.User;
import com.example.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityService {

    private final UserRepository userRepository;
    public User getUser() {
        return this.getCustomUserDetails().getUser();
        //return userRepository.findByEmail(getCurrentUserEmail()).orElseThrow();
    }
    public CustomUserDetails getCustomUserDetails(){
        return (CustomUserDetails)getAuthentication().getPrincipal();
    }
    public String getCurrentUserEmail() {
        return getAuthentication().getName();
    }
    public Authentication getAuthentication(){
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
