package com.example.airport.converter;

import com.example.airport.dto.image.ImageList;
import com.example.airport.model.Image;

import java.util.ArrayList;
import java.util.List;

public class ImageConverter {
    public static List<ImageList> convertModelsToRead(List<Image> images) {
        List<ImageList> imageLists = new ArrayList<>();
        for (Image image : images) {
            imageLists.add(convertModelToList(image));
        }
        return imageLists;
    }

    public static ImageList convertModelToList(Image image){
        ImageList imageList = new ImageList();
        imageList.setImageId(image.getImageId());
        imageList.setImageName(image.getImageName());
        imageList.setImagePath(image.getImagePath());
        imageList.setWorker_id(image.getWorker().getWorkerId());
        return imageList;
    }
}
