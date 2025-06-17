package controllers

import (
    "strconv"

    "github.com/gofiber/fiber/v2"
    "github.com/AdityaKulkarniXD/bloghub/backend/database"
)

type PostRequest struct {
    Title   string `json:"title"`
    Content string `json:"content"`
}

// Create post
func CreatePost(c *fiber.Ctx) error {
    user := c.Locals("user").(*fiber.JWTClaims)
    userID := uint(user["user_id"].(float64))

    var body PostRequest
    if err := c.BodyParser(&body); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
    }

    post := database.Post{
        Title:    body.Title,
        Content:  body.Content,
        AuthorID: userID,
    }

    if err := database.DB.Create(&post).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not create post"})
    }

    return c.JSON(post)
}

// Get all posts
func GetPosts(c *fiber.Ctx) error {
    var posts []database.Post
    if err := database.DB.Find(&posts).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not retrieve posts"})
    }

    return c.JSON(posts)
}

// Get single post by ID
func GetPost(c *fiber.Ctx) error {
    id := c.Params("id")
    var post database.Post

    if err := database.DB.First(&post, id).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Post not found"})
    }

    return c.JSON(post)
}

// Update post by ID
func UpdatePost(c *fiber.Ctx) error {
    user := c.Locals("user").(*fiber.JWTClaims)
    userID := uint(user["user_id"].(float64))

    id := c.Params("id")
    var post database.Post

    if err := database.DB.First(&post, id).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Post not found"})
    }

    // Only author can update
    if post.AuthorID != userID {
        return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "You cannot update this post"})
    }

    var body PostRequest
    if err := c.BodyParser(&body); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
    }

    post.Title = body.Title
    post.Content = body.Content

    if err := database.DB.Save(&post).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update post"})
    }

    return c.JSON(post)
}

// Delete post by ID
func DeletePost(c *fiber.Ctx) error {
    user := c.Locals("user").(*fiber.JWTClaims)
    userID := uint(user["user_id"].(float64))

    id := c.Params("id")
    var post database.Post

    if err := database.DB.First(&post, id).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Post not found"})
    }

    if post.AuthorID != userID {
        return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "You cannot delete this post"})
    }

    if err := database.DB.Delete(&post).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete post"})
    }

    return c.JSON(fiber.Map{"message": "Post deleted"})
}
