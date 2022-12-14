package com.team7.chaekin.domain.book.entity;

import com.team7.chaekin.domain.category.entity.Category;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String isbn;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 255)
    private String author;

    private Date publishDate;

    @Column(length = 2000)
    private String description;

    @Column(length = 1000)
    private String cover;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(length = 50)
    private String publisher;

    private int page;

    private double ratingScore;

    private int ratingCount;

//    public Book(String isbn, String title, Category category) {
//        this.isbn = isbn;
//        this.title = title;
//        this.category = category;
//    }

    public void addScore(double addScore) {
        ratingScore = (ratingScore * ratingCount + addScore) / (ratingCount + 1);
        ratingCount++;
    }

    public void updateScore(double origin, double newScore) {
        ratingScore = ((ratingScore * ratingCount) - origin + newScore) / ratingCount;
    }

    public void deleteScore(double score) {
        ratingScore = ((ratingScore * ratingCount) - score) / (ratingCount - 1);
        ratingCount--;
    }
}
