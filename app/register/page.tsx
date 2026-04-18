'use client';

import { signup } from '../auth/actions'; // Use the action we created earlier
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join Covenant Clean Co</p>
        </div>
        <form action={signup} className="mt-8 space-y-6">
          <div className="space-y-4 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input name="email" type="email" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input name="password" type="password" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none" />
            </div>
          </div>
          <button type="submit" className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none">
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">Log In</Link>
        </p>
      </div>
    </div>
  );
}