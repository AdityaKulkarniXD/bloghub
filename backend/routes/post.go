package routes

import (
	"github.com/AdityaKulkarniXD/bloghub/backend/database"
	"github.com/AdityaKulkarniXD/bloghub/backend/models"
	"github.com/gofiber/fiber/v2"
)

func CreatePost(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := uint(claims["id"].(float64))

	var post models.Post
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid post"})
	}
	post.UserID = userID

	database.DB.Create(&post)
	return c.JSON(post)
}

func GetPosts(c *fiber.Ctx) error {
	var posts []models.Post
	database.DB.Find(&posts)
	return c.JSON(posts)
}
