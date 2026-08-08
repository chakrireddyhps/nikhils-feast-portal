'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { MetricCard, Card, StatusBadge, OrderTypeBadge, DataTable, Btn, SearchBar, PageHeader } from '@/components/ui'
import { T, ORDERS, fmtINRFull, fmtINR } from '@/lib/mockData'
import { ShoppingBag, DollarSign, TrendingUp, Filter, Download, Plus } from 'lucide-react'

const STATUSES = ['ALL', 'COMPLETED', 'PREPARING', 'READY', 'CANCELLED']

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState('ALL')
  const filtered = activeStatus === 'ALL' ? ORDERS : ORDERS.filter(o => o.status === activeStatus)
  const revenue = filtered.filter(o => o.status !== 'CANCELLED').reduce((s, o) => s + o.total, 0)
  const profit  = filtered.filter(o => o.status !== 'CANCELLED').reduce((s, o) => s + o.profit, 0)

  return (
    <div>
      <PageHeader title="Orders" subtitle={`${ORDERS.length} orders today`} action={<Btn icon={Plus}>New Order</Btn>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="Total Revenue" value={fmtINRFull(revenue)} icon={DollarSign} color={T.gold}/>
        <MetricCard label="Gross Profit" value={fmtINRFull(profit)} icon={TrendingUp} color={T.green}/>
        <MetricCard label="Completed Orders" value={ORDERS.filter(o => o.status === 'COMPLETED').length} icon={ShoppingBag} color={T.blue}/>
        <MetricCard label="Avg Order Value" value={fmtINR(revenue / Math.max(1, filtered.length))} icon={TrendingUp} color={T.textPrimary}/>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setActiveStatus(s)} style={{
            padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            border: 'none', fontFamily: 'inherit',
            background: activeStatus === s ? T.burgundy : T.surfaceEl,
            color: activeStatus === s ? '#fff' : T.textMuted,
          }}>
            {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            {' '}
            <span style={{ opacity: 0.7, fontSize: 10 }}>
              {s === 'ALL' ? ORDERS.length : ORDERS.filter(o => o.status === s).length}
            </span>
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <SearchBar placeholder="Search orders…"/>
          <Btn variant="ghost" icon={Filter}>Filter</Btn>
          <Btn variant="ghost" icon={Download}>Export</Btn>
        </div>
      </div>

      <Card>
        <DataTable
          columns={[
            { key: 'id', label: 'Order #', render: v => <span style={{ color: T.gold, fontWeight: 700 }}>{String(v)}</span> },
            { key: 'date', label: 'Date & Time', render: v => <span style={{ color: T.textMuted, fontSize: 12 }}>{String(v)}</span> },
            { key: 'type', label: 'Type', render: (_, r) => <OrderTypeBadge type={String((r as { type: string }).type)}/> },
            { key: 'payment', label: 'Payment' },
            { key: 'items', label: 'Items' },
            { key: 'total', label: 'Total', render: v => <span style={{ fontWeight: 700, color: T.textPrimary }}>{fmtINRFull(Number(v))}</span> },
            { key: 'cogs', label: 'COGS', render: v => <span style={{ color: T.textMuted, fontSize: 12 }}>{fmtINRFull(Number(v))}</span> },
            { key: 'profit', label: 'Profit', render: v => <span style={{ color: T.green, fontWeight: 600 }}>{fmtINRFull(Number(v))}</span> },
            { key: 'status', label: 'Status', render: (_, r) => <StatusBadge status={String((r as { status: string }).status)}/> },
          ]}
          data={filtered as Record<string, unknown>[]}
        />
      </Card>
    </div>
  )
}
