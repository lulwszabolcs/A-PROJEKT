package com.example.airport.controller;

import com.example.airport.auth.PermissionCollector;
import com.example.airport.converter.UserConverter;
import com.example.airport.dto.ExceptionResponse;
import com.example.airport.dto.LoginRequest;
import com.example.airport.dto.user.UserList;
import com.example.airport.dto.user.UserPatch;
import com.example.airport.dto.user.UserRead;
import com.example.airport.dto.user.UserSave;
import com.example.airport.enumeration.user.UserStatus;
import com.example.airport.model.User;
import com.example.airport.service.UserService;
import com.example.airport.token.JWTTokenProvider;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "User functions", description = "Manage users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService service;

    private AuthenticationManager authenticationManager;

    private JWTTokenProvider jwtTokenProvider;

    @PostMapping("/user")
    @Operation(summary = "Create a new user")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('CREATE_USER')")
    public UserRead createUser(@RequestBody UserSave userSave) {
        return service.createUser(userSave);
    }


    @GetMapping("/user/{id}")
    @Operation(summary = "Read user by id")
    @PreAuthorize("hasAuthority('READ_USER')")
    public UserRead getUser(@PathVariable int id) {
        return service.getUser(id);
    }

    @PutMapping("/user/{id}")
    @Operation(summary = "Change user properties")
    @PreAuthorize("hasAuthority('UPDATE_USER')")
    public UserRead updateUser(@PathVariable int id, @RequestBody UserSave userSave) {
        return service.updateUser(id, userSave);
    }

    @GetMapping("/user")
    @Operation(summary = "List users")
    @PreAuthorize("hasAuthority('LIST_USER')")
    public List<UserList> getAllUsers() {
        return service.listUsers();
    }

    @DeleteMapping("/user/{id}")
    @Operation(summary = "Delete user by id")
    @PreAuthorize("hasAuthority('DELETE_USER')")
    public UserRead deleteUser(@PathVariable int id) {
        return service.deleteUser(id);
    }

    @PatchMapping("/user/{id}")
    @Operation(summary = "Modifying user status")
    @PreAuthorize("hasAuthority('MODIFY_USER_STATUS')")
    public UserRead modifyUserStatus(@PathVariable int id, @RequestBody UserPatch userPatch) {
        return service.modifyUserStatus(id, userPatch);
    }

    @GetMapping("/user/status/{userStatus}")
    @Operation(summary = "List users by status")
    @PreAuthorize("hasAuthority('LIST_USER_BY_STATUS')")
    public List<UserList> listUsersByStatus(@PathVariable UserStatus userStatus) {
        return service.listUsersByStatus(userStatus);
    }

    @Autowired
    public UserController(AuthenticationManager authenticationManager, JWTTokenProvider jwtTokenProvider, UserService service) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.service = service;
    }

    @PostMapping("/user/login")
    @Operation(summary = "User login")
    public ResponseEntity<UserRead> login(@RequestBody LoginRequest loginRequest) {
        authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        User user = service.findUserByUsername(loginRequest.getUsername());
        PermissionCollector collector = new PermissionCollector(user);
        HttpHeaders jwtHeader = getJWTHeader(collector);
        String jwtToken = jwtTokenProvider.generateJwtToken(collector);
        UserRead userRead = UserConverter.convertModelToRead(user, jwtToken);
        return new ResponseEntity<>(userRead, jwtHeader, HttpStatus.OK);
    }

    private HttpHeaders getJWTHeader(PermissionCollector collector) {
        HttpHeaders jwtHeader = new HttpHeaders();
        jwtHeader.add("JWT_Token", jwtTokenProvider.generateJwtToken(collector));
        return jwtHeader;
    }

    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }

    @GetMapping("/user/pdf/{id}")
    @Operation(summary = "Generate PDF of user data")
    public ResponseEntity<String> generateUserPdf(@PathVariable int id) throws IOException, DocumentException {
        UserRead user = service.getUser(id);

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

        document.add(new Paragraph(" "));

        String imagePath = "images/" + id + ".jpg";
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
        userDetails.add(Chunk.NEWLINE); // Add a new line

        userDetails.add(new Chunk("Email: ", boldFont));
        userDetails.add(new Chunk(user.getWorker().getEmail(), normalFont));
        userDetails.add(Chunk.NEWLINE); // Add a new line

        userDetails.add(new Chunk("Telefonszám: ", boldFont));
        userDetails.add(new Chunk(user.getWorker().getPhoneNumber(), normalFont));
        userDetails.add(Chunk.NEWLINE); // Add a new line

        userDetails.add(new Chunk("Fizetés: ", boldFont));
        userDetails.add(new Chunk(user.getWorker().getWage() + " Ft", normalFont));
        userDetails.setAlignment(Element.ALIGN_CENTER);
        document.add(userDetails);

        document.add(new Paragraph(" "));

        document.add(new Paragraph(" "));

        LineSeparator lineSeparator = new LineSeparator();
        lineSeparator.setOffset(-360); // Adjust this value to position the line correctly
        document.add(new Chunk(lineSeparator));

        String currentDateAndTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_LEFT,
                new Phrase(currentDateAndTime, normalFont), 36, 13, 0);

        document.close();
        return new ResponseEntity<>("PDF generated and saved to: " + filePath.toString(), HttpStatus.OK);
    }
}


