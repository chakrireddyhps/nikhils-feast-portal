'use client'
import { Moon, Sun, Calendar, ChevronDown } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { useTheme } from '@/lib/themeContext'

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
  const { theme: T, isDark, toggle } = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const sideW = collapsed ? 68 : 260
  const title = PAGE_TITLES[pathname] || 'Admin'

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.textPrimary, fontFamily: "'Poppins', system-ui, sans-serif", transition: 'background 0.25s, color 0.25s' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      {/* Topbar */}
      <header style={{
        position: 'fixed', top: 0, right: 0, zIndex: 90,
        left: sideW, height: 60,
        background: isDark ? `${T.bg}F0` : `${T.surface}F8`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16,
        transition: 'left 0.2s ease, background 0.25s',
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: T.textPrimary, fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 8, cursor: 'pointer' }}>
            <Calendar size={13} color={T.textMuted}/>
            <span style={{ fontSize: 12, color: T.textSecondary, fontWeight: 600 }}>Jan 14, 2024</span>
            <ChevronDown size={12} color={T.textMuted}/>
          </div>

          {/* Theme toggle */}
          <button onClick={toggle} title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              width: 38, height: 38, borderRadius: 10,
              background: isDark ? T.surfaceEl : '#FFF8F0',
              border: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = T.gold}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}>
            {isDark
              ? <Sun size={16} color={T.gold} style={{ transition: 'transform 0.3s' }}/>
              : <Moon size={16} color={T.textMuted} style={{ transition: 'transform 0.3s' }}/>
            }
          </button>
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

// Need useState import
import { useState } from 'react'
