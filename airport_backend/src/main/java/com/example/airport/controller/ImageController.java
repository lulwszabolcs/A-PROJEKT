package com.example.airport.controller;

import com.example.airport.dto.image.ImageList;
import com.example.airport.dto.image.ImageSave;
import com.example.airport.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Upload images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/images/upload")
    @PreAuthorize("hasAuthority('UPLOAD_IMAGES')")
    @Operation(summary = "Upload profile images for worker")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("imageSave") String imageSaveJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ImageSave imageSave = objectMapper.readValue(imageSaveJson, ImageSave.class);

            imageService.saveImage(file, imageSave);

            return ResponseEntity.ok("Image uploaded successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAILED_TO_UPLOAD_IMAGE: " + e.getMessage());
        }
    }

    @GetMapping("/images")
    @PreAuthorize("hasAuthority('READ_IMAGES')")
    @Operation(summary = "Get all uploaded images")
    public List<ImageList> getAllImages() {
        logUserAuthorities();
        return imageService.getAllImages();
    }

    public void logUserAuthorities() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            for (GrantedAuthority authority : authentication.getAuthorities()) {
                System.out.println("Authority: " + authority.getAuthority());
            }
        }
    }
}
