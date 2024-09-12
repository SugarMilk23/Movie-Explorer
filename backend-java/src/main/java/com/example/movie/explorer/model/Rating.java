package com.example.movie.explorer.model;

public class Rating {
private int id;
private String title;
private int rating;
private String name;
private int movieId;

//constructors
public Rating(String title, int rating, String name, int movieId) {
    this.title = title;
    this.rating = rating;
    this.name = name;
    this.movieId = movieId;
}



//getters and setters
public String getTitle() {
    return title;
}


public void setTitle(String title) {
    this.title = title;
}


public int getRating() {
    return rating;
}


public void setRating(int rating) {
    this.rating = rating;
}


public String getName() {
    return name;
}


public void setName(String name) {
    this.name = name;
}


public int getMovieId() {
    return movieId;
}


public void setMovieId(int movieId) {
    this.movieId = movieId;
}





}
