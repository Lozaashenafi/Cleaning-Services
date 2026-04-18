'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function AuthToast({ error, message }: { error?: string; message?: string }) {
  useEffect(() => {
    if (error) {
      toast.error('Authentication Error', {
        description: error,
      });
    }
    if (message) {
      toast.success('Success', {
        description: message,
      });
    }
  }, [error, message]);

  return null;
}