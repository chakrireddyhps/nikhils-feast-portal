'use client'
import { useT } from '@/lib/themeContext'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { Card, Btn, PageHeader, ChartTip } from '@/components/ui'
import { REVENUE_TREND, WASTAGE, EXPENSES, fmtINRFull } from '@/lib/mockData'
import { Download } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PERIODS = ['Today', 'This Week', 'This Month', 'Last Month', 'This Quarter', 'This Year', 'Custom']

export default function PnLPage() {
  const T = useT()
  const [period, setPeriod] = useState('This Month')

  const revenue     = REVENUE_TREND.reduce((s, d) => s + d.revenue, 0)
  const cogs        = REVENUE_TREND.reduce((s, d) => s + d.cogs, 0)
  const wastage     = WASTAGE.reduce((s, w) => s + w.total, 0)
  const grossProfit = revenue - cogs - wastage
  const grossMargin = ((grossProfit / revenue) * 100).toFixed(1)
  const expenses    = EXPENSES.reduce((s, e) => s + e.amount, 0)
  const netProfit   = grossProfit - expenses
  const netMargin   = ((netProfit / revenue) * 100).toFixed(1)

  const pnlRows = [
    { label: 'Gross Sales',               value: revenue,             indent: 1, bold: false, color: T.textPrimary },
    { label: 'Discounts & Returns',       value: -2400,               indent: 1, bold: false, color: T.red },
    { label: 'NET REVENUE',               value: revenue - 2400,      indent: 0, bold: true,  color: T.gold,  divider: true },
    { label: 'Ingredient Cost (COGS)',    value: -cogs,               indent: 1, bold: false, color: T.red },
    { label: 'Wastage',                   value: -wastage,            indent: 1, bold: false, color: T.red },
    { label: 'GROSS PROFIT',              value: grossProfit,         indent: 0, bold: true,  color: T.green, divider: true },
    { label: 'Rent',                      value: -25000,              indent: 1, bold: false, color: T.textMuted },
    { label: 'Salaries',                  value: -45000,              indent: 1, bold: false, color: T.textMuted },
    { label: 'Electricity',              value: -8400,               indent: 1, bold: false, color: T.textMuted },
    { label: 'Gas',                       value: -2200,               indent: 1, bold: false, color: T.textMuted },
    { label: 'Marketing',                 value: -5000,               indent: 1, bold: false, color: T.textMuted },
    { label: 'Packaging',                 value: -3400,               indent: 1, bold: false, color: T.textMuted },
    { label: 'Other Expenses',           value: -(expenses - 25000 - 45000 - 8400 - 2200 - 5000 - 3400), indent: 1, bold: false, color: T.textMuted },
    { label: 'TOTAL EXPENSES',            value: -expenses,           indent: 0, bold: true,  color: T.red,   divider: true },
    { label: 'NET PROFIT',                value: netProfit,           indent: 0, bold: true,  color: netProfit > 0 ? T.green : T.red, divider: true, big: true },
  ]

  return (
    <div>
      <PageHeader title="Profit & Loss" subtitle="Complete financial overview of your restaurant"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="ghost" icon={Download}>Export PDF</Btn>
            <Btn variant="ghost" icon={Download}>Export CSV</Btn>
          </div>
        }
      />

      {/* Period tabs */}
      <div className='period-tabs' style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {PERIODS.map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{
            padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            border: `1px solid ${period === p ? T.gold : T.border}`,
            background: period === p ? `${T.gold}20` : 'transparent',
            color: period === p ? T.gold : T.textMuted, transition: 'all 0.15s', fontFamily: 'inherit' }}>{p}</button>
        ))}
      </div>

      {/* Hero KPIs */}
      <div className="grid-pnl-hero" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Revenue',      value: fmtINRFull(revenue),     color: T.gold,  sub: 'Gross sales' },
          { label: 'COGS',         value: fmtINRFull(cogs+wastage), color: T.red,  sub: 'Ingredient + wastage' },
          { label: 'Gross Profit', value: fmtINRFull(grossProfit), color: T.green, sub: `${grossMargin}% margin` },
          { label: 'Expenses',     value: fmtINRFull(expenses),    color: T.amber, sub: 'Operating costs' },
          { label: 'Net Profit',   value: fmtINRFull(netProfit),   color: netProfit > 0 ? T.green : T.red, sub: `${netMargin}% margin` },
        ].map(m => (
          <Card key={m.label} style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: m.color, letterSpacing: '-0.5px' }}>{m.value}</div>
            <div style={{ fontSize: 12, color: T.textPrimary, fontWeight: 700, marginTop: 5 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{m.sub}</div>
          </Card>
        ))}
      </div>

      <div className="pnl-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* P&L Statement */}
        <Card style={{ padding: 22 }}>
          <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: '0 0 20px', fontSize: 14 }}>P&L Statement — {period}</h3>
          {pnlRows.map((row, i) => (
            <div key={i}>
              {row.divider && i > 0 && <div style={{ height: 1, background: T.border, margin: '6px 0' }}/>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: (row as { big?: boolean }).big ? '10px 0' : '6px 0', paddingLeft: row.indent ? 20 : 0 }}>
                <span style={{ fontSize: (row as { big?: boolean }).big ? 15 : 13, fontWeight: row.bold ? 800 : 500, color: row.bold ? T.textPrimary : T.textSecondary }}>{row.label}</span>
                <span style={{ fontSize: (row as { big?: boolean }).big ? 16 : 13, fontWeight: row.bold ? 800 : 600, color: row.color, fontVariantNumeric: 'tabular-nums' }}>
                  {row.value < 0 ? `-${fmtINRFull(Math.abs(row.value))}` : fmtINRFull(row.value)}
                </span>
              </div>
            </div>
          ))}
        </Card>

        {/* Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: 20 }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: '0 0 16px', fontSize: 14 }}>Revenue vs Costs</h3>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={REVENUE_TREND} margin={{ left: -25, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: T.textMuted }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 10, fill: T.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`}/>
                <Tooltip content={<ChartTip/>}/>
                <Bar dataKey="revenue" name="Revenue" fill={T.gold}  radius={[4,4,0,0]} maxBarSize={18}/>
                <Bar dataKey="cogs"    name="COGS"    fill={T.red}   radius={[4,4,0,0]} maxBarSize={18} opacity={0.85}/>
                <Bar dataKey="profit"  name="Profit"  fill={T.green} radius={[4,4,0,0]} maxBarSize={18}/>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card style={{ padding: 20 }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: '0 0 16px', fontSize: 14 }}>Expense Breakdown</h3>
            {[
              ['Salaries',   45000, '#5B9BD5'],
              ['Rent',       25000, '#C9A84C'],
              ['Electricity', 8400, '#A855F7'],
              ['Marketing',   5000, '#4CAF7D'],
              ['Packaging',   3400, '#F5A623'],
              ['Other',       6200, '#8A7A72'],
            ].map(([label, val, color]) => (
              <div key={String(label)} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: T.textSecondary }}>{String(label)}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.textPrimary }}>{fmtINRFull(Number(val))}</span>
                </div>
                <div style={{ height: 4, background: T.surfaceEl, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(Number(val)/45000)*100}%`, background: String(color), borderRadius: 2 }}/>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
