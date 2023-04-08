package com.exam.model;

//  Importing Persistence

import javax.persistence.*;

//  Database Creation Entity
@Entity

public class UserRole {

    //     Primary Key of the Table ID
    @Id
//    ID key AUTO => Automatic Generate ID
    @GeneratedValue(strategy = GenerationType.AUTO)

    // Instance Variable
    private Long userRoleId;

    // User
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    // Role
    @ManyToOne
    private Role role;

    // Default Constructor
    public UserRole() {
    }

    // Mutator & Accessor Method
    public Long getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(Long userRoleId) {
        this.userRoleId = userRoleId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
