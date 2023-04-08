package com.exam.repo;

import com.exam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    //  findByUsername Method
    public User findByUsername(String username);

    //  findByEmail Method
    public User findByEmail(String email);

    //  findByPhone Method
    public User findByPhone(String phone);
}
