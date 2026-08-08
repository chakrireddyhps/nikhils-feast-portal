'use client'
import { MetricCard, Card, StatusBadge, DataTable, Btn, SearchBar, PageHeader } from '@/components/ui'
import { T, INGREDIENTS, fmtINRFull } from '@/lib/mockData'
import { Package, AlertTriangle, XCircle, Warehouse, Plus, Filter } from 'lucide-react'

export default function IngredientsPage() {
  const totalValue = INGREDIENTS.reduce((s, i) => s + i.stockValue, 0)
  const lowCount   = INGREDIENTS.filter(i => i.status === 'low' || i.status === 'critical').length
  const outCount   = INGREDIENTS.filter(i => i.status === 'out').length

  return (
    <div>
      <PageHeader title="Ingredients & Stock" subtitle="Manage your inventory and ingredient costs" action={<Btn icon={Plus}>Add Ingredient</Btn>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="Total Inventory Value" value={fmtINRFull(totalValue)} icon={Warehouse} color={T.gold}/>
        <MetricCard label="Total Ingredients"     value={INGREDIENTS.length}     icon={Package}   color={T.blue}/>
        <MetricCard label="Low / Critical Stock"  value={lowCount}               icon={AlertTriangle} color={T.amber}/>
        <MetricCard label="Out of Stock"          value={outCount}               icon={XCircle}   color={T.red}/>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <SearchBar placeholder="Search ingredients…"/>
        <Btn variant="ghost" icon={Filter}>Filter</Btn>
        <div style={{ marginLeft: 'auto' }}>
          <Btn icon={Plus}>Add Purchase</Btn>
        </div>
      </div>

      <Card>
        <DataTable
          columns={[
            { key: 'name', label: 'Ingredient', render: (v, r) => (
              <div>
                <div style={{ fontWeight: 700, color: T.textPrimary, fontSize: 13 }}>{String(v)}</div>
                <div style={{ fontSize: 11, color: T.textMuted }}>{String((r as { category: string }).category)}</div>
              </div>
            )},
            { key: 'current', label: 'Current Stock', render: (v, r) => {
              const row = r as { status: string; unit: string }
              return <span style={{ fontWeight: 700, color: row.status === 'out' ? T.red : row.status === 'critical' ? T.red : row.status === 'low' ? T.amber : T.textPrimary }}>{String(v)} {row.unit}</span>
            }},
            { key: 'min',     label: 'Min Level',  render: (v, r) => `${v} ${(r as { unit: string }).unit}` },
            { key: 'reorder', label: 'Reorder At', render: (v, r) => `${v} ${(r as { unit: string }).unit}` },
            { key: 'avgCost', label: 'Avg Cost',   render: (v, r) => `₹${v}/${(r as { unit: string }).unit}` },
            { key: 'stockValue', label: 'Stock Value', render: v => <span style={{ fontWeight: 700, color: T.gold }}>{fmtINRFull(Number(v))}</span> },
            { key: 'status', label: 'Status', render: (_, r) => <StatusBadge status={String((r as { status: string }).status)}/> },
            { key: 'id', label: '', render: () => (
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ padding: '5px 10px', borderRadius: 7, border: `1px solid ${T.border}`, background: 'transparent', color: T.textMuted, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                <button style={{ padding: '5px 10px', borderRadius: 7, border: `1px solid ${T.border}`, background: 'transparent', color: T.textMuted, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Adjust</button>
              </div>
            )},
          ]}
          data={INGREDIENTS as Record<string, unknown>[]}
        />
      </Card>
    </div>
  )
}
