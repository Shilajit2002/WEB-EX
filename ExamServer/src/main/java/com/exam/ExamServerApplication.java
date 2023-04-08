package com.exam;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamServerApplication implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //	Main Method
    public static void main(String[] args) {
        SpringApplication.run(ExamServerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Starting Code");

//		ADMIN1
//		//	Create User Object
//		User user = new User();
//		//	Set User Entity
//		user.setFirstName("Examiner");
//		user.setLastName("");
//		user.setUsername("soft165");
//		user.setPassword(this.bCryptPasswordEncoder.encode("Exam165@$#98soft"));
//		user.setEmail("softprep321@gmail.com");
//		user.setProfile(user.getProfile());
//
//		//	Create Role Object
//		Role role1 = new Role();
//		//	Set Role Entity
//		role1.setRoleId(165L);
//		role1.setRoleName("ADMIN");
//
//		Set<UserRole> userRoleSet=new HashSet<>();
//		//	Create UserRole Object
//		UserRole userRole = new UserRole();
//		//	Set UserRole Entity
//		userRole.setRole(role1);
//		userRole.setUser(user);
//
//		userRoleSet.add(userRole);
//
//		User user1 = this.userService.createUser(user,userRoleSet);
//		System.out.println(user1.getUsername());

//		ADMIN2
        //	Create User Object
//		User user = new User();
//		//	Set User Entity
//		user.setFirstName("Examiner");
//		user.setLastName("");
//		user.setUsername("admin165");
//		user.setPassword(this.bCryptPasswordEncoder.encode("Admin@CIEM165"));
//		user.setEmail("info@ciem.ac.in");
//		user.setProfile(user.getProfile());
//
//		//	Create Role Object
//		Role role1 = new Role();
//		//	Set Role Entity
//		role1.setRoleId(165L);
//		role1.setRoleName("ADMIN");
//
//		Set<UserRole> userRoleSet = new HashSet<>();
//		//	Create UserRole Object
//		UserRole userRole = new UserRole();
//		//	Set UserRole Entity
//		userRole.setRole(role1);
//		userRole.setUser(user);
//
//		userRoleSet.add(userRole);
//
//		User user1 = this.userService.createUser(user, userRoleSet);
//		System.out.println(user1.getUsername());
    }
}

