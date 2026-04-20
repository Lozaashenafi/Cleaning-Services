'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Package, 
  Inbox, 
  Menu, 
  X,
  LogOut, 
  ImageIcon
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  {name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  {name: 'company Info', href: '/admin/settings', icon: Briefcase },
  { name: 'Users', href: '/admin/users', icon: Briefcase },
  { name: 'Submissions', href: '/admin/submissions', icon: Inbox },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Packages', href: '/admin/packages', icon: Package },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1d82e6] text-white rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-2 mb-10 px-2">
            <div className="bg-[#1d82e6] text-white font-bold w-8 h-8 rounded flex items-center justify-center">SC</div>
            <span className="text-xl font-bold text-slate-800">Covenant clean co</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    active 
                      ? 'bg-blue-50 text-[#1d82e6] font-bold' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-600 transition-colors mt-auto">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}