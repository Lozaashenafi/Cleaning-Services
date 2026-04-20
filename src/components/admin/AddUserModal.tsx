'use client'

import { useState } from 'react';
import { createNewAdmin } from '../../../app/(admin)/admin/actions';
import { toast } from 'sonner';
import { X, UserPlus, Loader2 } from 'lucide-react';

export function AddUserModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await createNewAdmin(formData);
      toast.success('User created successfully');
      onClose();
    } catch (e: any) {
      toast.error(e.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <UserPlus className="text-[#1d82e6]" /> Add Team Member
          </h2>
          <p className="text-slate-500 text-sm mt-1">This user will be able to log in immediately.</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Email Address</label>
            <input name="email" type="email" required className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-100" placeholder="staff@covenantclean.com" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Temporary Password</label>
            <input name="password" type="password" required minLength={6} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Minimum 6 chars" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Account Role</label>
            <select name="role" className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none">
              <option value="admin">Administrator (Full Access)</option>
              <option value="user">Standard User (View Only)</option>
            </select>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#1d82e6] text-white font-bold py-4 rounded-2xl hover:bg-[#1669ba] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={20} />}
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}