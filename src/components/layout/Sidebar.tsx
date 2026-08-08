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
      width: collapsed ? 68 : 232,
      background: 'linear-gradient(180deg, #160C0A 0%, #0F0B0A 100%)',
      borderRight: `1px solid ${T.border}`,
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.2s ease', overflow: 'hidden',
    }}>
      {/* Brand */}
      <div style={{ padding: collapsed ? '20px 16px' : '20px 20px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: `linear-gradient(135deg, ${T.burgundy} 0%, #6B1020 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 14px ${T.burgundyGlow}`, fontSize: 18,
          }}>🍗</div>
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <p style={{ color: T.textPrimary, fontWeight: 800, fontSize: 13, letterSpacing: '-0.2px', margin: 0, whiteSpace: 'nowrap' }}>NIKHIL&apos;S FEAST</p>
              <p style={{ color: T.gold, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0, opacity: 0.9 }}>Admin Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 0', scrollbarWidth: 'none' }} className="scrollbar-none">
        {GROUPS.map(group => {
          const items = NAV.filter(n => n.group === group)
          return (
            <div key={group} style={{ marginBottom: 2 }}>
              {!collapsed && (
                <p style={{ color: T.textSubtle, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '8px 20px 4px', margin: 0 }}>
                  {group}
                </p>
              )}
              {items.map(({ href, icon: Icon, label }) => {
                const active = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link key={href} href={href} title={collapsed ? label : undefined} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: collapsed ? '10px 0' : '10px 16px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    textDecoration: 'none',
                    background: active ? `linear-gradient(90deg, ${T.burgundy}30 0%, transparent 100%)` : 'transparent',
                    color: active ? T.textPrimary : T.textMuted,
                    borderLeft: active ? `2px solid ${T.burgundyLight}` : '2px solid transparent',
                    transition: 'all 0.1s',
                  }}>
                    <Icon size={17} color={active ? T.goldLight : T.textMuted}/>
                    {!collapsed && (
                      <>
                        <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? T.textPrimary : T.textSecondary, whiteSpace: 'nowrap', flex: 1 }}>
                          {label}
                        </span>
                        {active && <ChevronRight size={13} color={T.textMuted}/>}
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
      <div style={{ borderTop: `1px solid ${T.border}`, padding: collapsed ? '12px 0' : '14px 16px', flexShrink: 0 }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: `linear-gradient(135deg, ${T.burgundy}, #6B1020)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 800, color: '#fff',
            }}>N</div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ color: T.textPrimary, fontSize: 12, fontWeight: 700, margin: 0 }}>Nikhil</p>
              <p style={{ color: T.gold, fontSize: 10, margin: 0, fontWeight: 600 }}>Owner</p>
            </div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', padding: collapsed ? '8px 0' : '8px 4px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: T.textMuted, fontSize: 12, fontWeight: 600,
          justifyContent: collapsed ? 'center' : 'flex-start',
          fontFamily: 'inherit',
        }}>
          {collapsed ? <ChevronRight size={16}/> : <><ChevronLeft size={16}/><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  )
}
