package com.team7.chaekin.domain.memo.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class MemoListDto {
    private long memoId;
    private String color;
    private String content;
}
