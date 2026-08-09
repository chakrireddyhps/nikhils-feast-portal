'use client'
import { Bell, Calendar, ChevronDown } from 'lucide-react'
import { Sidebar } from './Sidebar'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':   'Dashboard',
  '/orders':      'Orders',
  '/menu':        'Menu Management',
  '/ingredients': 'Ingredients & Stock',
  '/purchases':   'Stock Purchases',
  '/wastage':     'Wastage',
  '/recipes':     'Recipes / BOM',
  '/expenses':    'Expenses',
  '/pnl':         'Profit & Loss',
  '/reports':     'Reports',
  '/settings':    'Settings',
}

export function AdminShell({ children, pathname }: { children: React.ReactNode; pathname: string }) {
  const title = PAGE_TITLES[pathname] || 'Admin'

  return (
    <div className="min-h-screen" style={{ background: '#0F0B0A', color: '#F5EFE6', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar/>

      {/* Topbar */}
      <header className="fixed top-0 right-0 z-20 lg:left-60 left-0 h-[60px] flex items-center px-6 gap-4"
        style={{
          background: 'rgba(15,11,10,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
        <div className="flex-1">
          <h2 className="text-white font-bold text-[15px] tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer"
            style={{ background: '#1C1412', border: '1px solid rgba(255,255,255,0.07)' }}>
            <Calendar className="w-3.5 h-3.5" style={{ color: '#7A6A63' }}/>
            <span className="text-xs font-semibold" style={{ color: '#B8A99E', letterSpacing: '-0.01em' }}>Jan 14, 2024</span>
            <ChevronDown className="w-3 h-3" style={{ color: '#7A6A63' }}/>
          </div>
          <div className="relative w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer"
            style={{ background: '#1C1412', border: '1px solid rgba(255,255,255,0.07)' }}>
            <Bell className="w-4 h-4" style={{ color: '#7A6A63' }}/>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"/>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="lg:pl-60 pt-[60px] min-h-screen">
        <div className="animate-fade-up p-7 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
