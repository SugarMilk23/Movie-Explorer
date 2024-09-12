package com.example.movie.explorer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.movie.explorer.mapper.UserMapper;
import com.example.movie.explorer.model.User;

@Service
public class AuthService {

    @Autowired
    private UserMapper userMapper;

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public User signUp(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        int rowsAffected = userMapper.signUp(user);
        if (rowsAffected > 0) {
            return user; 
        }
        return null;
    }

    public User login(User user) {
        User existingUser = userService.getUserByUserName(user.getUserName());
        if (existingUser == null) {
            throw new IllegalArgumentException("Username does not exist");
        }
        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        return existingUser;
    }
}
