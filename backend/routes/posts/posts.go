package posts

import (
	"github.com/AdityaKulkarniXD/bloghub/backend/database"
	"github.com/AdityaKulkarniXD/bloghub/backend/models"
	"github.com/gofiber/fiber/v2"
)

func PostRoutes(router fiber.Router) {
	router.Get("/", GetAllPosts)
	router.Post("/", CreatePost)
}

func GetAllPosts(c *fiber.Ctx) error {
	var posts []models.Post
	database.DB.Find(&posts)
	return c.JSON(posts)
}

func CreatePost(c *fiber.Ctx) error {
	post := new(models.Post)
	if err := c.BodyParser(post); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}
	database.DB.Create(&post)
	return c.JSON(post)
}
