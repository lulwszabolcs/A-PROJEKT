package com.example.airport.dto.image;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageSave {
    private String fileName;
    private String filePatch;
    private int worker_id;
}
