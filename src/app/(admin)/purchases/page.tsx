'use client'
import { useT } from '@/lib/themeContext'
export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { MetricCard, Card, StatusBadge, DataTable, Btn, SearchBar, PageHeader } from '@/components/ui'
import { PURCHASES, fmtINRFull } from '@/lib/mockData'
import { ShoppingCart, ReceiptText, Users, Check, Plus, Filter, Download, X, Eye, ChevronDown, ArrowUpRight } from 'lucide-react'

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 999,
  background: 'rgba(0,0,0,0.8)',
  display: 'flex', alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16,
}





const UNITS = ['KG', 'GRAM', 'LITRE', 'ML', 'PCS', 'PACK', 'BOX', 'BOTTLE', 'DOZEN']

const MOCK_INGREDIENTS_LIST = [
  'Chicken (Whole)', 'Chicken Breast', 'Prawns (Frozen)', 'Fish Fillet', 'Paneer',
  'All-Purpose Flour', 'Refined Oil', 'Bread Buns', 'Waffle Mix', 'Chocolate Sauce',
  'Baby Corn', 'Mushroom', 'Mixed Spices', 'Cheese Slices', 'Oreo Biscuits',
  'Brownie Mix', 'Chicken Keema', 'Kit Kat',
]

// ─── VIEW PURCHASE MODAL ──────────────────────────────────────────────────────
function ViewPurchaseModal({ purchase, onClose }: { purchase: typeof PURCHASES[0]; onClose: () => void }) {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const INPUT: React.CSSProperties = { width: '100%', padding: '10px 13px', background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.textPrimary, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' }
  function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const INPUT: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
    function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }
 purchase, onClose }: { purchase: typeof PURCHASES[0]; onClose: () => void }) {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const mockItems = [
    { ingredient: 'Chicken (Whole)', qty: 10, unit: 'KG', unitPrice: 180, tax: 0, total: 1800 },
    { ingredient: 'Chicken Breast',  qty: 5,  unit: 'KG', unitPrice: 240, tax: 0, total: 1200 },
    { ingredient: 'Mixed Spices',    qty: 2,  unit: 'KG', unitPrice: 280, tax: 5, total: 588  },
    { ingredient: 'Refined Oil',     qty: 10, unit: 'L',  unitPrice: 140, tax: 0, total: 1400 },
  ].slice(0, purchase.items)

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 20, width: '100%', maxWidth: 640,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', maxHeight: 'calc(100vh - 24px)',
        display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.green}, #2E8B57, ${T.green})`, flexShrink: 0 }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>{purchase.id}</h3>
              <StatusBadge status={purchase.status}/>
            </div>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>{purchase.supplier} · {purchase.date}</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {/* Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 22 }}>
            {[
              { label: 'Total Amount', value: fmtINRFull(purchase.total), color: T.gold },
              { label: 'Items',        value: `${purchase.items} ingredients`, color: T.textPrimary },
              { label: 'Status',       value: purchase.status,  color: T.green },
            ].map(m => (
              <div key={m.label} style={{ padding: '12px 14px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: 10, color: T.textMuted, marginTop: 3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Items table */}
          <h4 style={{ color: T.textSecondary, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Purchase Items</h4>
          <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 0, padding: '10px 14px', background: T.surfaceEl, borderBottom: `1px solid ${T.border}` }}>
              {['Ingredient', 'Qty', 'Unit Price', 'Tax', 'Total'].map(h => (
                <span key={h} style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
              ))}
            </div>
            {mockItems.map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '12px 14px', borderBottom: i < mockItems.length - 1 ? `1px solid ${T.border}` : 'none', alignItems: 'center' }}>
                <span style={{ color: T.textPrimary, fontWeight: 600, fontSize: 13 }}>{item.ingredient}</span>
                <span style={{ color: T.textSecondary, fontSize: 13 }}>{item.qty} {item.unit}</span>
                <span style={{ color: T.textSecondary, fontSize: 13 }}>₹{item.unitPrice}</span>
                <span style={{ color: T.textMuted, fontSize: 13 }}>{item.tax}%</span>
                <span style={{ color: T.gold, fontWeight: 700, fontSize: 13 }}>{fmtINRFull(item.total)}</span>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '12px 14px', background: T.surfaceEl, borderTop: `1px solid ${T.border}` }}>
              <span style={{ color: T.textPrimary, fontWeight: 800, fontSize: 13, gridColumn: '1/5' }}>Grand Total</span>
              <span style={{ color: T.gold, fontWeight: 800, fontSize: 15 }}>{fmtINRFull(purchase.total)}</span>
            </div>
          </div>

          {/* Inventory impact note */}
          <div style={{ marginTop: 16, padding: '12px 16px', background: `${T.green}0D`, border: `1px solid ${T.green}30`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <ArrowUpRight size={16} color={T.green}/>
            <p style={{ color: T.textSecondary, fontSize: 12, margin: 0, fontWeight: 500 }}>
              This purchase has been received and inventory has been updated accordingly.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, flexShrink: 0, background: T.surfaceEl }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          <button style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: T.surfaceHov, color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Download size={14}/> Export PDF
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── NEW PURCHASE MODAL ───────────────────────────────────────────────────────
function NewPurchaseModal({ onClose }: { onClose: () => void }) {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const INPUT: React.CSSProperties = { width: '100%', padding: '10px 13px', background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.textPrimary, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' }
  function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const INPUT: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
    function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }
 onClose }: { onClose: () => void }) {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const [rows, setRows] = useState([{ ingredient: '', qty: '', unit: 'KG', unitPrice: '', tax: '0', total: 0 }])
  const [form, setForm] = useState({ supplier: '', invoiceNo: '', date: new Date().toISOString().split('T')[0], notes: '', paymentMethod: 'CASH' })
  const [done, setDone] = useState(false)

  function setF(k: string, v: string) { setForm(p => ({ ...p, [k]: v })) }

  function updateRow(i: number, k: string, v: string) {
    setRows(prev => prev.map((row, idx) => {
      if (idx !== i) return row
      const updated = { ...row, [k]: v }
      const qty = Number(updated.qty) || 0
      const price = Number(updated.unitPrice) || 0
      const tax = Number(updated.tax) || 0
      updated.total = qty * price * (1 + tax / 100)
      return updated
    }))
  }

  const grandTotal = rows.reduce((s, r) => s + r.total, 0)

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 20, width: '100%', maxWidth: 800,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', maxHeight: 'calc(100vh - 24px)',
        display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.green}, #2E8B57, ${T.green})`, flexShrink: 0 }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>New Purchase</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>Record a new stock purchase from supplier</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* Supplier details */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={LABEL}>Supplier *</label>
              <input value={form.supplier} onChange={e => setF('supplier', e.target.value)}
                placeholder="e.g. Ram Poultry Farms" style={INPUT}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>Invoice Number</label>
              <input value={form.invoiceNo} onChange={e => setF('invoiceNo', e.target.value)}
                placeholder="INV-2024-001" style={INPUT}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>Purchase Date</label>
              <input type="date" value={form.date} onChange={e => setF('date', e.target.value)}
                style={{ ...INPU colorScheme: 'dark' }}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
          </div>

          {/* Payment method */}
          <div style={{ marginBottom: 20 }}>
            <label style={LABEL}>Payment Method</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['CASH', 'BANK_TRANSFER', 'CARD', 'UPI'].map(p => (
                <button key={p} onClick={() => setF('paymentMethod', p)} style={{
                  padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', border: `1px solid ${form.paymentMethod === p ? T.green : T.border}`,
                  background: form.paymentMethod === p ? `${T.green}18` : T.surfaceEl,
                  color: form.paymentMethod === p ? T.green : T.textMuted,
                  fontFamily: 'inherit', transition: 'all 0.15s' }}>{p.replace('_', ' ')}</button>
              ))}
            </div>
          </div>

          {/* Items */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <label style={{ ...LABEL, margin: 0 }}>Purchase Items *</label>
              <button onClick={() => setRows(p => [...p, { ingredient: '', qty: '', unit: 'KG', unitPrice: '', tax: '0', total: 0 }])}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.surfaceEl, color: T.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                <Plus size={13}/> Add Row
              </button>
            </div>

            <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
              {/* Col headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 90px 80px 110px 70px 90px 32px', gap: 8, padding: '9px 12px', background: T.surfaceEl, borderBottom: `1px solid ${T.border}` }}>
                {['Ingredient', 'Qty', 'Unit', 'Unit Price (₹)', 'Tax %', 'Total', ''].map(h => (
                  <span key={h} style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
                ))}
              </div>

              {rows.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 90px 80px 110px 70px 90px 32px', gap: 8, padding: '8px 12px', borderBottom: i < rows.length - 1 ? `1px solid ${T.border}` : 'none', alignItems: 'center', background: i % 2 === 0 ? 'transparent' : `${T.surfaceEl}40` }}>
                  {/* Ingredient */}
                  <div style={{ position: 'relative' }}>
                    <select value={row.ingredient} onChange={e => updateRow(i, 'ingredient', e.target.value)}
                      style={{ ...INPU padding: '7px 28px 7px 10px', fontSize: 12, appearance: 'none' }}
                      onFocus={focusBorder} onBlur={blurBorder}>
                      <option value="">Select…</option>
                      {MOCK_INGREDIENTS_LIST.map(ing => <option key={ing} value={ing}>{ing}</option>)}
                    </select>
                    <ChevronDown size={12} color={T.textMuted} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
                  </div>
                  {/* Qty */}
                  <input type="number" value={row.qty} onChange={e => updateRow(i, 'qty', e.target.value)}
                    placeholder="0" style={{ ...INPU padding: '7px 10px', fontSize: 12 }}
                    onFocus={focusBorder} onBlur={blurBorder}/>
                  {/* Unit */}
                  <div style={{ position: 'relative' }}>
                    <select value={row.unit} onChange={e => updateRow(i, 'unit', e.target.value)}
                      style={{ ...INPU padding: '7px 4px', fontSize: 11, appearance: 'none', textAlign: 'center' }}>
                      {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  {/* Unit Price */}
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: T.textMuted, fontSize: 12 }}>₹</span>
                    <input type="number" value={row.unitPrice} onChange={e => updateRow(i, 'unitPrice', e.target.value)}
                      placeholder="0" style={{ ...INPU padding: '7px 8px 7px 22px', fontSize: 12 }}
                      onFocus={focusBorder} onBlur={blurBorder}/>
                  </div>
                  {/* Tax */}
                  <input type="number" value={row.tax} onChange={e => updateRow(i, 'tax', e.target.value)}
                    placeholder="0" style={{ ...INPU padding: '7px 10px', fontSize: 12 }}
                    onFocus={focusBorder} onBlur={blurBorder}/>
                  {/* Total */}
                  <div style={{ color: row.total > 0 ? T.green : T.textSubtle, fontWeight: 700, fontSize: 12, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {row.total > 0 ? fmtINRFull(row.total) : '—'}
                  </div>
                  {/* Remove */}
                  <button onClick={() => { if (rows.length > 1) setRows(p => p.filter((_, idx) => idx !== i)) }}
                    style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: 'transparent', cursor: rows.length === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.red, opacity: rows.length === 1 ? 0.3 : 1 }}>
                    <X size={12}/>
                  </button>
                </div>
              ))}

              {/* Grand Total row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: T.surfaceEl, borderTop: `1px solid ${T.border}` }}>
                <span style={{ color: T.textSecondary, fontSize: 13, fontWeight: 700 }}>Grand Total ({rows.length} {rows.length === 1 ? 'item' : 'items'})</span>
                <span style={{ color: T.gold, fontWeight: 800, fontSize: 18, fontVariantNumeric: 'tabular-nums' }}>{fmtINRFull(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={LABEL}>Notes</label>
            <textarea value={form.notes} onChange={e => setF('notes', e.target.value)}
              placeholder="Any additional notes…" rows={2}
              style={{ ...INPU resize: 'vertical', lineHeight: 1.6 } as React.CSSProperties}/>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0, background: T.surfaceEl }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={() => { setDone(true); setTimeout(onClose, 900) }} style={{
            flex: 2, padding: '11px', borderRadius: 10, border: 'none', fontFamily: 'inherit',
            background: done ? T.green : `linear-gradient(135deg, #2E8B57, #1A5C38)`,
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(46,139,87,0.3)', transition: 'all 0.2s' }}>
            {done
              ? <><Check size={15}/> Purchase Recorded!</>
              : <><Check size={15}/> Record Purchase{grandTotal > 0 ? ` · ${fmtINRFull(grandTotal)}` : ''}</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PurchasesPage() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const [showNew, setShowNew] = useState(false)
  const [viewPurchase, setViewPurchase] = useState<typeof PURCHASES[0] | null>(null)

  return (
    <div>
      {showNew && <NewPurchaseModal onClose={() => setShowNew(false)}/>}
      {viewPurchase && <ViewPurchaseModal purchase={viewPurchase} onClose={() => setViewPurchase(null)}/>}

      <PageHeader
        title="Stock Purchases"
        subtitle="Record and track your ingredient purchases"
        action={<Btn icon={Plus} onClick={() => setShowNew(true)}>New Purchase</Btn>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="This Month Purchases" value="₹23,240"    icon={ShoppingCart} color={T.gold}/>
        <MetricCard label="Purchase Orders"       value={5}          icon={ReceiptText}  color={T.blue}/>
        <MetricCard label="Suppliers"             value={4}          icon={Users}        color="#A855F7"/>
        <MetricCard label="Pending Orders"        value={0}          icon={Check}        color={T.green}/>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
        <SearchBar placeholder="Search purchases…"/>
        <Btn variant="ghost" icon={Filter}>Filter</Btn>
        <div style={{ marginLeft: 'auto' }}>
          <Btn variant="ghost" icon={Download}>Export</Btn>
        </div>
      </div>

      <Card>
        <DataTable
          columns={[
            { key: 'id',       label: 'Purchase #', render: v => <span style={{ color: T.gold, fontWeight: 700 }}>{String(v)}</span> },
            { key: 'date',     label: 'Date', render: v => <span style={{ color: T.textMuted, fontSize: 12 }}>{String(v)}</span> },
            { key: 'supplier', label: 'Supplier', render: v => <span style={{ color: T.textPrimary, fontWeight: 600 }}>{String(v)}</span> },
            { key: 'items',    label: 'Items' },
            { key: 'total',    label: 'Total', render: v => <span style={{ fontWeight: 700, color: T.textPrimary }}>{fmtINRFull(Number(v))}</span> },
            { key: 'status',   label: 'Status', render: (_, r) => <StatusBadge status={String((r as { status: string }).status)}/> },
            { key: 'id', label: '', render: (_, r) => (
              <button
                onClick={() => setViewPurchase(r as typeof PURCHASES[0])}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 14px', borderRadius: 8,
                  border: `1px solid ${T.border}`, background: T.surfaceEl,
                  color: T.textSecondary, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.green; (e.currentTarget as HTMLElement).style.color = T.green }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.textSecondary }}>
                <Eye size={13}/> View
              </button>
            )},
          ]}
          data={PURCHASES as Record<string, unknown>[]}
        />
      </Card>
    </div>
  )
}
