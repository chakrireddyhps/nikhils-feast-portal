'use client'
import { Moon, Sun, Calendar, ChevronDown, LogOut, Settings, Menu, X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { useTheme } from '@/lib/themeContext'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const [collapsed, setCollapsed]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [logoutHov, setLogoutHov]   = useState(false)
  const [settingsHov, setSettingsHov] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const title = PAGE_TITLES[pathname] || 'Admin'

  // Close avatar dropdown on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setAvatarOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  function handleLogout() {
    setAvatarOpen(false); setShowConfirm(false)
    router.push('/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.textPrimary, fontFamily: "'Poppins', system-ui, sans-serif", transition: 'background 0.25s, color 0.25s' }}>

      {/* Mobile sidebar backdrop */}
      <div className={`sidebar-backdrop${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)}/>

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* ── Logout Confirm Modal ── */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{
            background: isDark ? 'linear-gradient(160deg, #1E0A0A 0%, #140202 100%)' : 'linear-gradient(160deg, #fff 0%, #FDF4F0 100%)',
            border: '1px solid rgba(155,35,53,0.3)', borderRadius: 24,
            padding: '36px 32px', width: '100%', maxWidth: 360, textAlign: 'center',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, rgba(155,35,53,0.2) 0%, rgba(100,10,20,0.35) 100%)', border: '1px solid rgba(155,35,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(155,35,53,0.2)' }}>
              <LogOut size={26} color="#E05A5A"/>
            </div>
            <h3 style={{ color: T.textPrimary, fontWeight: 800, fontSize: 18, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Sign Out?</h3>
            <p style={{ color: T.textMuted, fontSize: 13, margin: '0 0 28px', lineHeight: 1.6, fontWeight: 500 }}>
              You&apos;ll be signed out of<br/>
              <span style={{ color: T.gold, fontWeight: 700 }}>Nikhil&apos;s Feast</span> Admin Portal.
            </p>
            <div style={{ height: 1, background: T.border, marginBottom: 20 }}/>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: '11px 0', borderRadius: 12, background: T.surfaceEl, border: `1px solid ${T.border}`, color: T.textSecondary, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={handleLogout} style={{ flex: 1, padding: '11px 0', borderRadius: 12, background: 'linear-gradient(135deg, #9B2335 0%, #6B1020 100%)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(155,35,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <LogOut size={14}/> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Topbar ── */}
      <header className="admin-topbar" style={{
        position: 'fixed', top: 0, right: 0, zIndex: 90,
        left: collapsed ? 68 : 260, height: 60,
        background: isDark ? `${T.bg}F0` : `${T.surface}F8`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16,
        transition: 'left 0.2s ease, background 0.25s',
      }}>
        {/* Hamburger — hidden on desktop, shown on mobile via CSS */}
        <button
          className="topbar-hamburger"
          onClick={() => setMobileOpen(v => !v)}
          style={{
            display: 'none', // CSS shows on mobile
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: T.surfaceEl, border: `1px solid ${T.border}`,
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: T.textSecondary,
          }}>
          {mobileOpen ? <X size={17}/> : <Menu size={17}/>}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ color: T.textPrimary, fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 8, cursor: 'pointer', flexShrink: 0 }}>
            <Calendar size={13} color={T.textMuted}/>
            <span className="topbar-date-label" style={{ fontSize: 12, color: T.textSecondary, fontWeight: 600, whiteSpace: 'nowrap' }}>Jan 14, 2024</span>
            <ChevronDown size={12} color={T.textMuted}/>
          </div>

          {/* Theme toggle */}
          <button onClick={toggle} title={isDark ? 'Light Mode' : 'Dark Mode'}
            style={{ width: 38, height: 38, borderRadius: 10, background: isDark ? T.surfaceEl : '#FFF8F0', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = T.gold}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}>
            {isDark ? <Sun size={16} color={T.gold}/> : <Moon size={16} color={T.textMuted}/>}
          </button>

          {/* ── Avatar Dropdown ── */}
          <div ref={dropRef} style={{ position: 'relative' }}>
            <button onClick={() => setAvatarOpen(v => !v)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 10px 5px 5px',
              background: avatarOpen ? (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)') : T.surfaceEl,
              border: `1px solid ${avatarOpen ? T.gold + '60' : T.border}`,
              borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: avatarOpen ? `0 0 0 3px ${T.gold}18` : 'none',
            }}
            onMouseEnter={e => { if (!avatarOpen) (e.currentTarget as HTMLElement).style.borderColor = T.borderEl }}
            onMouseLeave={e => { if (!avatarOpen) (e.currentTarget as HTMLElement).style.borderColor = T.border }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg, #1A0A08 0%, #0D0101 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(155,35,53,0.4)', overflow: 'hidden', padding: 2 }}>
                <img src="/logo.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
              </div>
              <div className="topbar-avatar-text" style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <p style={{ color: T.textPrimary, fontSize: 12, fontWeight: 700, margin: 0 }}>Nikhil</p>
                <p style={{ color: T.gold, fontSize: 10, fontWeight: 600, margin: 0 }}>Owner</p>
              </div>
              <ChevronDown className="topbar-avatar-chevron" size={13} color={T.textMuted} style={{ transition: 'transform 0.2s', transform: avatarOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
            </button>

            {avatarOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 220,
                background: isDark ? 'linear-gradient(160deg, #1C1210 0%, #130202 100%)' : T.surface,
                border: `1px solid ${T.border}`, borderRadius: 16,
                boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)' : '0 12px 36px rgba(0,0,0,0.12)',
                overflow: 'hidden', zIndex: 200,
              }}>
                <div style={{ height: 2, background: 'linear-gradient(90deg, #9B2335, #C9A84C, #9B2335)' }}/>
                <div style={{ padding: '14px 16px 12px', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg, #1A0A08 0%, #0D0101 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(155,35,53,0.4)', overflow: 'hidden', padding: 3 }}>
                      <img src="/logo.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                    </div>
                    <div>
                      <p style={{ color: T.textPrimary, fontSize: 13, fontWeight: 700, margin: 0 }}>Nikhil</p>
                      <p style={{ color: T.textMuted, fontSize: 11, margin: 0 }}>nikhil@nikhilsfeast.com</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A84C' }}/>
                    <span style={{ color: '#C9A84C', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>OWNER · ADMIN</span>
                  </div>
                </div>
                <div style={{ padding: '8px 8px' }}>
                  <button onClick={() => { setAvatarOpen(false); router.push('/settings') }}
                    onMouseEnter={() => setSettingsHov(true)} onMouseLeave={() => setSettingsHov(false)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 10, border: 'none', background: settingsHov ? T.surfaceEl : 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', textAlign: 'left' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: settingsHov ? T.surfaceHov : T.surfaceEl, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Settings size={14} color={T.textMuted}/>
                    </div>
                    Settings
                  </button>
                  <div style={{ height: 1, background: T.border, margin: '6px 2px' }}/>
                  <button onClick={() => { setAvatarOpen(false); setShowConfirm(true) }}
                    onMouseEnter={() => setLogoutHov(true)} onMouseLeave={() => setLogoutHov(false)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 10, border: 'none', background: logoutHov ? 'rgba(224,90,90,0.1)' : 'transparent', color: logoutHov ? '#E05A5A' : T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', textAlign: 'left' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: logoutHov ? 'rgba(224,90,90,0.15)' : T.surfaceEl, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <LogOut size={14} color={logoutHov ? '#E05A5A' : T.textMuted}/>
                    </div>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="admin-main" style={{ marginLeft: collapsed ? 68 : 260, paddingTop: 60, minHeight: '100vh', transition: 'margin-left 0.2s ease' }}>
        <div className="animate-fade-up admin-page-content" style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
