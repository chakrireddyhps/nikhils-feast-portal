'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, Package,
  BookOpen, TrendingUp, Wallet, BarChart3, Settings,
  ChevronRight, ShoppingCart, Trash2, LogOut, Menu, X,
} from 'lucide-react'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Sales',
    items: [
      { href: '/orders', icon: ShoppingBag,     label: 'Orders' },
      { href: '/menu',   icon: UtensilsCrossed, label: 'Menu'   },
    ],
  },
  {
    label: 'Inventory',
    items: [
      { href: '/ingredients', icon: Package,     label: 'Ingredients' },
      { href: '/purchases',   icon: ShoppingCart, label: 'Purchases'  },
      { href: '/wastage',     icon: Trash2,       label: 'Wastage'    },
    ],
  },
  {
    label: 'Kitchen',
    items: [
      { href: '/recipes', icon: BookOpen, label: 'Recipes / BOM' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { href: '/expenses', icon: Wallet,    label: 'Expenses'      },
      { href: '/pnl',      icon: TrendingUp, label: 'Profit & Loss' },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { href: '/reports', icon: BarChart3, label: 'Reports' },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
]

const SIDEBAR_BG = 'linear-gradient(180deg, #2A0809 0%, #160304 60%, #0D0101 100%)'

function NavContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname()
  const navRef   = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const saved = sessionStorage.getItem('sidebar-scroll')
    if (saved) el.scrollTop = parseInt(saved, 10)
    function onScroll() { sessionStorage.setItem('sidebar-scroll', String(el!.scrollTop)) }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex flex-col h-full">

      {/* Brand */}
      <div className="px-5 pt-6 pb-5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg"
            style={{
              background: 'linear-gradient(135deg, #C0272D 0%, #7A1020 100%)',
              boxShadow: '0 4px 14px rgba(192,39,45,0.45)',
            }}>
            🍗
          </div>
          <div>
            <p className="text-white font-extrabold text-sm leading-tight tracking-tight">
              NIKHIL&apos;S FEAST
            </p>
            <p className="text-white/50 text-[9px] tracking-[0.15em] uppercase mt-0.5 font-medium">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav ref={navRef} className="flex-1 px-3 overflow-y-auto scrollbar-none space-y-4 pb-4 min-h-0">
        {NAV_GROUPS.map(group => (
          <div key={group.label}>
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.18em] px-3 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ href, icon: Icon, label }) => {
                const active = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link key={href} href={href} onClick={onLinkClick}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative"
                    style={{
                      color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                      background: active
                        ? 'linear-gradient(135deg, rgba(192,39,45,0.85) 0%, rgba(122,16,40,0.85) 100%)'
                        : 'transparent',
                      boxShadow: active ? '0 2px 10px rgba(139,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                    <Icon className="w-4 h-4 shrink-0"/>
                    <span className="flex-1">{label}</span>
                    {active && <ChevronRight className="w-3.5 h-3.5 opacity-60"/>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom user */}
      <div className="mx-3 mb-4 mt-1 shrink-0 pt-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #C0272D, #7A1020)' }}>
            N
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold tracking-tight truncate">Nikhil</p>
            <p className="text-amber-400 text-[10px] font-semibold truncate" style={{ color: '#C9A84C' }}>Owner</p>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-white/50 hover:text-white/80 transition-all duration-150"
          style={{ letterSpacing: '-0.01em' }}>
          <LogOut className="w-4 h-4"/>
          <span>Sign out</span>
        </button>
      </div>
    </div>
  )
}

export function Sidebar({ collapsed: _c, setCollapsed: _s }: { collapsed?: boolean; setCollapsed?: (v: boolean) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #C0272D 0%, #7A1020 100%)' }}>
        <Menu className="w-5 h-5"/>
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}/>
          <aside className="relative w-64 flex flex-col z-50" style={{ background: SIDEBAR_BG }}>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X className="w-5 h-5"/>
            </button>
            <NavContent onLinkClick={() => setOpen(false)}/>
          </aside>
        </div>
      )}

      {/* Desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col z-30" style={{ background: SIDEBAR_BG }}>
        <NavContent/>
      </aside>
    </>
  )
}
