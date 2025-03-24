package com.example.airport.dto.image;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageList {
    private Integer imageId;
    private String imageName;
    private String imagePath;
    private int worker_id;
}
