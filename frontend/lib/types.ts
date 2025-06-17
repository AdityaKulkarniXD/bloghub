export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  readingTime?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface PostFilters {
  search?: string;
  tags?: string;
  page?: number;
  limit?: number;
}