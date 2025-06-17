'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import MarkdownEditor from '@/components/editor/MarkdownEditor';
import { postsAPI } from '@/lib/api';
import { calculateReadingTime, extractExcerpt } from '@/lib/utils';
import { toast } from 'sonner';
import { LoadingPage } from '@/components/ui/loading';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function EditPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getPost(postId);
      const post = response.data.post;
      
      setTitle(post.title);
      setContent(post.content);
      setTags(post.tags || []);
    } catch (error: any) {
      toast.error('Failed to fetch post');
      router.push('/dashboard');
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    setIsLoading(true);
    try {
      const postData = {
        title: title.trim(),
        content: content.trim(),
        excerpt: extractExcerpt(content),
        tags,
        readingTime: calculateReadingTime(content),
      };

      await postsAPI.updatePost(postId, postData);
      toast.success('Post updated successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return <LoadingPage />;
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Edit Post
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Make changes to your post and save them
            </p>
          </div>

          <MarkdownEditor
            title={title}
            content={content}
            tags={tags}
            onTitleChange={setTitle}
            onContentChange={setContent}
            onTagsChange={setTags}
            onSave={handleSave}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}