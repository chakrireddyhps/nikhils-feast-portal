'use client'
import { useState } from 'react'
import { Bell, Calendar, ChevronDown } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { T } from '@/lib/mockData'

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
    <div style={{ minHeight: '100vh', background: T.bg, color: T.textPrimary, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      {/* Topbar */}
      <header style={{
        position: 'fixed', top: 0, right: 0, zIndex: 90,
        left: sideW, height: 60,
        background: `${T.bg}F0`, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16,
        transition: 'left 0.2s ease',
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: T.textPrimary, fontSize: 15, fontWeight: 700, margin: 0 }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
            background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, cursor: 'pointer',
          }}>
            <Calendar size={13} color={T.textMuted}/>
            <span style={{ fontSize: 12, color: T.textSecondary, fontWeight: 600 }}>Jan 14, 2024</span>
            <ChevronDown size={12} color={T.textMuted}/>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: T.surface,
            border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', position: 'relative',
          }}>
            <Bell size={16} color={T.textMuted}/>
            <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: T.burgundyLight, border: `1.5px solid ${T.bg}` }}/>
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
