package com.example.a104.project.entity;

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDate;

public class CountVoId implements Serializable {

    @Column
    private LocalDate search;

    @Column
    private String name;
}
