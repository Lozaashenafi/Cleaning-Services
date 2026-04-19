'use client';

import { useState } from "react";
import { toast } from "sonner";
import { submitContactForm } from "../../../app/(admin)/admin/actions";
import { Loader2, Send } from "lucide-react";

export default function ContactForm({ services }: { services: string[] }) {
  const [loading, setLoading] = useState(false);

  async function action(formData: FormData) {
    setLoading(true);
    try {
      await submitContactForm(formData);
      toast.success("Quote Request Submitted!", {
        description: "We'll get back to you within 24 hours."
      });
      (document.getElementById("contact-form") as HTMLFormElement).reset();
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="contact-form" action={action} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Full Name *</label>
          <input name="name" required className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#1d82e6] outline-none transition-all" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Phone Number *</label>
          <input name="phone" type="tel" required className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#1d82e6] outline-none transition-all" placeholder="(123) 456-7890" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Email Address *</label>
          <input name="email" type="email" required className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#1d82e6] outline-none transition-all" placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Location *</label>
          <input name="location" required className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#1d82e6] outline-none transition-all" placeholder="City, State or Zip" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Type of Cleaning *</label>
          <select name="type" required className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#1d82e6] outline-none transition-all">
            <option value="">Select a service</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Size / Sq Ft</label>
          <input name="size" className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#1d82e6] outline-none transition-all" placeholder="e.g. 2,500 sq ft" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Preferred Date</label>
          <input name="date" type="datetime-local" className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#1d82e6] outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Frequency</label>
          <select name="frequency" className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#1d82e6] outline-none transition-all">
            <option value="one-time">One-Time</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Additional Notes</label>
        <textarea name="notes" rows={4} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#1d82e6] outline-none transition-all" placeholder="Specific requirements..." />
      </div>

      <button disabled={loading} type="submit" className="w-full bg-[#1d82e6] text-white font-bold py-5 rounded-[2rem] hover:bg-[#1669ba] shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
        {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
        {loading ? "Submitting..." : "Submit Quote Request"}
      </button>
    </form>
  );
}