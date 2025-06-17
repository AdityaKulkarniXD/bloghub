package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/AdityaKulkarniXD/bloghub/backend/routes/users"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Post("/register", users.Register)
	api.Post("/login", users.Login)
}
