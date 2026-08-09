'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, Package,
  BookOpen, TrendingUp, Wallet, BarChart3, Settings,
  ChevronLeft, ChevronRight, ShoppingCart, Trash2,
} from 'lucide-react'
import { T } from '@/lib/mockData'

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

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
      width: collapsed ? 68 : 240,
      background: 'linear-gradient(180deg, #2A0809 0%, #160304 60%, #0D0101 100%)',
      borderRight: `1px solid ${T.border}`,
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.2s ease', overflow: 'hidden',
    }}>
      {/* Brand */}
      <div style={{ padding: collapsed ? '22px 16px' : '22px 20px', borderBottom: `1px solid rgba(255,255,255,0.07)`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 11, flexShrink: 0,
            background: 'linear-gradient(135deg, #9B2335 0%, #6B1020 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(155,35,53,0.4)', fontSize: 20,
          }}>🍗</div>
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <p style={{ color: '#F5EFE6', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em', margin: 0, whiteSpace: 'nowrap', lineHeight: 1.3 }}>
                NIKHIL&apos;S FEAST
              </p>
              <p style={{ color: '#C9A84C', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, opacity: 0.9, fontWeight: 600, marginTop: 2 }}>
                Admin Portal
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0', scrollbarWidth: 'none' }} className="scrollbar-none">
        {GROUPS.map(group => {
          const items = NAV.filter(n => n.group === group)
          return (
            <div key={group} style={{ marginBottom: 4 }}>
              {!collapsed && (
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '8px 20px 4px', margin: 0 }}>
                  {group}
                </p>
              )}
              {items.map(({ href, icon: Icon, label }) => {
                const active = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link key={href} href={href} title={collapsed ? label : undefined} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: collapsed ? '11px 0' : '11px 18px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    textDecoration: 'none',
                    background: active
                      ? 'linear-gradient(135deg, rgba(192,39,45,0.85) 0%, rgba(122,16,40,0.85) 100%)'
                      : 'transparent',
                    borderLeft: active ? '2px solid #C0272D' : '2px solid transparent',
                    boxShadow: active ? '0 2px 10px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)' : 'none',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                    <Icon size={18} color={active ? '#E2C76B' : 'rgba(255,255,255,0.5)'}/>
                    {!collapsed && (
                      <>
                        <span style={{
                          fontSize: 15, fontWeight: active ? 700 : 500,
                          color: active ? '#F5EFE6' : 'rgba(255,255,255,0.65)',
                          whiteSpace: 'nowrap', flex: 1,
                        }}>{label}</span>
                        {active && <ChevronRight size={14} color="rgba(255,255,255,0.4)"/>}
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
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: collapsed ? '14px 0' : '16px 18px', flexShrink: 0 }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, flexShrink: 0,
              background: 'linear-gradient(135deg, #9B2335, #6B1020)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 800, color: '#fff',
            }}>N</div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ color: '#F5EFE6', fontSize: 14, fontWeight: 700, margin: 0 }}>Nikhil</p>
              <p style={{ color: '#C9A84C', fontSize: 12, margin: 0, fontWeight: 600 }}>Owner</p>
            </div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', padding: collapsed ? '8px 0' : '8px 4px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.38)', fontSize: 13, fontWeight: 600,
          justifyContent: collapsed ? 'center' : 'flex-start',
          fontFamily: 'inherit', transition: 'color 0.15s',
        }}>
          {collapsed ? <ChevronRight size={17}/> : <><ChevronLeft size={17}/><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  )
}
