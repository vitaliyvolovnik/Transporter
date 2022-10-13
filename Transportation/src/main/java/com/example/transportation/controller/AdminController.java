package com.example.transportation.controller;


import com.example.transportation.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;


    @GetMapping("/{id}/{active}")
    public void BlockUser(@PathVariable long id,@PathVariable boolean active){
        this.adminService.ChangeActive(id,active);
    }
}
