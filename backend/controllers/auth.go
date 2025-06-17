package controllers

import (
    "github.com/gofiber/fiber/v2"
    "github.com/AdityaKulkarniXD/bloghub/backend/database"
    "golang.org/x/crypto/bcrypt"
    "github.com/AdityaKulkarniXD/bloghub/backend/middleware"
)

type RegisterRequest struct {
    Name     string `json:"name"`
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

func RegisterUser(c *fiber.Ctx) error {
    var body RegisterRequest
    if err := c.BodyParser(&body); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to hash password"})
    }

    user := database.User{
        Name:     body.Name,
        Email:    body.Email,
        Password: string(hashedPassword),
    }

    result := database.DB.Create(&user)
    if result.Error != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Could not create user"})
    }

    return c.JSON(fiber.Map{"message": "User created successfully"})
}

func LoginUser(c *fiber.Ctx) error {
    var body LoginRequest
    if err := c.BodyParser(&body); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
    }

    var user database.User
    result := database.DB.Where("email = ?", body.Email).First(&user)
    if result.Error != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid email or password"})
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid email or password"})
    }

    token, err := middleware.GenerateJWT(user.ID)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to generate token"})
    }

    return c.JSON(fiber.Map{
        "message": "Login successful",
        "token":   token,
    })
}
