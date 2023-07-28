package com.example.a104.project.entity;

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDate;

public class TagInfoVoId implements Serializable {

    @Column(name = "tag_date")
    private LocalDate tagDate;

    @Column(name = "user_id")
    private Integer userId;

    @Column
    private String reader;
}
