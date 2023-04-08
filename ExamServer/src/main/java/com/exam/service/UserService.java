package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;

import java.util.Set;

public interface UserService {

    // Creating User
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //  Get User by Username
    public User getUser(String username);

    // Delete user by id
    public void deleteUser(Long userId);

    // Image Add
//    public User addImage(User user);
}
