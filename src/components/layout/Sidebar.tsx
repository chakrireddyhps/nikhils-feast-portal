'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, Package,
  BookOpen, TrendingUp, Wallet, BarChart3, Settings,
  ChevronLeft, ChevronRight, ShoppingCart, Trash2,
  LogOut, AlertTriangle,
} from 'lucide-react'

const NAV = [
  { href: '/dashboard',   icon: LayoutDashboard,  label: 'Dashboard',    group: 'Overview'  },
  { href: '/orders',      icon: ShoppingBag,       label: 'Orders',       group: 'Sales'     },
  { href: '/menu',        icon: UtensilsCrossed,   label: 'Menu',         group: 'Sales'     },
  { href: '/ingredients', icon: Package,           label: 'Ingredients',  group: 'Inventory' },
  { href: '/purchases',   icon: ShoppingCart,      label: 'Purchases',    group: 'Inventory' },
  { href: '/wastage',     icon: Trash2,            label: 'Wastage',      group: 'Inventory' },
  { href: '/recipes',     icon: BookOpen,          label: 'Recipes / BOM',group: 'Kitchen'   },
  { href: '/expenses',    icon: Wallet,            label: 'Expenses',     group: 'Finance'   },
  { href: '/pnl',         icon: TrendingUp,        label: 'Profit & Loss',group: 'Finance'   },
  { href: '/reports',     icon: BarChart3,         label: 'Reports',      group: 'Analytics' },
  { href: '/settings',    icon: Settings,          label: 'Settings',     group: 'System'    },
]

const GROUPS = Array.from(new Set(NAV.map(n => n.group)))

const S = {
  bg:        'linear-gradient(180deg, #2A0809 0%, #160304 60%, #0D0101 100%)',
  border:    'rgba(255,255,255,0.07)',
  text:      'rgba(255,255,255,0.65)',
  muted:     'rgba(255,255,255,0.35)',
  grp:       'rgba(255,255,255,0.35)',
  burgundy:  '#9B2335',
  gold:      '#C9A84C',
  goldLight: '#E2C76B',
}

function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'linear-gradient(160deg, #1E0A0A 0%, #140202 100%)', border: '1px solid rgba(155,35,53,0.3)', borderRadius: 24, padding: '36px 32px', width: '100%', maxWidth: 360, boxShadow: '0 32px 80px rgba(0,0,0,0.7)', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, rgba(155,35,53,0.25) 0%, rgba(100,10,20,0.4) 100%)', border: '1px solid rgba(155,35,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(155,35,53,0.2)' }}>
          <LogOut size={26} color="#E05A5A"/>
        </div>
        <h3 style={{ color: '#F5EFE6', fontWeight: 800, fontSize: 18, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Sign Out?</h3>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: '0 0 28px', lineHeight: 1.6, fontWeight: 500 }}>
          You&apos;ll be signed out of<br/>
          <span style={{ color: '#C9A84C', fontWeight: 700 }}>Nikhil&apos;s Feast</span> Admin Portal.
        </p>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }}/>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '11px 0', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '11px 0', borderRadius: 12, background: 'linear-gradient(135deg, #9B2335 0%, #6B1020 100%)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(155,35,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <LogOut size={14}/> Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname()
  const router   = useRouter()
  const [showLogout, setShowLogout] = useState(false)
  const [logoutHov, setLogoutHov]   = useState(false)

  function handleLogout() { setShowLogout(false); router.push('/login') }

  // On mobile, sidebar is always "expanded" (full labels) when open
  const isExpanded = !collapsed

  return (
    <>
      {showLogout && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogout(false)}/>}

      <aside
        className={`admin-sidebar${mobileOpen ? ' mobile-open' : ''}`}
        style={{
          position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
          width: collapsed ? 68 : 260,
          background: S.bg,
          borderRight: `1px solid ${S.border}`,
          display: 'flex', flexDirection: 'column',
          transition: 'width 0.2s ease, transform 0.25s ease',
          overflow: 'hidden',
        }}>

        {/* Brand */}
        <div className="sidebar-brand-wrap" style={{ padding: isExpanded ? '22px 20px' : '22px 14px', borderBottom: `1px solid ${S.border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, background: 'linear-gradient(135deg, #1A0A08 0%, #0D0101 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(155,35,53,0.4)', overflow: 'hidden', padding: 3 }}>
              <img src="/logo.png" alt="Nikhil's Feast" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}/>
            </div>
            {isExpanded && (
              <div className="sidebar-brand-text" style={{ overflow: 'hidden' }}>
                <p style={{ color: '#F5EFE6', fontWeight: 800, fontSize: 14, letterSpacing: '-0.01em', margin: 0, whiteSpace: 'nowrap', lineHeight: 1.3 }}>NIKHIL&apos;S FEAST</p>
                <p style={{ color: S.gold, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, opacity: 0.9, fontWeight: 600, marginTop: 2 }}>Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 8px', scrollbarWidth: 'none' }} className="scrollbar-none">
          {GROUPS.map(group => {
            const items = NAV.filter(n => n.group === group)
            return (
              <div key={group} style={{ marginBottom: 4 }}>
                {isExpanded && (
                  <p className="sidebar-group-label" style={{ color: S.grp, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '8px 12px 4px', margin: 0 }}>
                    {group}
                  </p>
                )}
                {items.map(({ href, icon: Icon, label }) => {
                  const active = pathname === href || pathname.startsWith(href + '/')
                  return (
                    <Link key={href} href={href}
                      onClick={() => setMobileOpen(false)}
                      title={!isExpanded ? label : undefined}
                      className="sidebar-nav-link"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 11,
                        padding: isExpanded ? '10px 12px' : '10px 14px',
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        textDecoration: 'none', borderRadius: 12, margin: '1px 0',
                        background: active ? 'linear-gradient(135deg, rgba(220,53,60,0.85) 0%, rgba(139,0,0,0.85) 100%)' : 'transparent',
                        boxShadow: active ? '0 2px 10px rgba(139,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                      <Icon size={17} color={active ? S.goldLight : 'rgba(255,255,255,0.5)'}/>
                      {isExpanded && (
                        <>
                          <span className="sidebar-label" style={{ fontSize: 14, fontWeight: active ? 600 : 500, color: active ? '#FFFFFF' : S.text, whiteSpace: 'nowrap', flex: 1 }}>{label}</span>
                          {active && <ChevronRight size={13} color="rgba(255,255,255,0.5)"/>}
                        </>
                      )}
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="sidebar-bottom" style={{ borderTop: `1px solid ${S.border}`, padding: isExpanded ? '14px 16px' : '14px 8px', flexShrink: 0 }}>
          {isExpanded ? (
            <div className="sidebar-user-row" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: 'linear-gradient(135deg, #1A0A08, #0D0101)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(155,35,53,0.4)', overflow: 'hidden', padding: 2 }}>
                <img src="/logo.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
              </div>
              <div className="sidebar-user-text" style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#F5EFE6', fontSize: 13, fontWeight: 700, margin: 0 }}>Nikhil</p>
                <p style={{ color: S.gold, fontSize: 11, margin: 0, fontWeight: 600 }}>Owner</p>
              </div>
              <button onClick={() => setShowLogout(true)} title="Sign out"
                onMouseEnter={() => setLogoutHov(true)} onMouseLeave={() => setLogoutHov(false)}
                style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: logoutHov ? 'rgba(224,90,90,0.15)' : 'rgba(255,255,255,0.05)', border: logoutHov ? '1px solid rgba(224,90,90,0.35)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
                <LogOut size={14} color={logoutHov ? '#E05A5A' : 'rgba(255,255,255,0.4)'}/>
              </button>
            </div>
          ) : (
            <button onClick={() => setShowLogout(true)} title="Sign out"
              onMouseEnter={() => setLogoutHov(true)} onMouseLeave={() => setLogoutHov(false)}
              style={{ width: '100%', height: 36, borderRadius: 10, marginBottom: 8, background: logoutHov ? 'rgba(224,90,90,0.15)' : 'transparent', border: logoutHov ? '1px solid rgba(224,90,90,0.3)' : '1px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
              <LogOut size={15} color={logoutHov ? '#E05A5A' : 'rgba(255,255,255,0.35)'}/>
            </button>
          )}

          {/* Collapse toggle — hidden on mobile via natural behavior */}
          <button onClick={() => setCollapsed(!collapsed)} className="sidebar-collapse-label"
            style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: isExpanded ? '6px 4px' : '8px 0', background: 'transparent', border: 'none', cursor: 'pointer', color: S.muted, fontSize: 12, fontWeight: 600, justifyContent: isExpanded ? 'flex-start' : 'center', fontFamily: 'inherit', transition: 'color 0.15s' }}>
            {isExpanded ? <><ChevronLeft size={16}/><span>Collapse</span></> : <ChevronRight size={16}/>}
          </button>
        </div>
      </aside>
    </>
  )
}
