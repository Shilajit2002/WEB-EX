package com.exam.controller;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
//  For Allow all local host server
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //  Creating User
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

        //  Set user Role as a Hash Set
        user.setProfile(user.getProfile());

        //  Encoding Password with BcryptPasswordEncoder
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        Set<UserRole> roles = new HashSet<>();

        //  Create Role Object
        Role role = new Role();
        role.setRoleId(28L);
        role.setRoleName("NORMAL");

        //  Create User Role Object
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

        return this.userService.createUser(user, roles);
    }

    //   Get by Username
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username) {
        return this.userService.getUser(username);
    }

    // Delete the User by userId
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        this.userService.deleteUser(userId);
    }

    //  Add Image || Not Working
//    @PutMapping("/")
//    public User addProfile(@RequestBody User user){
//        return this.userService.addImage(user);
//    }
}
