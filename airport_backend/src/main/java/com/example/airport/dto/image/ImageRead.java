package com.example.airport.dto.image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageRead {
    private Integer imageId;
    private String imageName;
    private String imagePath;
    private int worker;
}
