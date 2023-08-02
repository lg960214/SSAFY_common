package com.example.a104.project.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class TagInfoDto {

    private String reader;
    private String name;
    private int user_id;
    private LocalDateTime start_time;
    private LocalDateTime endTime;
    private LocalDate tag_data;
}
