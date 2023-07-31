package com.example.a104.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;


    @Data
    @AllArgsConstructor
    public class TokenDataResponse<T> {
        private String token;
        private String subject;
        private String name;
        private String issued_time;
        private String expired_time;
    }

