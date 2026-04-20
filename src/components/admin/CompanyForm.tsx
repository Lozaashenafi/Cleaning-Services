'use client';

import { useState } from 'react';
import { updateCompanyConfigs } from '../../../app/(admin)/admin/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { 
  Save, Phone, MapPin, Clock, Globe, 
  Building2, Plus, X, Star 
} from 'lucide-react';

const FacebookIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const InstagramIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const TwitterIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-94 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const TikTokIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;

export default function CompanyForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Manage the dynamic "Values" array state
  const [values, setValues] = useState<string[]>(initialData?.values || []);

  const addValue = () => setValues([...values, '']);
  const removeValue = (index: number) => setValues(values.filter((_, i) => i !== index));
  const updateValue = (index: number, text: string) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      workingHours: formData.get('workingHours'),
      mission: formData.get('mission'),
      story: formData.get('story'),
      facebookUrl: formData.get('facebookUrl'),
      instagramUrl: formData.get('instagramUrl'),
      twitterUrl: formData.get('twitterUrl'),
      tiktokUrl: formData.get('tiktokUrl'),
      values: values.filter(v => v.trim() !== ''), // Only send non-empty values
    };

    try {
      await updateCompanyConfigs(data);
      toast.success('All settings saved and live!');
      router.refresh(); // This forces the page to stay updated with new data
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8 max-w-5xl pb-24">
      
      {/* 1. Identity & Contact */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800">
          <div className="p-2 bg-blue-50 rounded-xl text-[#1d82e6]">
            <Building2 size={22} />
          </div>
          Company Identity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Company Name</label>
            <input name="name" defaultValue={initialData?.name} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Phone Number</label>
            <input name="phone" defaultValue={initialData?.phone} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Email Address</label>
            <input name="email" defaultValue={initialData?.email} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none transition-all" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Physical Address</label>
            <input name="address" defaultValue={initialData?.address} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none transition-all" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1 flex items-center gap-1">
                <Clock size={12}/> Working Hours
            </label>
            <input name="workingHours" defaultValue={initialData?.workingHours} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* 2. Brand Content */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl text-[#1d82e6]">
                <Globe size={22} />
            </div>
            Brand Story & Mission
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Our Mission Statement</label>
            <textarea name="mission" defaultValue={initialData?.mission} rows={3} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Full Company Story</label>
            <textarea name="story" defaultValue={initialData?.story} rows={6} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* 3. Core Values (ARRAY FIELD) */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl text-[#1d82e6]">
                    <Star size={22} />
                </div>
                Core Values
            </h2>
            <button type="button" onClick={addValue} className="text-[#1d82e6] text-xs font-bold bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all flex items-center gap-1">
                <Plus size={14}/> Add Value
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((val, idx) => (
                <div key={idx} className="flex items-center gap-2 group">
                    <input 
                        value={val} 
                        onChange={(e) => updateValue(idx, e.target.value)}
                        placeholder="e.g. Integrity first"
                        className="flex-1 p-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white outline-none transition-all"
                    />
                    <button type="button" onClick={() => removeValue(idx)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                        <X size={18} />
                    </button>
                </div>
            ))}
        </div>
      </div>

      {/* 4. Social Media */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-800">Social Connections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SocialInput name="facebookUrl" icon={<FacebookIcon />} color="bg-blue-600" defaultValue={initialData?.facebookUrl} placeholder="Facebook Link" />
          <SocialInput name="instagramUrl" icon={<InstagramIcon />} color="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600" defaultValue={initialData?.instagramUrl} placeholder="Instagram Link" />
          <SocialInput name="twitterUrl" icon={<TwitterIcon />} color="bg-black" defaultValue={initialData?.twitterUrl} placeholder="Twitter / X Link" />
          <SocialInput name="tiktokUrl" icon={<TikTokIcon />} color="bg-slate-900" defaultValue={initialData?.tiktokUrl} placeholder="TikTok Link" />
        </div>
      </div>

      {/* Persistent Save Button */}
      <button 
        disabled={loading}
        type="submit" 
        className="w-full bg-[#1d82e6] text-white font-bold py-5 rounded-[2.5rem] shadow-xl shadow-blue-200 hover:bg-[#1669ba] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
      >
        <Save size={22} />
        {loading ? 'Saving Changes...' : 'Update All Company Info'}
      </button>

    </form>
  );
}

function SocialInput({ name, icon, color, defaultValue, placeholder }: any) {
    return (
        <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-50 transition-all">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white shrink-0`}>
                {icon}
            </div>
            <input 
                name={name} 
                defaultValue={defaultValue} 
                placeholder={placeholder} 
                className="bg-transparent flex-1 outline-none text-sm" 
            />
        </div>
    )
}