package com.example.transportation.controller;


import com.example.transportation.dto.RegisterDto;
import com.example.transportation.dto.UserDto;
import com.example.transportation.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;


    @GetMapping("/{email}")
    public boolean isEmailExist(@PathVariable String email){
        return authService.isExist(email);
    }

    @PostMapping("/register")
    public UserDto signup(@RequestBody RegisterDto registerDto){
        return authService.signupCustomer(registerDto);
    }


}
