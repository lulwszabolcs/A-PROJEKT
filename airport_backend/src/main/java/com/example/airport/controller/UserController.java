package com.example.airport.controller;

import com.example.airport.auth.PermissionCollector;
import com.example.airport.converter.UserConverter;
import com.example.airport.dto.LoginRequest;
import com.example.airport.dto.user.UserList;
import com.example.airport.dto.user.UserPatch;
import com.example.airport.dto.user.UserRead;
import com.example.airport.dto.user.UserSave;
import com.example.airport.enumeration.user.UserStatus;
import com.example.airport.model.User;
import com.example.airport.service.PdfService;
import com.example.airport.service.UserService;
import com.example.airport.token.JWTTokenProvider;
import com.itextpdf.text.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "User functions", description = "Manage users")
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

        LocalDateTime datum = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDatum = datum.format(formatter);
        try {
            service.getEmailService().sendSimpleMessage(
                    user.getWorker().getEmail(),
                    "Bejelentkezési értesítés",
                    "Tisztelt " + loginRequest.getUsername() + "!\nEzúton értesítjük, hogy " + formattedDatum + " időpontban bejelentkezés történt az Ön fiókjába a SkyPass Repülőtér irányítási szoftver rendszerében."
            );
        } catch (Exception e) {
            System.err.println("Hiba történt az e-mail küldés során: " + e.getMessage());
        }

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

    @GetMapping("/user/getstatus/{id}")
    @Operation(summary = "Get the users status")
    @PreAuthorize("hasAuthority('READ_USER_STATUS')")
    public UserStatus getUserStatus(@PathVariable int id) {
        return service.getUserStatus(id);
    }

    @GetMapping("/user/pdf/{id}")
    @Operation(summary = "Generate PDF of user data")
    public ResponseEntity<String> generateUserPdf(@PathVariable int id) throws IOException, DocumentException {
        UserRead user = service.getUser(id);
        String pdfPath = PdfService.generateUserPdf(user);
        return new ResponseEntity<>("PDF generated and saved to: " + pdfPath, HttpStatus.OK);
    }
}


