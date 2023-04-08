package com.exam.service.impl;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    //  User Repository
    @Autowired
    private UserRepository userRepository;

    //  Role Repository
    @Autowired
    private RoleRepository roleRepository;

    //  Creating User
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        //  Check Whether the Same User is in Database or Not
        User local = this.userRepository.findByUsername(user.getUsername());
        User local1 = this.userRepository.findByEmail(user.getEmail());
        User local2 = this.userRepository.findByPhone(user.getPhone());
        // Check the username is null or not
        if (local != null) {
            System.out.println("This User Username is already there !!");
            throw new Exception("User already present !!");
        }
        //  Check the email is null or not
        else if (local1 != null) {
            System.out.println("This User EmailId is already there !!");
            throw new Exception("User already present !!");
        } else if (local2 != null) {
            System.out.println("This User PhoneNo. is already there !!");
            throw new Exception("User already present !!");
        } else {
            //  If user not is not present then create a new user
            for (UserRole ur : userRoles
            ) {
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }
        return local;
    }

    //  Getting User by Username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    //  Delete User by userId
    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    //  Add Profile Image
//    @Override
//    public User addImage(User user) {
//        return this.userRepository.save(user);
//    }
}
