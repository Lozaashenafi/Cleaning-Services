'use client'

import { useState } from 'react';
import { UserListClient } from './UserListClient';
import { AddUserModal } from './AddUserModal';
import { Plus } from 'lucide-react';

export default function AdminUsersClient({ initialUsers, currentAdminId }: { initialUsers: any[], currentAdminId: string }) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-4 md:px-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Team Management</h1>
          <p className="text-slate-500 mt-1">Manage admin permissions and team access.</p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#1d82e6] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#1669ba] shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          <Plus size={20} /> <span className="hidden md:inline">Add New Admin</span>
        </button>
      </div>

      {/* Pass data to the list. Added fallback [] to prevent .map() error */}
      <UserListClient initialUsers={initialUsers || []} currentAdminId={currentAdminId} />

      {showAddModal && <AddUserModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}