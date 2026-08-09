'use client'
import { useT } from '@/lib/themeContext'
export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { MetricCard, Card, StatusBadge, DataTable, Btn, SearchBar, PageHeader } from '@/components/ui'
import { INGREDIENTS, fmtINRFull } from '@/lib/mockData'
import { Package, AlertTriangle, XCircle, Warehouse, Plus, Filter, X, Check, ChevronDown } from 'lucide-react'

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 999,
  background: 'rgba(0,0,0,0.8)',
  display: 'flex', alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16,
}


const INPUT: React.CSSProperties = {
  width: '100%', padding: '10px 13px', background: T.surfaceEl,
  border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
  color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }

const LABEL: React.CSSProperties = {
  display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted,
  textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 }

function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.target.style.borderColor = T.burgundy
}
function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.target.style.borderColor = T.border
}

const UNITS = ['KG', 'GRAM', 'LITRE', 'ML', 'PCS', 'PACK', 'BOX', 'BOTTLE', 'DOZEN']
const CATEGORIES = ['Protein', 'Dairy', 'Dry Goods', 'Vegetables', 'Oils', 'Sauces', 'Spices', 'Bakery', 'Other']

// ─── ADD INGREDIENT MODAL ─────────────────────────────────────────────────────
function AddIngredientModal({ onClose }: { onClose: () => void }) {
  const T = useT()
  const [form, setForm] = useState({
    name: '', sku: '', category: 'Protein', unit: 'KG',
    minStock: '', maxStock: '', reorderLevel: '', avgCost: '',
    supplier: '' })
  const [done, setDone] = useState(false)

  function set(k: string, v: string) { setForm(p => ({ ...p, [k]: v })) }

  const stockValue = form.avgCost && form.minStock
    ? Number(form.avgCost) * Number(form.minStock) : null

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 20, width: '100%', maxWidth: 680,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', maxHeight: 'calc(100vh - 24px)',
        display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold}, ${T.burgundy})`, flexShrink: 0 }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>Add Ingredient</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>Add a new ingredient to your inventory</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* Name + SKU */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={LABEL}>Ingredient Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="e.g. Chicken Breast" style={INPUT}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>SKU / Code</label>
              <input value={form.sku} onChange={e => set('sku', e.target.value)}
                placeholder="e.g. CHK-001" style={INPUT}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
          </div>

          {/* Category + Unit */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={LABEL}>Category</label>
              <div style={{ position: 'relative' }}>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  style={{ ...INPU appearance: 'none', paddingRight: 36, cursor: 'pointer' }}
                  onFocus={focusBorder} onBlur={blurBorder}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} color={T.textMuted} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>
            <div>
              <label style={LABEL}>Unit of Measurement</label>
              <div style={{ position: 'relative' }}>
                <select value={form.unit} onChange={e => set('unit', e.target.value)}
                  style={{ ...INPU appearance: 'none', paddingRight: 36, cursor: 'pointer' }}
                  onFocus={focusBorder} onBlur={blurBorder}>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <ChevronDown size={14} color={T.textMuted} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>
          </div>

          {/* Stock levels */}
          <div style={{ padding: '16px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${T.border}`, marginBottom: 16 }}>
            <p style={{ color: T.textSecondary, fontWeight: 700, fontSize: 12, margin: '0 0 14px', letterSpacing: '0.02em' }}>📦 Stock Level Thresholds</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {[
                { key: 'minStock', label: 'Minimum Stock', placeholder: '10', hint: 'Alert below this' },
                { key: 'reorderLevel', label: 'Reorder Level', placeholder: '15', hint: 'Trigger reorder here' },
                { key: 'maxStock', label: 'Maximum Stock', placeholder: '50', hint: 'Upper storage limit' },
              ].map(({ key, label, placeholder, hint }) => (
                <div key={key}>
                  <label style={LABEL}>{label}</label>
                  <input type="number" value={form[key as keyof typeof form]} onChange={e => set(key, e.target.value)}
                    placeholder={placeholder}
                    style={{ ...INPU background: T.bg }}
                    onFocus={focusBorder} onBlur={blurBorder}/>
                  <p style={{ color: T.textSubtle, fontSize: 10, marginTop: 4, fontWeight: 500 }}>{hint}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cost + Supplier */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={LABEL}>Average Cost (₹ per {form.unit})</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: T.textMuted, fontSize: 13, fontWeight: 600 }}>₹</span>
                <input type="number" value={form.avgCost} onChange={e => set('avgCost', e.target.value)}
                  placeholder="0.00"
                  style={{ ...INPU paddingLeft: 28 }}
                  onFocus={focusBorder} onBlur={blurBorder}/>
              </div>
            </div>
            <div>
              <label style={LABEL}>Primary Supplier</label>
              <input value={form.supplier} onChange={e => set('supplier', e.target.value)}
                placeholder="e.g. Ram Poultry Farms" style={INPUT}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
          </div>

          {/* Live preview */}
          {(form.name || form.avgCost) && (
            <div style={{ padding: '14px 16px', background: `${T.gold}0E`, border: `1px solid ${T.gold}30`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: T.textPrimary, fontWeight: 700, fontSize: 13, margin: 0 }}>{form.name || 'Ingredient Name'}</p>
                <p style={{ color: T.textMuted, fontSize: 11, margin: '3px 0 0' }}>{form.category} · {form.unit}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: T.gold, fontWeight: 800, fontSize: 15, margin: 0 }}>₹{form.avgCost || '0'}/{form.unit}</p>
                {stockValue && <p style={{ color: T.textMuted, fontSize: 11, margin: '3px 0 0' }}>Min stock value: {fmtINRFull(stockValue)}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, flexShrink: 0, background: T.surfaceEl }}>
          <button onClick={onClose} style={{ flex: 1, padding: 11, borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={() => { if (!form.name) return; setDone(true); setTimeout(onClose, 900) }} style={{
            flex: 2, padding: 11, borderRadius: 10, border: 'none', fontFamily: 'inherit',
            background: done ? T.green : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(155,35,53,0.3)', transition: 'all 0.2s' }}>
            {done ? <><Check size={15}/> Ingredient Added!</> : <><Plus size={15}/> Add Ingredient</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── ADD PURCHASE MODAL ───────────────────────────────────────────────────────
function AddPurchaseModal({ onClose }: { onClose: () => void }) {
  const T = useT()
  const [items, setItems] = useState([{ ingredient: '', qty: '', unit: 'KG', unitPrice: '', tax: '0', total: 0 }])
  const [form, setForm] = useState({ supplier: '', invoiceNo: '', date: new Date().toISOString().split('T')[0], notes: '' })
  const [done, setDone] = useState(false)

  function setF(k: string, v: string) { setForm(p => ({ ...p, [k]: v })) }

  function updateItem(i: number, k: string, v: string) {
    setItems(prev => prev.map((item, idx) => {
      if (idx !== i) return item
      const updated = { ...item, [k]: v }
      const qty = Number(updated.qty) || 0
      const price = Number(updated.unitPrice) || 0
      const tax = Number(updated.tax) || 0
      updated.total = qty * price * (1 + tax / 100)
      return updated
    }))
  }

  function addRow() {
    setItems(prev => [...prev, { ingredient: '', qty: '', unit: 'KG', unitPrice: '', tax: '0', total: 0 }])
  }

  function removeRow(i: number) {
    if (items.length === 1) return
    setItems(prev => prev.filter((_, idx) => idx !== i))
  }

  const grandTotal = items.reduce((s, r) => s + r.total, 0)

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 20, width: '100%', maxWidth: 780,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', maxHeight: 'calc(100vh - 24px)',
        display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.green}, #2E8B57, ${T.green})`, flexShrink: 0 }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>New Purchase</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>Record a stock purchase from supplier</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* Supplier details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={LABEL}>Supplier *</label>
              <input value={form.supplier} onChange={e => setF('supplier', e.target.value)}
                placeholder="e.g. Ram Poultry Farms" style={INPUT}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>Invoice Number</label>
              <input value={form.invoiceNo} onChange={e => setF('invoiceNo', e.target.value)}
                placeholder="e.g. INV-2024-001" style={INPUT}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>Purchase Date</label>
              <input type="date" value={form.date} onChange={e => setF('date', e.target.value)}
                style={{ ...INPU colorScheme: 'dark' }}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
          </div>

          {/* Items table */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <label style={{ ...LABEL, margin: 0 }}>Purchase Items</label>
              <button onClick={addRow} style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 8,
                border: `1px solid ${T.border}`, background: T.surfaceEl, color: T.textSecondary,
                fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                <Plus size={13}/> Add Row
              </button>
            </div>

            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 1fr 70px 80px 32px', gap: 8, padding: '8px 10px', background: T.surfaceEl, borderRadius: '8px 8px 0 0', borderBottom: `1px solid ${T.border}` }}>
              {['Ingredient', 'Qty', 'Unit', 'Unit Price', 'Tax %', 'Total', ''].map(h => (
                <span key={h} style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
              ))}
            </div>

            {items.map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 1fr 70px 80px 32px', gap: 8, padding: '8px 10px', borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? 'transparent' : `${T.surfaceEl}50`, alignItems: 'center' }}>
                <input value={item.ingredient} onChange={e => updateItem(i, 'ingredient', e.target.value)}
                  placeholder="Ingredient name"
                  style={{ ...INPU padding: '7px 10px', fontSize: 12 }}
                  onFocus={focusBorder} onBlur={blurBorder}/>
                <input type="number" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)}
                  placeholder="0"
                  style={{ ...INPU padding: '7px 10px', fontSize: 12 }}
                  onFocus={focusBorder} onBlur={blurBorder}/>
                <div style={{ position: 'relative' }}>
                  <select value={item.unit} onChange={e => updateItem(i, 'unit', e.target.value)}
                    style={{ ...INPU padding: '7px 8px', fontSize: 11, appearance: 'none', paddingRight: 20 }}>
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: T.textMuted, fontSize: 12 }}>₹</span>
                  <input type="number" value={item.unitPrice} onChange={e => updateItem(i, 'unitPrice', e.target.value)}
                    placeholder="0"
                    style={{ ...INPU padding: '7px 8px 7px 20px', fontSize: 12 }}
                    onFocus={focusBorder} onBlur={blurBorder}/>
                </div>
                <input type="number" value={item.tax} onChange={e => updateItem(i, 'tax', e.target.value)}
                  placeholder="0"
                  style={{ ...INPU padding: '7px 10px', fontSize: 12 }}
                  onFocus={focusBorder} onBlur={blurBorder}/>
                <div style={{ color: item.total > 0 ? T.green : T.textMuted, fontWeight: 700, fontSize: 12, textAlign: 'right' }}>
                  {item.total > 0 ? fmtINRFull(item.total) : '—'}
                </div>
                <button onClick={() => removeRow(i)} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: 'transparent', cursor: items.length === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: items.length === 1 ? 0.3 : 1, color: T.red }}>
                  <X size={12}/>
                </button>
              </div>
            ))}

            {/* Grand total */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, padding: '12px 10px', background: T.surfaceEl, borderRadius: '0 0 8px 8px', borderTop: `1px solid ${T.border}` }}>
              <span style={{ color: T.textMuted, fontSize: 13, fontWeight: 600 }}>Grand Total</span>
              <span style={{ color: T.gold, fontWeight: 800, fontSize: 18 }}>{fmtINRFull(grandTotal)}</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={LABEL}>Notes</label>
            <textarea value={form.notes} onChange={e => setF('notes', e.target.value)}
              placeholder="Any additional notes about this purchase…" rows={2}
              style={{ ...INPU resize: 'vertical', lineHeight: 1.6 }}/>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, flexShrink: 0, background: T.surfaceEl }}>
          <button onClick={onClose} style={{ flex: 1, padding: 11, borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={() => { setDone(true); setTimeout(onClose, 900) }} style={{
            flex: 2, padding: 11, borderRadius: 10, border: 'none', fontFamily: 'inherit',
            background: done ? T.green : `linear-gradient(135deg, #2E8B57, #1A5C38)`,
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(46,139,87,0.3)', transition: 'all 0.2s' }}>
            {done ? <><Check size={15}/> Purchase Recorded!</> : <><Check size={15}/> Record Purchase · {grandTotal > 0 ? fmtINRFull(grandTotal) : '₹0'}</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function IngredientsPage() {
  const T = useT()
  const [showAddIngredient, setShowAddIngredient] = useState(false)
  const [showAddPurchase, setShowAddPurchase] = useState(false)

  const totalValue = INGREDIENTS.reduce((s, i) => s + i.stockValue, 0)
  const lowCount   = INGREDIENTS.filter(i => i.status === 'low' || i.status === 'critical').length
  const outCount   = INGREDIENTS.filter(i => i.status === 'out').length

  return (
    <div>
      {showAddIngredient && <AddIngredientModal onClose={() => setShowAddIngredient(false)}/>}
      {showAddPurchase   && <AddPurchaseModal   onClose={() => setShowAddPurchase(false)}/>}

      <PageHeader
        title="Ingredients & Stock"
        subtitle="Manage your inventory and ingredient costs"
        action={<Btn icon={Plus} onClick={() => setShowAddIngredient(true)}>Add Ingredient</Btn>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="Total Inventory Value" value={fmtINRFull(totalValue)} icon={Warehouse}     color={T.gold}/>
        <MetricCard label="Total Ingredients"     value={INGREDIENTS.length}     icon={Package}       color={T.blue}/>
        <MetricCard label="Low / Critical Stock"  value={lowCount}               icon={AlertTriangle} color={T.amber}/>
        <MetricCard label="Out of Stock"          value={outCount}               icon={XCircle}       color={T.red}/>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <SearchBar placeholder="Search ingredients…"/>
        <Btn variant="ghost" icon={Filter}>Filter</Btn>
        <div style={{ marginLeft: 'auto' }}>
          <Btn icon={Plus} variant="gold" onClick={() => setShowAddPurchase(true)}>Add Purchase</Btn>
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
            { key: 'min',        label: 'Min Level',  render: (v, r) => `${v} ${(r as { unit: string }).unit}` },
            { key: 'reorder',    label: 'Reorder At', render: (v, r) => `${v} ${(r as { unit: string }).unit}` },
            { key: 'avgCost',    label: 'Avg Cost',   render: (v, r) => `₹${v}/${(r as { unit: string }).unit}` },
            { key: 'stockValue', label: 'Stock Value', render: v => <span style={{ fontWeight: 700, color: T.gold }}>{fmtINRFull(Number(v))}</span> },
            { key: 'status',     label: 'Status',     render: (_, r) => <StatusBadge status={String((r as { status: string }).status)}/> },
            { key: 'id', label: '', render: () => (
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ padding: '5px 12px', borderRadius: 7, border: `1px solid ${T.border}`, background: T.surfaceEl, color: T.textMuted, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.burgundy; (e.currentTarget as HTMLElement).style.color = T.textPrimary }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.textMuted }}>
                  Edit
                </button>
                <button style={{ padding: '5px 12px', borderRadius: 7, border: `1px solid ${T.border}`, background: T.surfaceEl, color: T.textMuted, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.amber; (e.currentTarget as HTMLElement).style.color = T.amber }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.textMuted }}>
                  Adjust
                </button>
              </div>
            )},
          ]}
          data={INGREDIENTS as Record<string, unknown>[]}
        />
      </Card>
    </div>
  )
}
