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
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("❌ DATABASE_URL is not set in the environment")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}

	// Auto-migrate the models
	err = db.AutoMigrate(&models.User{}, &models.Post{})
	if err != nil {
		log.Fatalf("❌ Failed to migrate models: %v", err)
	}

	fmt.Println("✅ Database connected and models migrated")
	DB = db
}
