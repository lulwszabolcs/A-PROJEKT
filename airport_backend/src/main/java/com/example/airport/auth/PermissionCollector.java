package com.example.airport.auth;

import com.example.airport.enumeration.role.Role;
import com.example.airport.model.User;
import com.example.airport.service.SpringContext;
import com.example.airport.service.UserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class PermissionCollector implements UserDetails {

    private User user;
    private Collection<SimpleGrantedAuthority> authorities;

    public PermissionCollector(User user) {
        this.user = user;
        this.authorities = loadAuthorities(user);
    }

    public PermissionCollector(String username, String role, List<String> permissions) {
        this.user = new User();
        this.user.setUsername(username);
        this.user.setRole(Role.valueOf(role));
        this.authorities = permissions.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    private Collection<SimpleGrantedAuthority> loadAuthorities(User user) {
        UserService userService = SpringContext.getBean(UserService.class);
        List<String> permissions = userService.findPermissionsByRole(user.getRole());
        return permissions.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getUsername();
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
        return true;
    }

    public User getUser() {
        return this.user;
    }
}