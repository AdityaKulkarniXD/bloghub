'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Post, PostFilters } from '@/lib/types';
import { postsAPI } from '@/lib/api';
import PostCard from './PostCard';
import { LoadingCard } from '@/components/ui/loading';
import { motion } from 'framer-motion';

const POPULAR_TAGS = ['Technology', 'Design', 'Programming', 'Lifestyle', 'Travel', 'Business'];

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PostFilters>({
    search: '',
    tags: '',
    page: 1,
    limit: 12,
  });
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPosts = async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await postsAPI.getPosts(filters);
      const newPosts = response.data.posts;

      if (isLoadMore) {
        setPosts(prev => [...prev, ...newPosts]);
      } else {
        setPosts(newPosts);
      }

      setHasMore(newPosts.length === filters.limit);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filters.search, filters.tags]);

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value, page: 1 }));
  };

  const handleTagSelect = (tag: string) => {
    setFilters(prev => ({ 
      ...prev, 
      tags: prev.tags === tag ? '' : tag, 
      page: 1 
    }));
  };

  const loadMore = () => {
    setFilters(prev => ({ ...prev, page: prev.page! + 1 }));
    fetchPosts(true);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search posts..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <Filter className="w-4 h-4" />
            Filter by tag:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={filters.tags === tag ? 'default' : 'secondary'}
              className="cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
              onClick={() => handleTagSelect(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 dark:text-gray-400">No posts found matching your criteria.</p>
        </motion.div>
      )}

      {/* Load More */}
      {hasMore && posts.length > 0 && (
        <div className="text-center">
          <Button
            onClick={loadMore}
            disabled={loadingMore}
            variant="outline"
            className="min-w-32"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}