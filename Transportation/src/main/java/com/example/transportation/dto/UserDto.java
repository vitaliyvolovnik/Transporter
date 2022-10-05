package com.example.transportation.dto;

import com.example.transportation.enums.Role;
import lombok.*;


@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserDto {

    private String email;
    private Role role;
    private boolean active;
}
