'use client'
import { useState } from 'react'
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
  const [collapsed, setCollapsed] = useState(false)
  const sideW = collapsed ? 68 : 232
  const title = PAGE_TITLES[pathname] || 'Admin'

  return (
    <div style={{ minHeight: '100vh', background: '#0F0B0A', color: '#F5EFE6', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      {/* Topbar */}
      <header style={{
        position: 'fixed', top: 0, right: 0, zIndex: 90,
        left: sideW, height: 60,
        background: 'rgba(15,11,10,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16,
        transition: 'left 0.2s ease',
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#F5EFE6', fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#1C1412', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, cursor: 'pointer' }}>
            <Calendar size={13} color="#7A6A63"/>
            <span style={{ fontSize: 12, color: '#B8A99E', fontWeight: 600, letterSpacing: '-0.01em' }}>Jan 14, 2024</span>
            <ChevronDown size={12} color="#7A6A63"/>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#1C1412', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <Bell size={16} color="#7A6A63"/>
            <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#C0272D', border: '1.5px solid #0F0B0A' }}/>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ marginLeft: sideW, paddingTop: 60, minHeight: '100vh', transition: 'margin-left 0.2s ease' }}>
        <div className="animate-fade-up" style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
