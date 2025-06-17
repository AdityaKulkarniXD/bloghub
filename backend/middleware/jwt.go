package middleware

import (
    "os"
    "time"

    "github.com/gofiber/fiber/v2"
    jwtware "github.com/gofiber/jwt/v3"
    "github.com/golang-jwt/jwt/v5"
)

func JwtMiddleware() fiber.Handler {
    return jwtware.New(jwtware.Config{
        SigningKey:   []byte(os.Getenv("JWT_SECRET")),
        ContextKey:   "user",
        SigningMethod: "HS256",
        TokenLookup:  "header:Authorization",
        AuthScheme:   "Bearer",
    })
}

// Helper to generate JWT token
func GenerateJWT(userID uint) (string, error) {
    claims := jwt.MapClaims{
        "user_id": userID,
        "exp":     time.Now().Add(time.Hour * 72).Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
