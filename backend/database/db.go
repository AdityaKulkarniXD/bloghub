package database

import (
	"fmt"
	"log"
	"os"

	"github.com/AdityaKulkarniXD/bloghub/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dbURL := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	DB = db

	err = DB.AutoMigrate(&models.User{}, &models.Post{})
	if err != nil {
		log.Fatal("Failed to auto-migrate: ", err)
	}

	fmt.Println("Database connected and migrated!")
}
