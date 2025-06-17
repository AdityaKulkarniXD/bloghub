'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LoadingPage } from '@/components/ui/loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth: boolean;
}

export default function ProtectedRoute({ children, requireAuth }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push('/login');
      } else if (!requireAuth && isAuthenticated) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (requireAuth && !isAuthenticated) {
    return <LoadingPage />;
  }

  if (!requireAuth && isAuthenticated) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}