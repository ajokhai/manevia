'use client';

import { useUserStore } from '@/store/userStore';
import { XCircle } from 'lucide-react';

export default function ImpersonationBanner() {
  const { impersonatedUser, stopImpersonating } = useUserStore();

  if (!impersonatedUser) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-between z-50 sticky top-0">
      <div className="flex items-center space-x-2 text-sm font-medium mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <span>
          <strong className="uppercase mr-2">Admin Mode:</strong> 
          You are currently impersonating <span className="font-bold underline">{impersonatedUser.name}</span> ({impersonatedUser.email}).
        </span>
        <button 
          onClick={stopImpersonating}
          className="ml-auto bg-white text-red-600 px-3 py-1 rounded text-xs font-bold hover:bg-red-50 flex items-center transition"
        >
          <XCircle size={14} className="mr-1" />
          Stop Impersonating
        </button>
      </div>
    </div>
  );
}
