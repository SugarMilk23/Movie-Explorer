package com.example.movie.explorer.mapper;

import java.util.List;

import org.apache.ibatis.annotations.*;

import com.example.movie.explorer.model.Rating;

@Mapper
public interface RatingMapper {
@Select("SELECT * FROM rating")
List<Rating> getRating();

@Select("SELECT * FROM rating WHERE id = #{id}")
Rating getRatingById(int id);

@Insert("INSERT INTO rating (title, rating, userName, movieId) VALUES (#{title}, #{rating}, #{userName}, #{movieId})")
@Options(useGeneratedKeys = true,keyProperty = "id")
int insertRating(Rating rating);

@Update("UPDATE rating SET title = #{title}, rating = #{rating}, userName = #{userName}, movieId = #{movieId} WHERE title = #{title} AND userName = #{userName} AND movieId = #{movieId}")
int updateRating(Rating rating);

@Delete("DELETE FROM rating WHERE title = #{title} AND userName = #{userName} AND movieId = #{movieId}")
int deleteRating(String title);



}
