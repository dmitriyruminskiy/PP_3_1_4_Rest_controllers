package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UsersRestController {
    private final UserService userService;

    @Autowired
    public UsersRestController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping()
    public User showUser(Principal principal) {
        return userService.findByUsername(principal.getName());
    }
}
