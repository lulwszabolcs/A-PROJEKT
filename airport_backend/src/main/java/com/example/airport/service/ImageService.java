package com.example.airport.service;

import com.example.airport.converter.ImageConverter;
import com.example.airport.dto.image.ImageList;
import com.example.airport.dto.image.ImageSave;
import com.example.airport.exception.WorkerNotFoundException;/*
import com.example.teszt.model.Image;
import com.example.teszt.repository.ImageRepository;*/
import com.example.airport.model.Image;
import com.example.airport.model.Worker;
import com.example.airport.repository.ImageRepository;
import com.example.airport.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service

public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private WorkerRepository workerRepository;


    public void saveImage(MultipartFile file, ImageSave imageSave) throws IOException {
        String uploadDir = "./images/";
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(imageSave.getFileName());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        Worker worker = workerRepository.findById(imageSave.getWorker_id())
                .orElseThrow(() -> new WorkerNotFoundException());

        Image image = new Image();
        image.setImageName(imageSave.getFileName());
        image.setImagePath(filePath.toString());
        image.setWorker(worker);

        imageRepository.save(image);
    }


    public List<ImageList> getAllImages() {
        List<Image> images = imageRepository.findAll();
        return ImageConverter.convertModelsToRead(images);
    }
}
