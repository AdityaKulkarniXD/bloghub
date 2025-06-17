'use client';

import Link from 'next/link';
import { PenTool, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <PenTool className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                BlogHub
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A modern blogging platform for writers and readers to connect, share, and discover amazing content.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?tags=technology" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/?tags=design" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/?tags=lifestyle" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/?tags=travel" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Travel
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@bloghub.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} BlogHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}