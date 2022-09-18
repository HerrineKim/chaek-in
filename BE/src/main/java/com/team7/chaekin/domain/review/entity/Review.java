package com.team7.chaekin.domain.review.entity;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Review extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booklog_id")
    private BookLog bookLog;

    @Column
    private Double score;

    @Column
    private String comment;

    @Column
    private Boolean isRemoved;
}