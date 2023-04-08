package com.exam.model;

//  Importing Persistence

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
//Importing Util
import java.util.*;

//  Database Creation Entity
@Entity
//  Database Table Creation
@Table(name = "users")

public class User implements UserDetails {

    //     Primary Key of the Table ID
    @Id
//    ID key AUTO => Automatic Generate ID
    @GeneratedValue(strategy = GenerationType.AUTO)

    // Instance Variable Declaration
    private Long id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private boolean enabled = true;
    private String profile;

    // User have Many Roles
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
    @JsonIgnore
    private Set<UserRole> userRoles = new HashSet<>();

    // UserRole Mutator Accessor Method
    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    // Default Constructor
    public User() {
    }

    // Parameterized Constructor
    public User(Long id, String username, String password, String firstName, String lastName,
                String email, String phone, boolean enabled, String profile) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.enabled = enabled;
        this.profile = profile;
    }

    // Mutator Method
    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    // Accessor Method
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public String getProfile() {
        return profile;
    }

    //  User Details Spring Org Implements Method
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
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Set<Authority> set = new HashSet<>();

        this.userRoles.forEach(userRole -> {
            set.add(new Authority((userRole.getRole().getRoleName())));
        });
        return set;
    }
}
