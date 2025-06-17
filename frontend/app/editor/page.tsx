'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import MarkdownEditor from '@/components/editor/MarkdownEditor';
import { postsAPI } from '@/lib/api';
import { calculateReadingTime, generateSlug, extractExcerpt } from '@/lib/utils';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function EditorPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        slug: generateSlug(title),
        tags,
        readingTime: calculateReadingTime(content),
        published: true,
      };

      await postsAPI.createPost(postData);
      toast.success('Post created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

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
              Create New Post
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Share your thoughts and ideas with the world
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