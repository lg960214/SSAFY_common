package com.example.a104.project.entity;


import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Entity
@Builder
@DynamicInsert
@Table(name="reader")
public class ReaderVo {
    @Id
    @Column
    private String reader;

    @Column
    @Builder.Default
    private String region = null;

    @Column
    @Builder.Default
    private String name = null;

    @Column(name = "gym_code")
    private Integer gymCode;

    @OneToMany(mappedBy = "readerVo")
    private List<TagInfoVo> tagInfo = new ArrayList<>();

}
