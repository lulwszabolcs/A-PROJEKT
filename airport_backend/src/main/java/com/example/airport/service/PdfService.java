package com.example.airport.service;

import com.example.airport.dto.user.UserRead;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class PdfService {
    public static String generateUserPdf(UserRead user) throws IOException, DocumentException {

        Path projectRootPath = Paths.get(System.getProperty("user.home"));
        Path pdfDirectoryPath = projectRootPath.resolve("Downloads");
        Path filePath = pdfDirectoryPath.resolve(user.getUsername() + ".pdf");


        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(filePath.toFile()));
        document.open();


        String logoPath = "images/LOGO.png";
        Image logo = Image.getInstance(logoPath);
        logo.scaleToFit(80, 80);
        logo.setAbsolutePosition(10, document.getPageSize().getHeight() - logo.getScaledHeight() - 10);
        document.add(logo);


        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));
        document.add(new com.itextpdf.text.pdf.draw.LineSeparator());


        BaseFont baseFont = BaseFont.createFont("fonts/ARIAL.TTF", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
        Font normalFont = new Font(baseFont, 12);
        Font boldFont = new Font(baseFont, 12, Font.BOLD);


        String imagePath = "images/" + user.getId() + ".jpg";
        Image photo = Image.getInstance(imagePath);
        photo.scaleToFit(150, 150);
        photo.setAlignment(Element.ALIGN_CENTER);
        document.add(photo);

        document.add(new Paragraph(" "));


        Paragraph userDetails = new Paragraph();
        userDetails.add(new Chunk("Név: ", boldFont));
        userDetails.add(new Chunk(user.getWorker().getName(), normalFont));
        userDetails.add(Chunk.NEWLINE);
        userDetails.add(new Chunk("Munkakör: ", boldFont));
        userDetails.add(new Chunk(user.getWorker().getTitle().getDescription(), normalFont));
        userDetails.add(Chunk.NEWLINE);
        userDetails.add(new Chunk("Email: ", boldFont));
        userDetails.add(new Chunk(user.getWorker().getEmail(), normalFont));
        userDetails.add(Chunk.NEWLINE);
        userDetails.add(new Chunk("Telefonszám: ", boldFont));
        userDetails.add(new Chunk(user.getWorker().getPhoneNumber(), normalFont));
        userDetails.add(Chunk.NEWLINE);
        userDetails.add(new Chunk("Fizetés: ", boldFont));
        userDetails.add(new Chunk(user.getWorker().getWage() + " Ft", normalFont));
        userDetails.setAlignment(Element.ALIGN_CENTER);
        document.add(userDetails);

        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));
        LineSeparator lineSeparator = new LineSeparator();
        lineSeparator.setOffset(-385);
        document.add(new Chunk(lineSeparator));

        String currentDateAndTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_LEFT,
                new Phrase(currentDateAndTime, normalFont), 36, 13, 0);

        document.close();

        return filePath.toString();
    }
}
