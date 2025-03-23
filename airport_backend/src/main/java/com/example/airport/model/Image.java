package com.example.airport.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageId;
    private String imageName;
    private String imagePath;
    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

}
