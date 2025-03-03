package com.demo.swagger.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "User entity for managing user data.")
public class User {

    @Schema(description = "Unique identifier of the user.", example = "1")
    private Long id;

    @NotBlank
    @Size(min = 2, max = 30)
    @Schema(description = "Name of the user.", example = "John Doe", required = true)
    private String name;

    @Email
    @Schema(description = "Email of the user.", example = "john.doe@example.com", required = true)
    private String email;

    // Constructors, Getters, and Setters
    public User() {}

    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}