'use client';

import { updateCompanyConfigs } from '../../../app/(admin)/admin/actions';
import { toast } from 'sonner';
import { 
  Save, 
  Phone, 
  MapPin, 
  Clock, 
  Globe 
} from 'lucide-react';

// --- Custom Brand Icons (SVG) ---
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
);

export default function CompanyForm({ initialData }: { initialData: any }) {
  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    try {
      await updateCompanyConfigs(data);
      toast.success('Settings updated successfully!');
    } catch {
      toast.error('Failed to update settings');
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8 max-w-5xl pb-24">
      
      {/* 1. Contact Info Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800">
          <div className="p-2 bg-blue-50 rounded-xl text-[#1d82e6]">
            <Phone size={22} />
          </div>
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Phone Number</label>
            <input name="phone" defaultValue={initialData?.phone} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Email Address</label>
            <input name="email" defaultValue={initialData?.email} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Address</label>
            <input name="address" defaultValue={initialData?.address} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* 2. Brand Content Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl text-[#1d82e6]">
                <Globe size={22} />
            </div>
            Brand Story
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Our Mission</label>
            <textarea name="mission" defaultValue={initialData?.mission} rows={3} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">About Us Story</label>
            <textarea name="story" defaultValue={initialData?.story} rows={6} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none" />
          </div>
        </div>
      </div>

      {/* 3. Social Media Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-800">Social Connections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
             <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                <FacebookIcon />
             </div>
             <input name="facebookUrl" defaultValue={initialData?.facebookUrl} placeholder="Facebook Link" className="bg-transparent flex-1 outline-none text-sm" />
          </div>

          <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                <InstagramIcon />
             </div>
             <input name="instagramUrl" defaultValue={initialData?.instagramUrl} placeholder="Instagram Link" className="bg-transparent flex-1 outline-none text-sm" />
          </div>

          <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
             <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shrink-0">
                <TwitterIcon />
             </div>
             <input name="twitterUrl" defaultValue={initialData?.twitterUrl} placeholder="Twitter / X Link" className="bg-transparent flex-1 outline-none text-sm" />
          </div>

          <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
             <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0">
                <TikTokIcon />
             </div>
             <input name="tiktokUrl" defaultValue={initialData?.tiktokUrl} placeholder="TikTok Link" className="bg-transparent flex-1 outline-none text-sm" />
          </div>

        </div>
      </div>

      {/* Save Button */}
      <button type="submit" className="w-full bg-[#1d82e6] text-white font-bold py-5 rounded-[2.5rem] shadow-xl shadow-blue-200 hover:bg-[#1669ba] transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
        <Save size={22} />
        Update All Company Info
      </button>

    </form>
  );
}