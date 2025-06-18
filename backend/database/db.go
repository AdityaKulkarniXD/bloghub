package database

import (
    "fmt"
    "log"
    "os"

    "github.com/joho/godotenv"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"

    "github.com/AdityaKulkarniXD/bloghub/backend/models"
)

var DB *gorm.DB

func ConnectDB() {
    godotenv.Load()

    dbHost := os.Getenv("DB_HOST")
    dbPort := os.Getenv("DB_PORT")
    dbUser := os.Getenv("DB_USER")
    dbPassword := os.Getenv("DB_PASSWORD")
    dbName := os.Getenv("DB_NAME")

    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        dbHost, dbUser, dbPassword, dbName, dbPort)

    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("❌ Failed to connect to database: %v", err)
    }

    err = DB.AutoMigrate(&models.User{}, &models.Post{})
    if err != nil {
        log.Fatalf("❌ Failed to migrate database: %v", err)
    }

    fmt.Println("✅ Database connected & migrated successfully!")
}
