package database

import (
    "fmt"
    "log"
    "os"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
    dsn := os.Getenv("DATABASE_URL")
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    DB = db
    fmt.Println("Database connected successfully!")

    // Migrate models here to create tables automatically
    MigrateModels()
}

func MigrateModels() {
    // Import your models here to migrate
    err := DB.AutoMigrate(&User{}, &Post{})
    if err != nil {
        log.Fatal("Failed to migrate database models:", err)
    }
}
