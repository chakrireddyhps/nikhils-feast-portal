'use client'
export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { MetricCard, Card, DataTable, Btn, SearchBar, PageHeader, ChartTip } from '@/components/ui'
import { useTheme } from '@/lib/themeContext'
import { T as _DARK_ EXPENSES, fmtINRFull } from '@/lib/mockData'
import { Wallet, RefreshCw, Zap, Layers, Plus, Download, Edit, X, Check, ChevronDown, RefreshCcw } from 'lucide-react'
import { PieChart, Pie, Cellooltip, ResponsiveContainer } from 'recharts'

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 999,
  background: 'rgba(0,0,0,0.8)',
  display: 'flex', alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }

const INPUT: React.CSSProperties = {
  width: '100%', padding: '10px 13px', background: T.surfaceEl,
  border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
  color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }

const LABEL: React.CSSProperties = {
  display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted,
  textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 }

function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = T.burgundy
}
function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = T.border
}

const EXPENSE_CATEGORIES = [
  'Rent', 'Salaries', 'Electricity', 'Gas', 'Internet',
  'Marketing', 'Packaging', 'Delivery', 'Maintenance',
  'Equipment', 'Software', 'Other',
]

const PAYMENT_METHODS = ['CASH', 'BANK_TRANSFER', 'CARD', 'UPI', 'ONLINE', 'CHEQUE']

const CATEGORY_COLORS: Record<string, string> = {
  Salaries: '#5B9BD5', Rent: '#C0272D', Electricity: '#A855F7',
  Gas: '#F97316', Internet: '#06B6D4', Marketing: '#4CAF7D',
  Packaging: '#F5A623', Delivery: '#EC4899', Maintenance: '#8B5CF6',
  Equipment: '#C9A84C', Software: '#10B981', Other: '#6B7280' }

type Expense = typeof EXPENSES[0]

// ─── ADD / EDIT EXPENSE MODAL ─────────────────────────────────────────────────
function ExpenseModal({ initial, onClose }: { initial?: Expense | null; onClose: () => void }) {
  const isEdit = !!initial
  const [form, setForm] = useState({
    name:          initial?.name          ?? '',
    category:      initial?.category      ?? 'Rent',
    amount:        initial ? String(initial.amount) : '',
    date:          initial?.date          ?? new Date().toISOString().split('T')[0],
    payment:       initial?.payment       ?? 'CASH',
    recurring:     initial?.recurring     ?? false,
    recurringFreq: 'MONTHLY',
    notes:         '' })
  const [done, setDone] = useState(false)

  function set(k: string, v: string | boolean) { setForm(p => ({ ...p, [k]: v })) }

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 20, width: '100%', maxWidth: 560,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', maxHeight: 'calc(100vh - 24px)',
        display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold}, ${T.burgundy})`, flexShrink: 0 }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>{isEdit ? 'Edit Expense' : 'Add Expense'}</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>{isEdit ? `Editing — ${initial?.name}` : 'Record a new operating expense'}</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL}>Expense Name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="e.g. Monthly Rent, Electricity Bill"
              style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
          </div>

          {/* Category + Amount */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={LABEL}>Category *</label>
              <div style={{ position: 'relative' }}>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  style={{ ...INPU appearance: 'none', paddingRight: 36, cursor: 'pointer' }}
                  onFocus={focusBorder} onBlur={blurBorder}>
                  {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} color={T.textMuted} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
              {/* Category colour preview */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: CATEGORY_COLORS[form.category] || T.textMuted }}/>
                <span style={{ fontSize: 11, color: T.textMuted }}>{form.category}</span>
              </div>
            </div>
            <div>
              <label style={LABEL}>Amount (₹) *</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: T.textMuted, fontSize: 14, fontWeight: 700 }}>₹</span>
                <input type="number" value={form.amount} onChange={e => set('amount', e.target.value)}
                  placeholder="0"
                  style={{ ...INPU paddingLeft: 28, fontSize: 16, fontWeight: 800, color: form.amount ? T.textPrimary : T.textMuted }}
                  onFocus={focusBorder} onBlur={blurBorder}/>
              </div>
              {form.amount && (
                <p style={{ color: T.textMuted, fontSize: 11, marginTop: 5 }}>
                  {fmtINRFull(Number(form.amount))}
                </p>
              )}
            </div>
          </div>

          {/* Date + Payment */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={LABEL}>Date *</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                style={{ ...INPU colorScheme: 'dark' }} onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>Payment Method</label>
              <div style={{ position: 'relative' }}>
                <select value={form.payment} onChange={e => set('payment', e.target.value)}
                  style={{ ...INPU appearance: 'none', paddingRight: 36, cursor: 'pointer' }}
                  onFocus={focusBorder} onBlur={blurBorder}>
                  {PAYMENT_METHODS.map(p => <option key={p} value={p}>{p.replace('_', ' ')}</option>)}
                </select>
                <ChevronDown size={14} color={T.textMuted} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>
          </div>

          {/* Recurring toggle */}
          <div style={{ padding: '16px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${form.recurring ? T.blue + '50' : T.border}`, marginBottom: 16, transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: form.recurring ? `${T.blue}18` : T.bg, border: `1px solid ${form.recurring ? T.blue + '40' : T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  <RefreshCcw size={15} color={form.recurring ? T.blue : T.textMuted}/>
                </div>
                <div>
                  <p style={{ color: T.textPrimary, fontWeight: 700, fontSize: 13, margin: 0 }}>Recurring Expense</p>
                  <p style={{ color: T.textMuted, fontSize: 11, margin: '2px 0 0' }}>Repeat this expense automatically</p>
                </div>
              </div>
              {/* Toggle switch */}
              <button onClick={() => set('recurring', !form.recurring)} style={{
                width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative',
                background: form.recurring ? T.blue : T.border, transition: 'background 0.2s' }}>
                <span style={{
                  position: 'absolute', top: 3, left: form.recurring ? 22 : 3,
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}/>
              </button>
            </div>

            {form.recurring && (
              <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                {['WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'].map(f => (
                  <button key={f} onClick={() => set('recurringFreq', f)} style={{
                    padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                    cursor: 'pointer', border: `1px solid ${form.recurringFreq === f ? T.blue : T.border}`,
                    background: form.recurringFreq === f ? `${T.blue}18` : 'transparent',
                    color: form.recurringFreq === f ? T.blue : T.textMuted, fontFamily: 'inherit' }}>{f.charAt(0) + f.slice(1).toLowerCase()}</button>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label style={LABEL}>Notes</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
              placeholder="Any additional details about this expense…" rows={2}
              style={{ ...INPU resize: 'vertical', lineHeight: 1.6 } as React.CSSProperties}
              onFocus={focusBorder} onBlur={blurBorder}/>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, flexShrink: 0, background: T.surfaceEl }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={() => { if (!form.name || !form.amount) return; setDone(true); setTimeout(onClose, 900) }} style={{
            flex: 2, padding: '11px', borderRadius: 10, border: 'none', fontFamily: 'inherit',
            background: done ? T.green : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(155,35,53,0.3)', transition: 'all 0.2s' }}>
            {done
              ? <><Check size={15}/> {isEdit ? 'Changes Saved!' : 'Expense Added!'}</>
              : <><Plus size={15}/> {isEdit ? 'Save Changes' : `Add Expense${form.amount ? ` · ${fmtINRFull(Number(form.amount))}` : ''}`}</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ExpensesPage() {
  const T = useT()
  const [showModal, setShowModal] = useState(false)
  const [editExpense, setEditExpense] = useState<Expense | null>(null)

  const totalExp  = EXPENSES.reduce((s, e) => s + e.amount, 0)
  const recurExp  = EXPENSES.filter(e => e.recurring).reduce((s, e) => s + e.amount, 0)
  const oneTime   = EXPENSES.filter(e => !e.recurring).reduce((s, e) => s + e.amount, 0)

  const byCategory = EXPENSES.reduce((acc: Record<string, number>, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})
  const pieData = Object.entries(byCategory)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || T.textMuted }))
    .sort((a, b) => b.value - a.value)

  return (
    <div>
      {(showModal || editExpense) && (
        <ExpenseModal
          initial={editExpense}
          onClose={() => { setShowModal(false); setEditExpense(null) }}
        />
      )}

      <PageHeader
        title="Expenses"
        subtitle="Track your operating expenses"
        action={<Btn icon={Plus} onClick={() => setShowModal(true)}>Add Expense</Btn>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="This Month"  value={fmtINRFull(totalExp)} icon={Wallet}     color={T.gold}/>
        <MetricCard label="Recurring"   value={fmtINRFull(recurExp)} icon={RefreshCw}  color={T.blue}/>
        <MetricCard label="One-Time"    value={fmtINRFull(oneTime)}  icon={Zap}        color={T.amber}/>
        <MetricCard label="Categories"  value={Object.keys(byCategory).length} icon={Layers} color={T.textPrimary}/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        {/* Records table */}
        <Card>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: 0, fontSize: 15 }}>Expense Records</h3>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                    <span style={{ width: 7, height: 7, borderRadius: 2, background: CATEGORY_COLORS[(r as Expense).category] || T.textMuted, flexShrink: 0 }}/>
                    <span style={{ fontSize: 11, color: T.textMuted }}>{String((r as Expense).category)}</span>
                  </div>
                </div>
              )},
              { key: 'amount', label: 'Amount', render: v => <span style={{ fontWeight: 800, color: T.textPrimary, fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>{fmtINRFull(Number(v))}</span> },
              { key: 'date',   label: 'Date',   render: v => <span style={{ fontSize: 12, color: T.textMuted }}>{String(v)}</span> },
              { key: 'payment', label: 'Payment', render: v => <span style={{ fontSize: 12 }}>{String(v).replace('_', ' ')}</span> },
              { key: 'recurring', label: 'Type', render: v => (
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                  background: v ? `${T.blue}15` : T.surfaceEl,
                  color: v ? T.blue : T.textMuted,
                  border: `1px solid ${v ? T.blue + '30' : T.border}`,
                  display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {v ? <><RefreshCw size={10}/> Recurring</> : 'One-time'}
                </span>
              )},
              { key: 'id', label: '', render: (_, r) => (
                <button onClick={() => setEditExpense(r as Expense)}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.surfaceEl, color: T.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.burgundy; (e.currentTarget as HTMLElement).style.color = T.textPrimary }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.textSecondary }}>
                  <Edit size={12}/> Edit
                </button>
              )},
            ]}
            data={EXPENSES as Record<string, unknown>[]}
          />
        </Card>

        {/* Chart + breakdown */}
        <Card style={{ padding: 22 }}>
          <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: '0 0 4px', fontSize: 15 }}>By Category</h3>
          <p style={{ color: T.textMuted, fontSize: 12, marginBottom: 18 }}>This month</p>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%"
                innerRadius={48} outerRadius={74} paddingAngle={2} strokeWidth={0}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip content={<ChartTip/>}
                contentStyle={{ background: T.surfaceEl, border: `1px solid ${T.borderEl}`, borderRadius: 10, fontSize: 11 }}/>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
            {pieData.map(d => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.textSecondary }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: d.color, flexShrink: 0 }}/>
                  {d.name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 60, height: 3, background: T.surfaceEl, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(d.value / totalExp) * 100}%`, background: d.color, borderRadius: 2 }}/>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 12, color: T.textPrimary, minWidth: 52, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtINRFull(d.value)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.textSecondary }}>Total</span>
            <span style={{ fontSize: 17, fontWeight: 800, color: T.gold, fontVariantNumeric: 'tabular-nums' }}>{fmtINRFull(totalExp)}</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
