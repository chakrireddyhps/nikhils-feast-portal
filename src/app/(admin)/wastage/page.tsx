'use client'
import { useT } from '@/lib/themeContext'
export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { MetricCard, Card, DataTable, Btn, PageHeader, ChartTip } from '@/components/ui'
import { WASTAGE, fmtINRFull } from '@/lib/mockData'
import { Trash2, BarChart3, TrendingDown, ReceiptText, AlertTriangle, Plus, Filter, X, Check, ChevronDown } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 999,
  background: 'rgba(0,0,0,0.8)',
  display: 'flex', alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16,
}




const REASONS = ['Expired', 'Burnt', 'Damaged', 'Overproduction', 'Spillage', 'Preparation Waste', 'Storage Issue', 'Other']
const UNITS = ['KG', 'GRAM', 'LITRE', 'ML', 'PCS', 'PACK']
const INGREDIENTS_LIST = [
  'Chicken (Whole)', 'Chicken Breast', 'Prawns (Frozen)', 'Fish Fillet', 'Paneer',
  'All-Purpose Flour', 'Refined Oil', 'Bread Buns', 'Waffle Mix', 'Chocolate Sauce',
  'Baby Corn', 'Mushroom', 'Mixed Spices', 'Cheese Slices', 'Brownie Mix', 'Chicken Keema',
]

const REASON_COLORS: Record<string, string> = {
  Expired: '#E05A5A', Spillage: '#F5A623', Overproduction: '#C0272D',
  Burnt: '#5B9BD5', 'Preparation Waste': '#A855F7', 'Storage Issue': '#4CAF7D',
  Damaged: '#F97316', Other: '#7A6A63' }

// ─── RECORD WASTAGE MODAL ─────────────────────────────────────────────────────
function RecordWastageModal({ onClose }: { onClose: () => void }) {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const INPUT: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { e.target.style.borderColor = T.red }
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { e.target.style.borderColor = T.border }
  const [rows, setRows] = useState([{ ingredient: '', qty: '', unit: 'KG', cost: '', reason: 'Expired', total: 0 }])
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], notes: '', recordedBy: '' })
  const [done, setDone] = useState(false)

  function setF(k: string, v: string) { setForm(p => ({ ...p, [k]: v })) }

  function updateRow(i: number, k: string, v: string) {
    setRows(prev => prev.map((row, idx) => {
      if (idx !== i) return row
      const updated = { ...row, [k]: v }
      const qty = Number(updated.qty) || 0
      const cost = Number(updated.cost) || 0
      updated.total = qty * cost
      return updated
    }))
  }

  const totalWastage = rows.reduce((s, r) => s + r.total, 0)

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{
        background: T.surface, border: `1px solid rgba(224,90,90,0.2)`,
        borderRadius: 20, width: '100%', maxWidth: 760,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', maxHeight: 'calc(100vh - 24px)',
        display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.red}, #A83232, ${T.red})`, flexShrink: 0 }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>Record Wastage</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>Log food wastage to track losses and update inventory</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* Date + Recorded By */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={LABEL}>Date *</label>
              <input type="date" value={form.date} onChange={e => setF('date', e.target.value)}
                style={{ ...INPU colorScheme: 'dark' }} onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>Recorded By</label>
              <input value={form.recordedBy} onChange={e => setF('recordedBy', e.target.value)}
                placeholder="Staff name" style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
          </div>

          {/* Wastage items */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <label style={{ ...LABEL, margin: 0 }}>Wastage Items *</label>
              <button onClick={() => setRows(p => [...p, { ingredient: '', qty: '', unit: 'KG', cost: '', reason: 'Expired', total: 0 }])}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.surfaceEl, color: T.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                <Plus size={13}/> Add Row
              </button>
            </div>

            <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
              {/* Headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 80px 70px 100px 150px 90px 32px', gap: 8, padding: '9px 12px', background: T.surfaceEl, borderBottom: `1px solid ${T.border}` }}>
                {['Ingredient', 'Qty', 'Unit', 'Cost/Unit (₹)', 'Reason', 'Wastage Value', ''].map(h => (
                  <span key={h} style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
                ))}
              </div>

              {rows.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 80px 70px 100px 150px 90px 32px', gap: 8, padding: '8px 12px', borderBottom: i < rows.length - 1 ? `1px solid ${T.border}` : 'none', alignItems: 'center', background: i % 2 === 0 ? 'transparent' : `${T.surfaceEl}40` }}>
                  {/* Ingredient */}
                  <div style={{ position: 'relative' }}>
                    <select value={row.ingredient} onChange={e => updateRow(i, 'ingredient', e.target.value)}
                      style={{ ...INPU padding: '7px 24px 7px 10px', fontSize: 12, appearance: 'none' }}
                      onFocus={focusBorder} onBlur={blurBorder}>
                      <option value="">Select…</option>
                      {INGREDIENTS_LIST.map(ing => <option key={ing} value={ing}>{ing}</option>)}
                    </select>
                    <ChevronDown size={11} color={T.textMuted} style={{ position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
                  </div>
                  {/* Qty */}
                  <input type="number" value={row.qty} onChange={e => updateRow(i, 'qty', e.target.value)}
                    placeholder="0" style={{ ...INPU padding: '7px 8px', fontSize: 12 }}
                    onFocus={focusBorder} onBlur={blurBorder}/>
                  {/* Unit */}
                  <div style={{ position: 'relative' }}>
                    <select value={row.unit} onChange={e => updateRow(i, 'unit', e.target.value)}
                      style={{ ...INPU padding: '7px 4px', fontSize: 11, appearance: 'none', textAlign: 'center' }}>
                      {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  {/* Cost */}
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: T.textMuted, fontSize: 12 }}>₹</span>
                    <input type="number" value={row.cost} onChange={e => updateRow(i, 'cost', e.target.value)}
                      placeholder="0" style={{ ...INPU padding: '7px 8px 7px 20px', fontSize: 12 }}
                      onFocus={focusBorder} onBlur={blurBorder}/>
                  </div>
                  {/* Reason */}
                  <div style={{ position: 'relative' }}>
                    <select value={row.reason} onChange={e => updateRow(i, 'reason', e.target.value)}
                      style={{ ...INPU padding: '7px 24px 7px 10px', fontSize: 11, appearance: 'none',
                        color: REASON_COLORS[row.reason] || T.textSecondary }}
                      onFocus={focusBorder} onBlur={blurBorder}>
                      {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <ChevronDown size={11} color={T.textMuted} style={{ position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
                  </div>
                  {/* Total */}
                  <div style={{ color: row.total > 0 ? T.red : T.textSubtle, fontWeight: 700, fontSize: 13, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {row.total > 0 ? `-${fmtINRFull(row.total)}` : '—'}
                  </div>
                  {/* Remove */}
                  <button onClick={() => { if (rows.length > 1) setRows(p => p.filter((_, idx) => idx !== i)) }}
                    style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: 'transparent', cursor: rows.length === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.red, opacity: rows.length === 1 ? 0.3 : 1 }}>
                    <X size={12}/>
                  </button>
                </div>
              ))}

              {/* Total row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: `${T.red}0A`, borderTop: `1px solid rgba(224,90,90,0.2)` }}>
                <span style={{ color: T.textSecondary, fontSize: 13, fontWeight: 700 }}>Total Wastage Value</span>
                <span style={{ color: T.red, fontWeight: 800, fontSize: 18, fontVariantNumeric: 'tabular-nums' }}>
                  {totalWastage > 0 ? `-${fmtINRFull(totalWastage)}` : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={LABEL}>Notes</label>
            <textarea value={form.notes} onChange={e => setF('notes', e.target.value)}
              placeholder="Any additional context about this wastage…" rows={2}
              style={{ ...INPU resize: 'vertical', lineHeight: 1.6 } as React.CSSProperties}
              onFocus={focusBorder} onBlur={blurBorder}/>
          </div>

          {/* Warning note */}
          {totalWastage > 0 && (
            <div style={{ marginTop: 14, padding: '12px 16px', background: `${T.red}0D`, border: `1px solid rgba(224,90,90,0.25)`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertTriangle size={15} color={T.red}/>
              <p style={{ color: T.textSecondary, fontSize: 12, margin: 0, fontWeight: 500 }}>
                Recording this will deduct <strong style={{ color: T.red }}>{fmtINRFull(totalWastage)}</strong> from your inventory value and update your P&L reports.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, flexShrink: 0, background: T.surfaceEl }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={() => { setDone(true); setTimeout(onClose, 900) }} style={{
            flex: 2, padding: '11px', borderRadius: 10, border: 'none', fontFamily: 'inherit',
            background: done ? T.green : `linear-gradient(135deg, ${T.red}, #A83232)`,
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(224,90,90,0.25)', transition: 'all 0.2s' }}>
            {done
              ? <><Check size={15}/> Wastage Recorded!</>
              : <><Trash2 size={15}/> Record Wastage{totalWastage > 0 ? ` · -${fmtINRFull(totalWastage)}` : ''}</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function WastagePage() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const [showRecord, setShowRecord] = useState(false)
  const totalWastage = WASTAGE.reduce((s, w) => s + w.total, 0)

  const byReason = WASTAGE.reduce((acc: Record<string, number>, w) => {
    acc[w.reason] = (acc[w.reason] || 0) + w.total
    return acc
  }, {})
  const pieData = Object.entries(byReason).map(([name, value]) => ({
    name, value, color: REASON_COLORS[name] || T.textMuted })).sort((a, b) => b.value - a.value)

  return (
    <div>
      {showRecord && <RecordWastageModal onClose={() => setShowRecord(false)}/>}

      <PageHeader
        title="Wastage Management"
        subtitle="Track and reduce food wastage"
        action={<Btn icon={Plus} onClick={() => setShowRecord(true)}>Record Wastage</Btn>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="Today's Wastage" value={fmtINRFull(408)}         icon={Trash2}      color={T.red}   trend={6.3}/>
        <MetricCard label="This Week"       value={fmtINRFull(totalWastage)} icon={BarChart3}   color={T.amber}/>
        <MetricCard label="Wastage %"       value="4.4%"                    icon={TrendingDown} color={T.textPrimary}/>
        <MetricCard label="Records"         value={WASTAGE.length}          icon={ReceiptText}  color={T.blue}/>
      </div>

      {/* Alert banner */}
      <div style={{ background: `${T.red}08`, border: `1px solid rgba(224,90,90,0.25)`, borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <AlertTriangle size={16} color={T.red}/>
        <span style={{ color: T.textSecondary, fontSize: 13, fontWeight: 600 }}>
          Highest wastage this week: <strong style={{ color: T.textPrimary }}>Chicken (Whole)</strong> — ₹360 lost due to overproduction
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        {/* Records table */}
        <Card>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: 0, fontSize: 15 }}>Wastage Records</h3>
            <Btn variant="ghost" icon={Filter} small>Filter</Btn>
          </div>
          <DataTable
            columns={[
              { key: 'date',       label: 'Date',        render: v => <span style={{ fontSize: 12, color: T.textMuted }}>{String(v)}</span> },
              { key: 'ingredient', label: 'Ingredient',  render: v => <span style={{ fontWeight: 700, color: T.textPrimary }}>{String(v)}</span> },
              { key: 'qty',        label: 'Qty',         render: (v, r) => `${v} ${(r as { unit: string }).unit}` },
              { key: 'total',      label: 'Value',       render: v => <span style={{ color: T.red, fontWeight: 700 }}>₹{String(v)}</span> },
              { key: 'reason',     label: 'Reason',      render: v => (
                <span style={{ fontSize: 11, fontWeight: 700, color: REASON_COLORS[String(v)] || T.amber,
                  background: `${REASON_COLORS[String(v)] || T.amber}15`, padding: '3px 9px', borderRadius: 20,
                  border: `1px solid ${REASON_COLORS[String(v)] || T.amber}30` }}>
                  {String(v)}
                </span>
              )},
              { key: 'by', label: 'Recorded By', render: v => <span style={{ fontSize: 12, color: T.textMuted }}>{String(v)}</span> },
            ]}
            data={WASTAGE as Record<string, unknown>[]}
          />
        </Card>

        {/* Breakdown chart */}
        <Card style={{ padding: 22 }}>
          <h3 style={{ color: T.textPrimary, fontWeight: 700, margin: '0 0 4px', fontSize: 15 }}>By Reason</h3>
          <p style={{ color: T.textMuted, fontSize: 12, marginBottom: 18 }}>This week</p>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%"
                innerRadius={48} outerRadius={72} paddingAngle={2} strokeWidth={0}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip content={<ChartTip/>}
                contentStyle={{ background: T.surfaceEl, border: `1px solid ${T.borderEl}`, borderRadius: 10, fontSize: 11 }}/>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {pieData.map(d => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.textSecondary }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: d.color, flexShrink: 0 }}/>
                  {d.name}
                </span>
                <span style={{ color: T.red, fontWeight: 700, fontSize: 12 }}>₹{d.value}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.textSecondary }}>Total Wastage</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: T.red }}>{fmtINRFull(totalWastage)}</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
