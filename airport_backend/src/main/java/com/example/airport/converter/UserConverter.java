package com.example.airport.converter;

import com.example.airport.dto.user.UserList;
import com.example.airport.dto.user.UserRead;
import com.example.airport.dto.user.UserSave;
import com.example.airport.model.User;
import com.example.airport.model.Worker;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserConverter {

    public static User convertModelToSave(UserSave userSave, Worker worker) {
        User user = new User();
        user.setUsername(userSave.getUsername());
        user.setPassword(userSave.getPassword());
        user.setRole(userSave.getRole());
        user.setStatus(userSave.getStatus());
        user.setWorker(worker);
        return user;
    }

    public static User convertModelToSave(Integer id, UserSave userSave, Worker worker) {
        User user = new User();
        user.setId(id);
        user.setUsername(userSave.getUsername());
        user.setPassword(userSave.getPassword());
        user.setRole(userSave.getRole());
        user.setStatus(userSave.getStatus());
        user.setWorker(worker);
        return user;
    }

    public static UserRead convertModelToRead(User user, String jwtToken) {
        UserRead userRead = new UserRead();
        userRead.setId(user.getId());
        userRead.setUsername(user.getUsername());
        userRead.setPassword(user.getPassword());
        userRead.setRole(user.getRole());
        userRead.setStatus(user.getStatus());
        userRead.setWorker(WorkerConverter.convertModelToRead(user.getWorker()));
        userRead.setJwtToken(jwtToken);
        return userRead;
    }

    public static UserRead convertModelToRead(User user) {
        return convertModelToRead(user, null);
    }


    public static List<UserList> convertModelsToList(List<User> users) {
        List<UserList> dtoList = new ArrayList<>();
        for (User user : users) {
            dtoList.add(convertModelToList(user));
        }
        return dtoList;
    }

    private static UserList convertModelToList(User user) {
        UserList userList = new UserList();
        userList.setId(user.getId());
        userList.setUsername(user.getUsername());
        userList.setPassword(user.getPassword());
        userList.setRole(user.getRole());
        userList.setStatus(user.getStatus());
        if (user.getWorker() != null) {
            userList.setWorker_id(user.getWorker().getWorkerId());
        } else {
            userList.setWorker_id(0);
        }
        return userList;
    }
}
