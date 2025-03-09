package com.example.airport.auth;

import com.example.airport.model.User;
import com.example.airport.service.SpringContext;
import com.example.airport.service.UserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class PermissionCollector implements UserDetails {

    private User user;
    private UserService userService = SpringContext.getBean(UserService.class);

    public PermissionCollector(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> permissions = userService.findPermissionsByRole(this.user.getRole());
        System.out.println("Role: " + this.user.getRole());
        System.out.println("Permissions found: " + permissions);
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (permissions != null && !permissions.isEmpty()) {
            permissions.forEach(permission -> {
                System.out.println("Adding permission: " + permission);
                authorities.add(new SimpleGrantedAuthority(permission));
            });
        } else {
            System.out.println("No permissions found for role: " + this.user.getRole());
        }
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