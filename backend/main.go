package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/joho/godotenv"
    "log"
    "os"

    "github.com/AdityaKulkarniXD/bloghub/backend/database"
    "github.com/AdityaKulkarniXD/bloghub/backend/routes"
)

func main() {
    // Load env vars
    if err := godotenv.Load(); err != nil {
        log.Println("Warning: .env file not found, relying on environment variables")
    }

    // Connect to DB
    database.ConnectDB()

    app := fiber.New()

    routes.SetupRoutes(app)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Fatal(app.Listen(":" + port))
}
