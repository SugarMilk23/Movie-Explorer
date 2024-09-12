package com.example.movie.explorer.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.movie.explorer.model.User;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM user")
    List<User> getUsers();

    @Select("SELECT * FROM user WHERE user_name = #{userName}")
    User getUserByUserName(String userName);

    @Insert("INSERT INTO user (user_name, email, password) VALUES (#{userName}, #{email}, #{password})")
    int signUp(User user);


    @Update("UPDATE user SET user_name = #{userName}, email = #{email}, password = #{password} WHERE user_name = #{userName}")
    int updateUser(User user);

    @Select("SELECT * FROM user WHERE user_name = #{userName} AND password = #{password}")
    User login(User user);

   
    


}
