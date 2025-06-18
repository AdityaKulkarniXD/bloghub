package routes

import (
	"github.com/AdityaKulkarniXD/bloghub/backend/database"
	"github.com/AdityaKulkarniXD/bloghub/backend/models"
	"github.com/gofiber/fiber/v2"
)

func CreatePost(c *fiber.Ctx) error {
	var post models.Post
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	if err := database.DB.Create(&post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not create post"})
	}

	return c.JSON(post)
}

func GetPosts(c *fiber.Ctx) error {
	var posts []models.Post
	database.DB.Preload("User").Find(&posts)
	return c.JSON(posts)
}

func GetPost(c *fiber.Ctx) error {
	id := c.Params("id")
	var post models.Post
	database.DB.First(&post, id)
	return c.JSON(post)
}

func UpdatePost(c *fiber.Ctx) error {
	id := c.Params("id")
	var post models.Post
	database.DB.First(&post, id)

	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	database.DB.Save(&post)
	return c.JSON(post)
}

func DeletePost(c *fiber.Ctx) error {
	id := c.Params("id")
	database.DB.Delete(&models.Post{}, id)
	return c.SendStatus(204)
}
