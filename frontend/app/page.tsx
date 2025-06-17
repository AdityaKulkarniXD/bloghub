'use client';

import { motion } from 'framer-motion';
import { PenTool, Users, BookOpen, Zap, Sparkles, Heart, Star, ArrowRight } from 'lucide-react';
import PostList from '@/components/blog/PostList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 py-16"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                BlogHub
              </span>
            </h1>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 text-yellow-400"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-4 text-pink-400"
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 6, repeat: Infinity, ease: 'linear' }
              }}
            >
              <Heart className="w-6 h-6" />
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Discover amazing stories, share your thoughts, and connect with writers from around the world in our 
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-semibold"> vibrant community</span>.
          </motion.p>
        </div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg"
              asChild
            >
              <Link href="/register">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Writing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-8 py-4 text-lg backdrop-blur-sm"
              asChild
            >
              <Link href="#posts">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Posts
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: PenTool,
            title: "Easy Writing",
            description: "Write and publish your stories with our intuitive markdown editor",
            color: "from-blue-500 to-cyan-500",
            bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
          },
          {
            icon: Users,
            title: "Community",
            description: "Connect with like-minded writers and readers in our vibrant community",
            color: "from-green-500 to-emerald-500",
            bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
          },
          {
            icon: BookOpen,
            title: "Discover",
            description: "Explore diverse content across various topics and genres",
            color: "from-purple-500 to-pink-500",
            bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`text-center space-y-4 p-8 rounded-2xl bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 group`}
          >
            <motion.div 
              className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center py-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10K+", label: "Writers", icon: Users },
            { number: "50K+", label: "Stories", icon: BookOpen },
            { number: "1M+", label: "Readers", icon: Heart },
            { number: "100+", label: "Topics", icon: Star }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, type: 'spring', stiffness: 100 }}
              className="space-y-2"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.5 
                }}
              >
                <stat.icon className="w-8 h-8 mx-auto text-purple-500 mb-2" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Posts Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        id="posts"
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Latest Posts
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest stories from our amazing community of writers
          </p>
        </div>
        
        <PostList />
      </motion.section>
    </div>
  );
}