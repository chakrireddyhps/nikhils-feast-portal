'use client'
import { MetricCard, Card, DataTable, Btn, SearchBar, PageHeader, ChartTip } from '@/components/ui'
import { T, EXPENSES, fmtINRFull } from '@/lib/mockData'
import { Wallet, RefreshCw, Zap, Layers, Plus, Download, Edit } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

export default function ExpensesPage() {
  const totalExp = EXPENSES.reduce((s, e) => s + e.amount, 0)
  const recurExp = EXPENSES.filter(e => e.recurring).reduce((s, e) => s + e.amount, 0)
  const oneTime  = EXPENSES.filter(e => !e.recurring).reduce((s, e) => s + e.amount, 0)

  const byCategory = EXPENSES.reduce((acc: Record<string, number>, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})
  const pieData = Object.entries(byCategory).map(([name, value], i) => ({
    name, value,
    color: [T.burgundyLight, T.gold, T.blue, T.green, T.amber, '#A855F7', '#06B6D4', '#EC4899'][i],
  }))

  return (
    <div>
      <PageHeader title="Expenses" subtitle="Track your operating expenses" action={<Btn icon={Plus}>Add Expense</Btn>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="This Month"  value={fmtINRFull(totalExp)} icon={Wallet}     color={T.gold}/>
        <MetricCard label="Recurring"   value={fmtINRFull(recurExp)} icon={RefreshCw}  color={T.blue}/>
        <MetricCard label="One-Time"    value={fmtINRFull(oneTime)}  icon={Zap}        color={T.amber}/>
        <MetricCard label="Categories"  value={Object.keys(byCategory).length} icon={Layers} color={T.textPrimary}/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <Card>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: 0, fontSize: 14 }}>Expense Records</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <SearchBar placeholder="Search expenses…"/>
              <Btn variant="ghost" icon={Download} small>Export</Btn>
            </div>
          </div>
          <DataTable
            columns={[
              { key: 'name', label: 'Expense', render: (v, r) => (
                <div>
                  <div style={{ fontWeight: 700, color: T.textPrimary, fontSize: 13 }}>{String(v)}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{String((r as { category: string }).category)}</div>
                </div>
              )},
              { key: 'amount',    label: 'Amount',    render: v => <span style={{ fontWeight: 700, color: T.textPrimary }}>{fmtINRFull(Number(v))}</span> },
              { key: 'date',      label: 'Date',      render: v => <span style={{ fontSize: 12, color: T.textMuted }}>{String(v)}</span> },
              { key: 'payment',   label: 'Payment',   render: v => String(v).replace('_', ' ') },
              { key: 'recurring', label: 'Type',      render: v => <span style={{ fontSize: 11, fontWeight: 700, color: v ? T.blue : T.textMuted }}>{v ? 'Recurring' : 'One-time'}</span> },
              { key: 'id',        label: '',          render: () => <Btn variant="ghost" small icon={Edit}>Edit</Btn> },
            ]}
            data={EXPENSES as Record<string, unknown>[]}
          />
        </Card>

        <Card style={{ padding: 20 }}>
          <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>By Category</h3>
          <p style={{ color: T.textMuted, fontSize: 12, marginBottom: 16 }}>This month</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} strokeWidth={0}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip contentStyle={{ background: T.surfaceEl, border: `1px solid ${T.borderEl}`, borderRadius: 10, fontSize: 11 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {pieData.sort((a, b) => b.value - a.value).map(d => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, color: T.textSecondary }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }}/>
                  {d.name}
                </span>
                <span style={{ fontWeight: 700, color: T.textPrimary }}>{fmtINRFull(d.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
