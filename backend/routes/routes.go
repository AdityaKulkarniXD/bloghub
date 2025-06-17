package routes

import (
    "github.com/gofiber/fiber/v2"
    "github.com/AdityaKulkarniXD/bloghub/backend/controllers"
    "github.com/AdityaKulkarniXD/bloghub/backend/middleware"
)

func SetupRoutes(app *fiber.App) {
    api := app.Group("/api")

    // Auth routes
    api.Post("/register", controllers.RegisterUser)
    api.Post("/login", controllers.LoginUser)

    // Protected Post routes
    posts := api.Group("/posts", middleware.JwtMiddleware())

    posts.Post("/", controllers.CreatePost)
    posts.Get("/", controllers.GetPosts)
    posts.Get("/:id", controllers.GetPost)
    posts.Put("/:id", controllers.UpdatePost)
    posts.Delete("/:id", controllers.DeletePost)
}
