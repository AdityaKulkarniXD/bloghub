'use client';

import { useState } from 'react';
import { Eye, EyeOff, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  title: string;
  content: string;
  tags: string[];
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onTagsChange: (tags: string[]) => void;
  onSave: () => void;
  isLoading?: boolean;
  className?: string;
}

export default function MarkdownEditor({
  title,
  content,
  tags,
  onTitleChange,
  onContentChange,
  onTagsChange,
  onSave,
  isLoading = false,
  className,
}: MarkdownEditorProps) {
  const [tagInput, setTagInput] = useState('');
  const [activeTab, setActiveTab] = useState('write');

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Title Input */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter post title..."
          className="text-lg font-semibold"
        />
      </div>

      {/* Tags Input */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="space-y-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tags (press Enter to add)..."
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Content</Label>
          <Button
            onClick={onSave}
            disabled={isLoading || !title.trim() || !content.trim()}
            className="min-w-24"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Post
              </>
            )}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="write" className="flex items-center gap-2">
              <EyeOff className="w-4 h-4" />
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="write" className="mt-4">
            <Textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Write your post content in Markdown..."
              className="min-h-[500px] font-mono text-sm"
            />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <div className="border rounded-lg p-6 min-h-[500px] bg-white dark:bg-gray-800">
              {content ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  Nothing to preview yet. Start writing your post!
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}