package com.example.airport.service;

import com.example.airport.auth.PermissionCollector;
import com.example.airport.converter.UserConverter;
import com.example.airport.dto.user.UserList;
import com.example.airport.dto.user.UserPatch;
import com.example.airport.dto.user.UserRead;
import com.example.airport.dto.user.UserSave;
import com.example.airport.enumeration.Permission;
import com.example.airport.enumeration.role.Role;
import com.example.airport.enumeration.user.UserPatchKey;
import com.example.airport.enumeration.user.UserStatus;
import com.example.airport.exception.AuthUserNotFoundException;
import com.example.airport.exception.StatusNotFoundException;
import com.example.airport.exception.UserNotFoundException;
import com.example.airport.exception.WorkerNotFoundException;
import com.example.airport.model.User;
import com.example.airport.model.Worker;
import com.example.airport.repository.AllocateRepository;
import com.example.airport.repository.UserRepository;
import com.example.airport.repository.WorkerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
@Transactional
@Qualifier("userDetailsService")
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    AllocateRepository allocateRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private EmailService emailService;
    @Autowired
    public UserService(EmailService emailService) {
        this.emailService = emailService;
    }

    public static final String NO_USER_FOUND_BY_USERNAME = "No user found by username: ";

    public UserRead createUser(UserSave userSave) {
        Worker worker = workerRepository.findById(userSave.getWorker_id()).orElseThrow(WorkerNotFoundException::new);
        User creatingUser = UserConverter.convertModelToSave(userSave, worker);
        creatingUser.setPassword(bCryptPasswordEncoder.encode(creatingUser.getPassword()));
        User createdUser = repository.save(creatingUser);
        return UserConverter.convertModelToRead(createdUser);
    }

    public UserRead getUser(int id) {
        throwUserNotFoundException(id);
        return UserConverter.convertModelToRead(repository.findById(id).get());
    }

    public UserRead updateUser(int id, UserSave userSave) {
        throwUserNotFoundException(id);
        Worker worker = workerRepository.findById(userSave.getWorker_id()).orElseThrow(WorkerNotFoundException::new);
        User user = UserConverter.convertModelToSave(id, userSave, worker);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return UserConverter.convertModelToRead(repository.save(user));
    }

    public List<UserList> listUsers() {
        List<User> users = repository.findAll();
        return UserConverter.convertModelsToList(users);
    }


    public UserRead deleteUser(int id) {
        throwUserNotFoundException(id);
        User user = repository.getReferenceById(id);
        repository.delete(user);
        return UserConverter.convertModelToRead(user);
    }

    public UserRead modifyUserStatus(int id, UserPatch userPatch) {
        throwUserNotFoundException(id);
        User user = repository.getReferenceById(id);
        if (userPatch.getKey() == UserPatchKey.STATUS){
            try{
                UserStatus newStatus = UserStatus.valueOf(userPatch.getValue());
                user.setStatus(newStatus);
            }catch (IllegalArgumentException e){
                throw new StatusNotFoundException();
            }
        }else{
            throw new IllegalArgumentException();
        }

        User modifiedUser = repository.save(user);
        return UserConverter.convertModelToRead(modifiedUser);
    }

    private void throwUserNotFoundException(int id) {
        if (!repository.existsById(id)) {
            throw new UserNotFoundException();
        }
    }

    public List<UserList> listUsersByStatus(UserStatus userStatus) {
        List<User> users = repository.findUsersByStatus(userStatus);
        return UserConverter.convertModelsToList(users);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findUserByUsername(username);
        if (user == null) {
            throw new AuthUserNotFoundException(NO_USER_FOUND_BY_USERNAME + username);
        }
        return new PermissionCollector(user);
    }

    public EmailService getEmailService() {
        return emailService;
    }

    public User findUserByUsername(String username) {
        return repository.findUserByUsername(username);
    }

    public List<String> findPermissionsByRole(Role role) {
        String roleName = role.name();
        return repository.findPermissionsByRole(String.valueOf(Role.valueOf(roleName)));
    }

    public boolean hasPermission(Role role, Permission permission) {
        Long result = allocateRepository.hasPermission(role.name(), permission.name());
        return result != null && result == 1L;
    }
}

