'use client'

import { useState } from 'react';
import { 
  Shield, 
  Trash2, 
  AlertCircle, 
  ShieldCheck, 
  ShieldAlert, 
  KeyRound,
  Mail,
  User as UserIcon
} from 'lucide-react';
import { updateUserRole, deleteUserAccount } from '../../../app/(admin)/admin/actions';
import { toast } from 'sonner';
import { ResetPasswordModal } from './ResetPasswordModal';

export function UserListClient({ 
  initialUsers, 
  currentAdminId 
}: { 
  initialUsers: any[], 
  currentAdminId: string 
}) {
  const [users, setUsers] = useState(initialUsers || []);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [resettingUser, setResettingUser] = useState<{id: string, email: string} | null>(null);

  async function handleToggleRole(userId: string, currentRole: string) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const toastId = toast.loading(`Updating permissions...`);
    try {
      await updateUserRole(userId, newRole);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(`User updated to ${newRole}`, { id: toastId });
    } catch {
      toast.error('Failed to change role', { id: toastId });
    }
  }

  async function handleDelete() {
    if (!isDeleting) return;
    const id = isDeleting;
    const toastId = toast.loading("Deleting account...");
    setIsDeleting(null);
    try {
      await deleteUserAccount(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success('Account deleted', { id: toastId });
    } catch {
      toast.error('Error deleting account', { id: toastId });
    }
  }

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-xs font-black uppercase text-slate-400 tracking-widest">Team Member</th>
              <th className="px-8 py-5 text-xs font-black uppercase text-slate-400 tracking-widest">Access Level</th>
              <th className="px-8 py-5 text-xs font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => {
              const isMe = user.id === currentAdminId;
              
              return (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                        user.role === 'admin' ? 'bg-blue-100 text-[#1d82e6]' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 flex items-center gap-2">
                          {user.email}
                          {isMe && (
                            <span className="text-[10px] bg-[#1d82e6] text-white px-2 py-0.5 rounded-full uppercase font-black">You</span>
                          )}
                        </p>
                        <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                          <Mail size={12} />
                          <span>ID: {user.id.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                      user.role === 'admin' ? 'bg-blue-50 text-[#1d82e6]' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {user.role === 'admin' ? <ShieldCheck size={12} /> : <UserIcon size={12} />}
                      {user.role}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      
                      {/* 1. Reset Password - ALWAYS AVAILABLE */}
                      <button 
                        onClick={() => setResettingUser({ id: user.id, email: user.email })}
                        className="p-3 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-2xl transition-all"
                        title="Change Password"
                      >
                        <KeyRound size={20} />
                      </button>

                      {/* 2. Role & Delete - HIDDEN FOR "ME" FOR SAFETY */}
                      {!isMe && (
                        <>
                          <button 
                            onClick={() => handleToggleRole(user.id, user.role)}
                            className="p-3 text-slate-400 hover:text-[#1d82e6] hover:bg-blue-50 rounded-2xl transition-all"
                            title="Change Access Level"
                          >
                            {user.role === 'admin' ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
                          </button>

                          <button 
                            onClick={() => setIsDeleting(user.id)}
                            className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                            title="Delete Account"
                          >
                            <Trash2 size={20} />
                          </button>
                        </>
                      )}

                      {isMe && (
                        <span className="text-[10px] text-slate-300 font-bold px-2 uppercase tracking-tighter">
                          System Owner
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl">
             <h3 className="text-2xl font-bold text-slate-800 mb-6">Delete Member?</h3>
             <div className="flex gap-3">
               <button onClick={() => setIsDeleting(null)} className="flex-1 py-4 border rounded-2xl font-bold">Cancel</button>
               <button onClick={handleDelete} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold">Delete</button>
             </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resettingUser && (
        <ResetPasswordModal 
          userId={resettingUser.id}
          userEmail={resettingUser.email}
          onClose={() => setResettingUser(null)}
        />
      )}
    </div>
  );
}