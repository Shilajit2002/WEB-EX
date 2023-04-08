package com.exam.model;

//  Importing Persistence

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

//  Database Creation Entity
@Entity
//  Database Table Creation
@Table(name = "roles")

public class Role {

    //    Primary Key of the Table ID
    @Id

    //  Instance Variable Declaration
    private Long roleId;
    private String roleName;

    // User have Many Roles
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role")
    private Set<UserRole> userRoles = new HashSet<>();

    //  Default Constructor
    public Role() {
    }

    // User Roles Mutator & Accessor Method
    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    // Parameterized Constructor
    public Role(Long roleId, String roleName) {
        this.roleId = roleId;
        this.roleName = roleName;
    }

    // Mutator Method
    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    // Accessor Method
    public Long getRoleId() {
        return roleId;
    }

    public String getRoleName() {
        return roleName;
    }
}
