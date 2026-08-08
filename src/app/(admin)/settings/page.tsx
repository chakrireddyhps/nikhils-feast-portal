import { Card, PageHeader } from '@/components/ui'
import { T } from '@/lib/mockData'
import { Globe, Settings, ShoppingBag, Package, Users, Lock, Zap, ShieldAlert, ChevronRight } from 'lucide-react'

const SECTIONS = [
  { title: 'Restaurant Profile',   desc: 'Name, logo, address, contact details',         icon: Globe       },
  { title: 'Business Settings',    desc: 'Currency, timezone, tax rates, financial year', icon: Settings    },
  { title: 'Order Settings',       desc: 'Order numbering, default tax, payment methods', icon: ShoppingBag },
  { title: 'Inventory Settings',   desc: 'Default units, reorder thresholds, wastage',    icon: Package     },
  { title: 'User Management',      desc: 'Manage team access, roles, and permissions',    icon: Users       },
  { title: 'Security',             desc: 'Password, 2FA, session management',             icon: Lock        },
  { title: 'Integrations',         desc: 'Connect third-party apps and services',         icon: Zap         },
  { title: 'Audit Logs',           desc: 'Track who changed what and when',               icon: ShieldAlert },
]

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your restaurant configuration"/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {SECTIONS.map(s => (
          <div key={s.title}
            style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.15s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.borderEl; el.style.background = T.surfaceEl }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.border;   el.style.background = T.surface }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={20} color={T.textMuted}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: T.textPrimary, fontSize: 13 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>{s.desc}</div>
            </div>
            <ChevronRight size={16} color={T.textSubtle}/>
          </div>
        ))}
      </div>
    </div>
  )
}
