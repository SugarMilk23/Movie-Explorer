package com.example.movie.explorer.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.example.movie.explorer.model.User;
import com.example.movie.explorer.service.AuthService;
import com.example.movie.explorer.service.UserService;
import com.example.movie.explorer.util.JwtUtil;



@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;


    //testing
    @GetMapping("/")
    public String test() {
        return "Hello World";
    }

    //sign up
    @PostMapping("/sign-up")    
    public User signUp(@RequestBody User user) {
        User existingUser = userService.getUserByUserName(user.getUserName());
        if (existingUser != null) {
            throw new IllegalArgumentException("Username already exists");
        }
        return authService.signUp(user);
    }


    //login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try{
        User loggedInUser = authService.login(user);
        
        String token = jwtUtil.generateToken(loggedInUser.getUserName());
        
        ResponseCookie jwtCookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true) // set to true if using HTTPS
                .path("/")
                .maxAge(240 * 60 * 60) // 10 days
                .build();
        
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(loggedInUser);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}


}