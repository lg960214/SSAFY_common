package com.example.a104.project.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Entity
@Builder
@DynamicInsert
@IdClass(TagInfoVoId.class)
@Table(name="tag_info")
public class TagInfoVo {

    @Id
    @Column(name = "tag_date")
    private LocalDate tagDate;

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column
    private String reader;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

}
