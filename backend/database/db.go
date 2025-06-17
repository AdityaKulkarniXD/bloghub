package database

import (
	"fmt"
	"log"

	"github.com/AdityaKulkarniXD/bloghub/backend/config"
	"github.com/AdityaKulkarniXD/bloghub/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := config.DB_URL
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	DB = db
	fmt.Println("Database connected!")

	// Auto migrate
	DB.AutoMigrate(&models.User{}, &models.Post{})
}
