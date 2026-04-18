'use client'

import { useState } from 'react'
import { upsertTestimonial } from '../../../app/(admin)/admin/actions'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Star } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function TestimonialForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [rating, setRating] = useState(initialData?.rating || 5)

  async function handleSubmit(formData: FormData) {
    const data = {
      id: initialData?.id,
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      text: formData.get('text') as string,
      rating: rating,
    }

    try {
      await upsertTestimonial(data)
      toast.success(initialData ? 'Testimonial updated' : 'Testimonial added')
      router.push('/admin/testimonials')
      router.refresh()
    } catch (e) {
      toast.error('Error saving testimonial')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/testimonials" className="flex items-center gap-2 text-slate-500 mb-6 font-medium">
        <ArrowLeft size={20} /> Back
      </Link>

      <form action={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Customer Feedback</h2>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Customer Name</label>
          <input name="name" required defaultValue={initialData?.name} className="w-full p-4 rounded-xl border border-slate-200" placeholder="e.g. Sarah Johnson" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Customer Role / Title</label>
          <input name="role" required defaultValue={initialData?.role} className="w-full p-4 rounded-xl border border-slate-200" placeholder="e.g. Homeowner or Business Manager" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-2 rounded-lg transition-all ${rating >= star ? 'text-yellow-400' : 'text-slate-200'}`}
              >
                <Star size={32} fill={rating >= star ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">The Review</label>
          <textarea name="text" required rows={5} defaultValue={initialData?.text} className="w-full p-4 rounded-xl border border-slate-200" placeholder="What did they say about your service?" />
        </div>

        <button type="submit" className="w-full bg-[#1d82e6] text-white font-bold py-4 rounded-2xl hover:bg-[#1669ba] flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
          <Save size={20} /> {initialData ? 'Update Testimonial' : 'Publish Testimonial'}
        </button>
      </form>
    </div>
  )
}