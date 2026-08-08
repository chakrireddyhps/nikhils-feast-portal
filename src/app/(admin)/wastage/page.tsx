'use client'
import { MetricCard, Card, DataTable, Btn, PageHeader, ChartTip } from '@/components/ui'
import { T, WASTAGE, fmtINRFull } from '@/lib/mockData'
import { Trash2, BarChart3, TrendingDown, ReceiptText, AlertTriangle, Plus, Filter } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

export default function WastagePage() {
  const totalWastage = WASTAGE.reduce((s, w) => s + w.total, 0)
  const byReason = WASTAGE.reduce((acc: Record<string, number>, w) => {
    acc[w.reason] = (acc[w.reason] || 0) + w.total
    return acc
  }, {})
  const pieData = Object.entries(byReason).map(([name, value], i) => ({
    name, value,
    color: [T.red, T.amber, T.burgundyLight, T.blue, '#A855F7', T.green][i],
  }))

  return (
    <div>
      <PageHeader title="Wastage Management" subtitle="Track and reduce food wastage" action={<Btn icon={Plus}>Record Wastage</Btn>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="Today's Wastage" value={fmtINRFull(408)} icon={Trash2}     color={T.red}      trend={6.3}/>
        <MetricCard label="This Week"       value={fmtINRFull(totalWastage)} icon={BarChart3}  color={T.amber}/>
        <MetricCard label="Wastage %"       value="4.4%"                    icon={TrendingDown} color={T.textPrimary}/>
        <MetricCard label="Records"         value={WASTAGE.length}          icon={ReceiptText} color={T.blue}/>
      </div>

      <div style={{ background: `${T.red}08`, border: `1px solid ${T.red}30`, borderRadius: 12, padding: '14px 18px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <AlertTriangle size={16} color={T.red}/>
        <span style={{ color: T.textSecondary, fontSize: 13, fontWeight: 600 }}>
          Highest wastage this week: <strong style={{ color: T.textPrimary }}>Chicken (Whole)</strong> — ₹360 lost due to overproduction
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <Card>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: 0, fontSize: 14 }}>Wastage Records</h3>
            <Btn variant="ghost" icon={Filter} small>Filter</Btn>
          </div>
          <DataTable
            columns={[
              { key: 'date',       label: 'Date',        render: v => <span style={{ fontSize: 12 }}>{String(v)}</span> },
              { key: 'ingredient', label: 'Ingredient',  render: v => <span style={{ fontWeight: 600, color: T.textPrimary }}>{String(v)}</span> },
              { key: 'qty',        label: 'Qty',         render: (v, r) => `${v} ${(r as { unit: string }).unit}` },
              { key: 'total',      label: 'Value',       render: v => <span style={{ color: T.red, fontWeight: 700 }}>₹{String(v)}</span> },
              { key: 'reason',     label: 'Reason',      render: v => <span style={{ fontSize: 11, color: T.amber }}>{String(v)}</span> },
              { key: 'by',         label: 'Recorded By', render: v => <span style={{ fontSize: 11, color: T.textMuted }}>{String(v)}</span> },
            ]}
            data={WASTAGE as Record<string, unknown>[]}
          />
        </Card>

        <Card style={{ padding: 20 }}>
          <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>By Reason</h3>
          <p style={{ color: T.textMuted, fontSize: 12, marginBottom: 16 }}>This week</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} strokeWidth={0}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip content={<ChartTip/>} formatter={(v: number) => [fmtINRFull(v)]}
                contentStyle={{ background: T.surfaceEl, border: `1px solid ${T.borderEl}`, borderRadius: 10, fontSize: 11 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {pieData.map(d => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, color: T.textSecondary }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }}/>
                  {d.name}
                </span>
                <span style={{ color: T.red, fontWeight: 700 }}>₹{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
