package config

import "os"

var (
	DB_URL    = os.Getenv("DATABASE_URL") // "postgres://user:password@localhost:5432/bloghub"
	JWT_SECRET = []byte("supersecretkey") // should be env var in production
)
