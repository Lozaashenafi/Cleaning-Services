'use client';

import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Calendar, 
  Maximize, Repeat, DollarSign, Trash2, 
  CheckCircle2, Clock, AlertCircle, ChevronDown
} from 'lucide-react';
import { updateSubmissionStatus, deleteSubmission } from '../../../app/(admin)/admin/actions';
import { toast } from 'sonner';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-600',
  contacted: 'bg-amber-100 text-amber-600',
  quoted: 'bg-purple-100 text-purple-600',
  booked: 'bg-emerald-100 text-emerald-600',
  completed: 'bg-slate-100 text-slate-400',
  cancelled: 'bg-red-100 text-red-600',
};

export function SubmissionsListClient({ initialData }: { initialData: any[] }) {
  const [list, setList] = useState(initialData);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      await updateSubmissionStatus(id, newStatus);
      setList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    }
  }

  async function handleDelete() {
    if (!isDeleting) return;
    const id = isDeleting;
    setIsDeleting(null);
    try {
      await deleteSubmission(id);
      setList(prev => prev.filter(item => item.id !== id));
      toast.success('Inquiry deleted');
    } catch {
      toast.error('Failed to delete');
    }
  }

  return (
    <div className="space-y-4 pb-20">
      {list.map((sub) => (
        <div key={sub.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden group">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              {/* Basic Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{sub.fullName}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${STATUS_COLORS[sub.status] || 'bg-slate-100'}`}>
                    {sub.status}
                  </span>
                </div>
                <p className="text-[#1d82e6] font-bold text-sm uppercase tracking-tight">
                  {sub.cleaningType}
                </p>
              </div>

              {/* Status Switcher & Delete */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <select 
                  value={sub.status}
                  onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                  className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="booked">Booked</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button 
                    onClick={() => setIsDeleting(sub.id)}
                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {/* Inquiry Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailItem icon={Mail} label="Email" value={sub.email} href={`mailto:${sub.email}`} />
              <DetailItem icon={Phone} label="Phone" value={sub.phone} href={`tel:${sub.phone}`} />
              <DetailItem icon={MapPin} label="Location" value={sub.location} />
              
              {sub.size && <DetailItem icon={Maximize} label="Size" value={sub.size} />}
              {sub.preferredDate && <DetailItem icon={Calendar} label="Preferred Date" value={new Date(sub.preferredDate).toLocaleString()} />}
              {sub.frequency && <DetailItem icon={Repeat} label="Frequency" value={sub.frequency} />}
              {sub.budget && <DetailItem icon={DollarSign} label="Budget" value={sub.budget} />}
            </div>

            {sub.notes && (
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Customer Notes</p>
                <p className="text-slate-600 italic">"{sub.notes}"</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle size={28} />
              <h3 className="text-xl font-bold">Delete Inquiry?</h3>
            </div>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              This will permanently remove {list.find(l => l.id === isDeleting)?.fullName}'s request from the system.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleting(null)} className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-slate-500">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-100">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon: Icon, label, value, href }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-[#1d82e6]"><Icon size={16} /></div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-bold text-slate-700 hover:text-[#1d82e6] truncate block">{value}</a>
        ) : (
          <p className="text-sm font-bold text-slate-700 truncate">{value}</p>
        )}
      </div>
    </div>
  );
}