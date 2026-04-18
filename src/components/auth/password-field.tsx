'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function PasswordField() {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-semibold text-slate-700" htmlFor="password">
          Password
        </label>
        <button type="button" className="text-sm text-[#1d82e6] hover:underline">
          Forgot password?
        </button>
      </div>
      <div className="relative">
        <input 
          name="password" 
          id="password" 
          type={show ? "text" : "password"} 
          placeholder="••••••••"
          required 
          className="w-full p-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d82e6]/20 focus:border-[#1d82e6] transition-all"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}