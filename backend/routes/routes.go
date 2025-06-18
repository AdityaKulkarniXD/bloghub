package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/AdityaKulkarniXD/bloghub/backend/middleware"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	// Auth
	api.Post("/register", Register)
	api.Post("/login", Login)

	// Posts - protected
	post := api.Group("/posts", middleware.Protected())
	post.Post("/", CreatePost)
	post.Get("/", GetPosts)
	post.Get("/:id", GetPost)
	post.Put("/:id", UpdatePost)
	post.Delete("/:id", DeletePost)
}
