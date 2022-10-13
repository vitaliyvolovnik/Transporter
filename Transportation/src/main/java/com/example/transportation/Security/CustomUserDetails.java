package com.example.transportation.Security;


import com.example.transportation.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Stream;


@AllArgsConstructor
@Getter
public class CustomUserDetails implements UserDetails {
    private User user;



    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return Stream.of(user.getRole()).map(role -> new SimpleGrantedAuthority("ROLE_"+role.toString())).toList();
    }

    @Override
    public String getUsername() {

        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.user.isActive();
    }
}
