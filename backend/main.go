package main

import (
	"github.com/AdityaKulkarniXD/backend/database"
	"github.com/AdityaKulkarniXD/backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	app := fiber.New()
	database.ConnectDB()
	routes.SetupRoutes(app)

	app.Listen(":8080")
}
