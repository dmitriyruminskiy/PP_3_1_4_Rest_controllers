package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.validation.Valid;
import java.security.Principal;

@Controller
public class MyAdminUserController {
    private final UserService userService;

    @Autowired
    public MyAdminUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public String showUser(Model model, Principal principal) {
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        return "user";
    }

    @GetMapping("/")
    public String showAll(Model model, Principal principal) {
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        model.addAttribute("users", userService.findAll());
        model.addAttribute("userNew", new User());
        return "admin";
    }

    @PatchMapping("admin/{id}")
    public String edit(@ModelAttribute User user, @PathVariable("id") Long id) {
        userService.update(id, user);
        return "redirect:/";
    }

    @DeleteMapping("admin/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:/";
    }

    @PostMapping("admin/create")
    public String create(@ModelAttribute("user") @Valid User user) {
        userService.save(user);
        return "redirect:/";
    }
}
