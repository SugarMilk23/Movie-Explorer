package com.example.movie.explorer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.movie.explorer.mapper.UserMapper;
import com.example.movie.explorer.model.User;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;


    public List<User> getUsers(){
        return userMapper.getUsers();
    }

    public User getUserByUserName(String userName){
        return userMapper.getUserByUserName(userName);
    }

    public int updateUser(User user){
        return userMapper.updateUser(user);
    }

}
