package main

import (
	"github.com/AdityaKulkarniXD/bloghub/backend/database"
	"github.com/AdityaKulkarniXD/bloghub/backend/middleware"
	"github.com/AdityaKulkarniXD/bloghub/backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	app := fiber.New()

	database.ConnectDB()

	app.Post("/api/register", routes.Register)
	app.Post("/api/login", routes.Login)

	api := app.Group("/api", middleware.Protected())
	api.Post("/posts", routes.CreatePost)
	api.Get("/posts", routes.GetPosts)

	app.Listen(":8080")
}
