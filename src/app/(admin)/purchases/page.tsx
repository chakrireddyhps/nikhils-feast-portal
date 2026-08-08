'use client'
import { MetricCard, Card, StatusBadge, DataTable, Btn, SearchBar, PageHeader } from '@/components/ui'
import { T, PURCHASES, fmtINRFull } from '@/lib/mockData'
import { ShoppingCart, ReceiptText, Users, Check, Plus, Filter, Download, Eye } from 'lucide-react'

export default function PurchasesPage() {
  return (
    <div>
      <PageHeader title="Stock Purchases" subtitle="Record and track your ingredient purchases" action={<Btn icon={Plus}>New Purchase</Btn>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="This Month Purchases" value="₹23,240" icon={ShoppingCart} color={T.gold}/>
        <MetricCard label="Purchase Orders"       value={5}       icon={ReceiptText}  color={T.blue}/>
        <MetricCard label="Suppliers"             value={4}       icon={Users}        color="#A855F7"/>
        <MetricCard label="Pending Orders"        value={0}       icon={Check}        color={T.green}/>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <SearchBar placeholder="Search purchases…"/>
        <Btn variant="ghost" icon={Filter}>Filter</Btn>
        <div style={{ marginLeft: 'auto' }}><Btn variant="ghost" icon={Download}>Export</Btn></div>
      </div>

      <Card>
        <DataTable
          columns={[
            { key: 'id',       label: 'Purchase #', render: v => <span style={{ color: T.gold, fontWeight: 700 }}>{String(v)}</span> },
            { key: 'date',     label: 'Date' },
            { key: 'supplier', label: 'Supplier', render: v => <span style={{ color: T.textPrimary, fontWeight: 600 }}>{String(v)}</span> },
            { key: 'items',    label: 'Items' },
            { key: 'total',    label: 'Total', render: v => <span style={{ fontWeight: 700, color: T.textPrimary }}>{fmtINRFull(Number(v))}</span> },
            { key: 'status',   label: 'Status', render: (_, r) => <StatusBadge status={String((r as { status: string }).status)}/> },
            { key: 'id',       label: '', render: () => <Btn variant="ghost" small icon={Eye}>View</Btn> },
          ]}
          data={PURCHASES as Record<string, unknown>[]}
        />
      </Card>
    </div>
  )
}
