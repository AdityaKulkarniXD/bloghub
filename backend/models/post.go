package database

import (
    "gorm.io/gorm"
)

type Post struct {
    gorm.Model
    Title    string `json:"title" gorm:"not null"`
    Content  string `json:"content" gorm:"type:text;not null"`
    AuthorID uint   `json:"authorId" gorm:"not null"` // foreign key to users
}
