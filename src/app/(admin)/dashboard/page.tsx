'use client'
export const dynamic = 'force-dynamic'
import { MetricCard, Card, StatusBadge, OrderTypeBadge, ChartTip, DataTable, Btn } from '@/components/ui'
import { T, REVENUE_TREND, CATEGORY_SALES, TOP_ITEMS, ORDERS, INGREDIENTS, WASTAGE, EXPENSES, fmtINR, fmtINRFull } from '@/lib/mockData'
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, ShoppingBag, TrendingUp, Scale, Trash2, ReceiptText, AlertTriangle, Eye } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const today = REVENUE_TREND[6]
  const prev  = REVENUE_TREND[5]
  const wastageTotal = WASTAGE.reduce((s, w) => s + w.total, 0)
  const expensesTotal = EXPENSES.reduce((s, e) => s + e.amount, 0)
  const lowStock = INGREDIENTS.filter(i => i.status === 'low' || i.status === 'critical' || i.status === 'out')

  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: T.textPrimary, margin: 0 }}>Good evening, Nikhil 👋</h1>
        <p style={{ color: T.textMuted, fontSize: 13, marginTop: 4, fontWeight: 500 }}>Sunday, 14 January 2024 · Here&apos;s how your restaurant is performing</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Today's Revenue" value={fmtINR(today.revenue)} icon={DollarSign} color={T.gold} trend={((today.revenue-prev.revenue)/prev.revenue)*100}/>
        <MetricCard label="Orders Today" value={today.orders} icon={ShoppingBag} color={T.blue} trend={((today.orders-prev.orders)/prev.orders)*100}/>
        <MetricCard label="Avg Order Value" value={fmtINR(today.revenue/today.orders)} icon={TrendingUp} color="#A855F7" trend={3.5}/>
        <MetricCard label="Gross Profit" value={fmtINR(today.profit)} icon={TrendingUp} color={T.green} trend={((today.profit-prev.profit)/prev.profit)*100}/>
        <MetricCard label="Gross Margin" value={`${((today.profit/today.revenue)*100).toFixed(1)}%`} icon={Scale} color={T.gold} trend={1.8}/>
        <MetricCard label="Wastage Today" value={fmtINR(wastageTotal/7)} icon={Trash2} color={T.red} trend={-6.3}/>
        <MetricCard label="COGS" value={fmtINR(today.cogs)} icon={ReceiptText} color={T.textMuted}/>
        <MetricCard label="Net Profit" value={fmtINR(today.profit - expensesTotal/30)} icon={TrendingUp} color={T.green} trend={15.7}/>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: 0, fontSize: 14 }}>Revenue &amp; Profit</h3>
              <p style={{ color: T.textMuted, fontSize: 12, marginTop: 2 }}>Last 7 days</p>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              {[['Revenue', T.gold], ['Profit', T.green], ['COGS', T.red]].map(([l, c]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: T.textMuted }}>
                  <div style={{ width: 10, height: 3, borderRadius: 2, background: c }}/>
                  {l}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={REVENUE_TREND} margin={{ left: -20, right: 0, top: 4 }}>
              <defs>
                {[['rev', T.gold], ['prof', T.green], ['cogs', T.red]].map(([id, c]) => (
                  <linearGradient key={id} id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c as string} stopOpacity={0.25}/>
                    <stop offset="100%" stopColor={c as string} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: T.textMuted }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize: 10, fill: T.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => fmtINR(v)}/>
              <Tooltip content={<ChartTip/>}/>
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke={T.gold} strokeWidth={2} fill="url(#grev)" dot={false}/>
              <Area type="monotone" dataKey="profit"  name="Profit"  stroke={T.green} strokeWidth={2} fill="url(#gprof)" dot={false}/>
              <Area type="monotone" dataKey="cogs"    name="COGS"    stroke={T.red} strokeWidth={1.5} fill="url(#gcogs)" dot={false} strokeDasharray="4 2"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: 22 }}>
          <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>Sales by Category</h3>
          <p style={{ color: T.textMuted, fontSize: 12, marginBottom: 16 }}>This week</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CATEGORY_SALES} dataKey="value" cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={2} strokeWidth={0}>
                {CATEGORY_SALES.map((e, i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip formatter={(v: number) => [fmtINR(v), 'Revenue']} contentStyle={{ background: T.surfaceEl, border: `1px solid ${T.borderEl}`, borderRadius: 10, fontSize: 11 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 10px', marginTop: 8 }}>
            {CATEGORY_SALES.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.color, flexShrink: 0 }}/>
                <span style={{ color: T.textSecondary }}>{c.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Top Items */}
        <Card style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: 0, fontSize: 14 }}>Top Selling Items</h3>
            <Link href="/menu" style={{ color: T.burgundyLight, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
          </div>
          {TOP_ITEMS.map((item, i) => {
            const maxRev = TOP_ITEMS[0].revenue
            return (
              <div key={item.name} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: T.textSubtle, width: 18 }}>#{i+1}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.textSecondary }}>{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 11, color: T.textMuted }}>{item.sold} sold</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? T.gold : T.textPrimary }}>{fmtINR(item.revenue)}</span>
                    <span style={{ fontSize: 11, color: T.green }}>{item.margin}%</span>
                  </div>
                </div>
                <div style={{ height: 4, background: T.surfaceEl, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 2, width: `${(item.revenue/maxRev)*100}%`, background: i === 0 ? `linear-gradient(90deg,${T.gold},${T.goldLight})` : i === 1 ? `linear-gradient(90deg,${T.burgundy},${T.burgundyLight})` : T.surfaceHov, transition: 'width 0.8s ease' }}/>
                </div>
              </div>
            )
          })}
        </Card>

        {/* Low Stock */}
        <Card style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <AlertTriangle size={16} color={T.amber}/>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: 0, fontSize: 14 }}>Low Stock Alerts</h3>
          </div>
          {lowStock.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
              <div>
                <p style={{ color: T.textSecondary, fontSize: 12, fontWeight: 600, margin: 0 }}>{item.name}</p>
                <p style={{ color: T.textMuted, fontSize: 11, margin: '2px 0 0' }}>{item.current} {item.unit} · Min {item.min} {item.unit}</p>
              </div>
              <StatusBadge status={item.status}/>
            </div>
          ))}
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: `1px solid ${T.border}` }}>
          <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: 0, fontSize: 14 }}>Recent Orders</h3>
          <Link href="/orders"><Btn variant="ghost" small icon={Eye}>View All</Btn></Link>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'Order #', render: v => <span style={{ color: T.gold, fontWeight: 700, fontSize: 12 }}>{String(v)}</span> },
            { key: 'date', label: 'Time', render: v => String(v).split(' ')[1] },
            { key: 'type', label: 'Type', render: (_, r) => <OrderTypeBadge type={String((r as {type:string}).type)}/> },
            { key: 'items', label: 'Items' },
            { key: 'total', label: 'Total', render: v => <span style={{ fontWeight: 700, color: T.textPrimary }}>{fmtINRFull(Number(v))}</span> },
            { key: 'profit', label: 'Profit', render: v => <span style={{ color: T.green, fontWeight: 600 }}>{fmtINRFull(Number(v))}</span> },
            { key: 'status', label: 'Status', render: (_, r) => <StatusBadge status={String((r as {status:string}).status)}/> },
          ]}
          data={ORDERS.slice(0, 6) as Record<string, unknown>[]}
        />
      </Card>
    </div>
  )
}
