package ru.kata.spring.boot_security.demo.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    public User findByUsername(String username);

    public List<User> findAll();

    public User findOne(long id);

    public void save(User user);

    public void update(long id, User updatedUser);

    public void delete(long id);

    public UserDetails loadUserByUsername(String username);
}
