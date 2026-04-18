'use client'

import * as Icons from 'lucide-react';
import { useState } from 'react';

// Curated list of icons relevant to cleaning services
const ICON_LIST = [
  'Building', 'Building2', 'Home', 'Warehouse', 'Sparkles', 
  'ShieldCheck', 'Wind', 'Waves', 'Droplets', 'Trash2', 
  'GlassWater', 'Zap', 'Brush', 'Fan', 'Sun'
];

export function IconPicker({ selected, onChange }: { selected: string, onChange: (name: string) => void }) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-slate-700">Select Service Icon</label>
      <div className="grid grid-cols-5 gap-2 p-4 border border-slate-200 rounded-2xl bg-slate-50">
        {ICON_LIST.map((iconName) => {
          const LucideIcon = (Icons as any)[iconName];
          const isActive = selected === iconName;

          return (
            <button
              key={iconName}
              type="button"
              onClick={() => onChange(iconName)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-[#1d82e6] text-white shadow-md scale-105' 
                  : 'bg-white text-slate-400 hover:text-[#1d82e6] border border-transparent hover:border-blue-200'
              }`}
            >
              <LucideIcon size={24} />
              <span className="text-[10px] mt-1 font-medium truncate w-full text-center">
                {iconName}
              </span>
            </button>
          );
        })}
      </div>
      {/* Hidden input to ensure the value is sent with standard Form Data if needed */}
      <input type="hidden" name="iconName" value={selected} />
    </div>
  );
}