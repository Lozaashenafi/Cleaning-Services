'use client'

import { useState } from 'react';
import { updateUserPassword } from '../../../app/(admin)/admin/actions';
import { toast } from 'sonner';
import { X, KeyRound, Loader2, Save } from 'lucide-react';

export function ResetPasswordModal({ userId, userEmail, onClose }: { userId: string, userEmail: string, onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await updateUserPassword(userId, formData);
      toast.success(`Password updated for ${userEmail}`);
      onClose();
    } catch (e: any) {
      toast.error(e.message || 'Failed to update password');
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
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
            <KeyRound size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>
          <p className="text-slate-500 text-sm mt-1">Set a new password for <span className="font-bold text-slate-700">{userEmail}</span></p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">New Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              minLength={6} 
              autoFocus
              className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-amber-100 transition-all" 
              placeholder="Enter new password" 
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            Save New Password
          </button>
        </form>
      </div>
    </div>
  );
}