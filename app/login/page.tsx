import { login } from '../auth/actions'
import { AuthToast } from '@/components/auth/auth-toast'
import { PasswordField } from '@/components/auth/password-field';
import Link from 'next/link'

export default async function LoginPage(props: { 
  searchParams: Promise<{ message?: string; error?: string }> 
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Toast Listener */}
      <AuthToast error={searchParams.error} message={searchParams.message} />

      <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header matching SparkClean logo style */}
        <div className="bg-white p-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="bg-[#1d82e6] text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center text-xl">
              SC
            </div>
            <span className="text-2xl font-bold text-slate-800">SparkClean</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Enter your credentials to access your account</p>
        </div>

        <form className="p-8 pt-4 flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="email">
              Email Address
            </label>
            <input 
              name="email" 
              id="email" 
              type="email" 
              placeholder="name@company.com"
              required 
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d82e6]/20 focus:border-[#1d82e6] transition-all"
            />
          </div>

          <PasswordField />

          <div className="flex flex-col gap-3 mt-4">
            <button 
              formAction={login} 
              className="w-full bg-[#1d82e6] text-white font-bold py-3.5 rounded-xl hover:bg-[#1669ba] transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
            >
              Sign In
            </button>
           
          </div>
        </form>

       
      </div>

      <Link href="/" className="mt-8 text-slate-500 hover:text-[#1d82e6] flex items-center gap-2 transition-colors">
        ← Back to home
      </Link>
    </div>
  )
}