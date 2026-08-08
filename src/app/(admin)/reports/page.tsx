'use client'
export const dynamic = 'force-dynamic'
import { Card, PageHeader } from '@/components/ui'
import { T } from '@/lib/mockData'
import { TrendingUp, ShoppingBag, Package, ShoppingCart, Trash2, Wallet, ReceiptText, UtensilsCrossed, FlaskConical, Layers, Download } from 'lucide-react'

const REPORTS = [
  { title: 'Sales Report',              desc: 'Daily, weekly, monthly sales breakdown by item and category', icon: TrendingUp,      color: '#C9A84C' },
  { title: 'Orders Report',             desc: 'Order volume, AOV, peak hours and payment method analysis',   icon: ShoppingBag,     color: '#5B9BD5' },
  { title: 'Inventory Report',          desc: 'Current stock levels, valuation, and movement summary',       icon: Package,         color: '#A855F7' },
  { title: 'Purchase Report',           desc: 'Supplier-wise purchase history and spend analysis',           icon: ShoppingCart,    color: '#4CAF7D' },
  { title: 'Wastage Report',            desc: 'Ingredient-wise wastage, reasons, and trend analysis',        icon: Trash2,          color: '#E05A5A' },
  { title: 'Expense Report',            desc: 'Operating expense breakdown by category and period',          icon: Wallet,          color: '#F5A623' },
  { title: 'P&L Report',               desc: 'Complete profit & loss statement with margins',               icon: ReceiptText,     color: '#C9A84C' },
  { title: 'Menu Performance',          desc: 'Best and worst performing items by revenue and margin',       icon: UtensilsCrossed, color: '#C0272D' },
  { title: 'Ingredient Consumption',    desc: 'Track which ingredients are consumed most over time',         icon: FlaskConical,    color: '#4CAF7D' },
  { title: 'Stock Movement Report',     desc: 'Complete inventory ledger with all movement types',           icon: Layers,          color: '#5B9BD5' },
]

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Download and analyze your business data"/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {REPORTS.map(r => (
          <div key={r.title} style={{
            background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16,
            padding: 22, cursor: 'pointer', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.borderEl; (e.currentTarget as HTMLElement).style.background = T.surfaceEl }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border;   (e.currentTarget as HTMLElement).style.background = T.surface }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${r.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <r.icon size={20} color={r.color}/>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['CSV', 'PDF'].map(fmt => (
                  <button key={fmt} style={{ padding: '5px 10px', borderRadius: 7, border: `1px solid ${T.border}`, background: 'transparent', color: T.textMuted, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{fmt}</button>
                ))}
              </div>
            </div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: '0 0 6px', fontSize: 14 }}>{r.title}</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: 0, lineHeight: 1.6 }}>{r.desc}</p>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, color: r.color, fontSize: 12, fontWeight: 700 }}>
              <Download size={13}/>
              <span>Generate Report</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
