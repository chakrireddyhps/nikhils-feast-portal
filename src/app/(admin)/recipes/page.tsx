'use client'
import { useT } from '@/lib/themeContext'
export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { Card, Btn, SearchBar, PageHeader } from '@/components/ui'
import { RECIPES, MENU_ITEMS } from '@/lib/mockData'
import { Plus, Edit, X, Check, ChevronDown, Trash2, BookOpen } from 'lucide-react'

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

const UNITS = ['g', 'kg', 'ml', 'L', 'pcs', 'tbsp', 'tsp', 'cup']
const INGREDIENTS_LIST = [
  'Chicken (Whole)', 'Chicken Breast', 'Prawns (Frozen)', 'Fish Fillet', 'Paneer',
  'All-Purpose Flour', 'Refined Oil', 'Bread Buns', 'Waffle Mix', 'Chocolate Sauce',
  'Baby Corn', 'Mushroom', 'Mixed Spices', 'Cheese Slices', 'Oreo Biscuits',
  'Brownie Mix', 'Chicken Keema', 'Kit Kat', 'Butter', 'Sugar', 'Egg', 'Milk',
]

const ITEMS_WITHOUT_RECIPE = MENU_ITEMS.filter(m => !RECIPES.find(r => r.item === m.name)).slice(0, 8)

type RecipeRow = { ingredient: string; qty: string; unit: string; cost: string; total: number }
type Recipe = typeof RECIPES[0]

// ─── ADD / EDIT RECIPE MODAL ──────────────────────────────────────────────────
function RecipeModal({ initial, menuItem, onClose }: {
  initial?: Recipe | null
  menuItem?: string
  onClose: () => void
}) {
  const T = useT()
  const isEdit = !!initial
  const [selectedItem, setSelectedItem] = useState(initial?.item || menuItem || '')
  const [yield_, setYield] = useState('1')
  const [rows, setRows] = useState<RecipeRow[]>(
    initial?.ingredients.map(i => ({
      ingredient: i.name, qty: String(i.qty), unit: i.unit,
      cost: String((i.cost / i.qty * 100).toFixed(0)), total: i.cost })) || [{ ingredient: '', qty: '', unit: 'g', cost: '', total: 0 }]
  )
  const [done, setDone] = useState(false)

  function updateRow(i: number, k: string, v: string) {
    setRows(prev => prev.map((row, idx) => {
      if (idx !== i) return row
      const updated = { ...row, [k]: v }
      const qty = Number(updated.qty) || 0
      const cost = Number(updated.cost) || 0
      // cost is per 100g/ml, qty is in that unit
      updated.total = (qty * cost) / 100
      return updated
    }))
  }

  const totalCost = rows.reduce((s, r) => s + r.total, 0)
  const menuItemObj = MENU_ITEMS.find(m => m.name === selectedItem)
  const sellingPrice = menuItemObj?.price || 0
  const grossProfit = sellingPrice - totalCost
  const margin = sellingPrice > 0 ? ((grossProfit / sellingPrice) * 100).toFixed(1) : null
  const foodCostPct = sellingPrice > 0 ? ((totalCost / sellingPrice) * 100).toFixed(1) : null

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 20, width: '100%', maxWidth: 800,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', maxHeight: 'calc(100vh - 24px)',
        display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold}, ${T.burgundy})`, flexShrink: 0 }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>{isEdit ? 'Edit Recipe' : 'Add Recipe'}</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>
              {isEdit ? `Editing recipe for ${initial?.item}` : 'Define ingredient costs for a menu item'}
            </p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* Menu item + yield */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={LABEL}>Menu Item *</label>
              <div style={{ position: 'relative' }}>
                <select value={selectedItem} onChange={e => setSelectedItem(e.target.value)}
                  disabled={isEdit}
                  style={{ ...INPUT, appearance: 'none', paddingRight: 36, cursor: isEdit ? 'not-allowed' : 'pointer', opacity: isEdit ? 0.7 : 1 }}
                  onFocus={focusBorder} onBlur={blurBorder}>
                  <option value="">Select menu item…</option>
                  {MENU_ITEMS.map(m => <option key={m.id} value={m.name}>{m.name} — ₹{m.price}</option>)}
                </select>
                <ChevronDown size={14} color={T.textMuted} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>
            <div>
              <label style={LABEL}>Yield (servings)</label>
              <input type="number" value={yield_} onChange={e => setYield(e.target.value)}
                placeholder="1" style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
          </div>

          {/* Live profitability preview */}
          {selectedItem && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Selling Price', value: sellingPrice ? `₹${sellingPrice}` : '—', color: T.gold },
                { label: 'Recipe Cost',   value: totalCost > 0 ? `₹${totalCost.toFixed(2)}` : '—', color: T.red },
                { label: 'Gross Profit',  value: grossProfit > 0 ? `₹${grossProfit.toFixed(2)}` : '—', color: T.green },
                { label: 'Food Cost %',   value: foodCostPct ? `${foodCostPct}%` : '—', color: T.amber },
              ].map(m => (
                <div key={m.label} style={{ padding: '12px 14px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: m.color, fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: T.textMuted, marginTop: 3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Margin bar */}
          {margin && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 600 }}>Gross Margin</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: Number(margin) > 60 ? T.green : Number(margin) > 45 ? T.amber : T.red }}>{margin}%</span>
              </div>
              <div style={{ height: 7, background: T.surfaceEl, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(Number(margin), 100)}%`, borderRadius: 4,
                  background: Number(margin) > 60 ? `linear-gradient(90deg, ${T.green}, ${T.goldLight})` : Number(margin) > 45 ? T.amber : T.red,
                  transition: 'width 0.4s ease' }}/>
              </div>
            </div>
          )}

          {/* Ingredients table */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <label style={{ ...LABEL, margin: 0 }}>Ingredients *</label>
              <button onClick={() => setRows(p => [...p, { ingredient: '', qty: '', unit: 'g', cost: '', total: 0 }])}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.surfaceEl, color: T.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                <Plus size={13}/> Add Ingredient
              </button>
            </div>

            <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
              {/* Headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 80px 70px 120px 90px 32px', gap: 8, padding: '9px 14px', background: T.surfaceEl, borderBottom: `1px solid ${T.border}` }}>
                {['Ingredient', 'Qty', 'Unit', 'Cost/100 units (₹)', 'Line Cost', ''].map(h => (
                  <span key={h} style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
                ))}
              </div>

              {rows.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 80px 70px 120px 90px 32px', gap: 8, padding: '8px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${T.border}` : 'none', alignItems: 'center', background: i % 2 === 0 ? 'transparent' : `${T.surfaceEl}40` }}>
                  {/* Ingredient */}
                  <div style={{ position: 'relative' }}>
                    <select value={row.ingredient} onChange={e => updateRow(i, 'ingredient', e.target.value)}
                      style={{ ...INPUT, padding: '7px 24px 7px 10px', fontSize: 12, appearance: 'none' }}
                      onFocus={focusBorder} onBlur={blurBorder}>
                      <option value="">Select…</option>
                      {INGREDIENTS_LIST.map(ing => <option key={ing} value={ing}>{ing}</option>)}
                    </select>
                    <ChevronDown size={11} color={T.textMuted} style={{ position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
                  </div>
                  {/* Qty */}
                  <input type="number" value={row.qty} onChange={e => updateRow(i, 'qty', e.target.value)}
                    placeholder="0" style={{ ...INPUT, padding: '7px 8px', fontSize: 12 }}
                    onFocus={focusBorder} onBlur={blurBorder}/>
                  {/* Unit */}
                  <div style={{ position: 'relative' }}>
                    <select value={row.unit} onChange={e => updateRow(i, 'unit', e.target.value)}
                      style={{ ...INPUT, padding: '7px 4px', fontSize: 11, appearance: 'none', textAlign: 'center' }}>
                      {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  {/* Cost per 100 */}
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: T.textMuted, fontSize: 12 }}>₹</span>
                    <input type="number" value={row.cost} onChange={e => updateRow(i, 'cost', e.target.value)}
                      placeholder="0" style={{ ...INPUT, padding: '7px 8px 7px 20px', fontSize: 12 }}
                      onFocus={focusBorder} onBlur={blurBorder}/>
                  </div>
                  {/* Line cost */}
                  <div style={{ color: row.total > 0 ? T.textPrimary : T.textSubtle, fontWeight: 700, fontSize: 12, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {row.total > 0 ? `₹${row.total.toFixed(2)}` : '—'}
                  </div>
                  {/* Remove */}
                  <button onClick={() => { if (rows.length > 1) setRows(p => p.filter((_, idx) => idx !== i)) }}
                    style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: 'transparent', cursor: rows.length === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.red, opacity: rows.length === 1 ? 0.3 : 1 }}>
                    <X size={12}/>
                  </button>
                </div>
              ))}

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: T.surfaceEl, borderTop: `1px solid ${T.border}` }}>
                <span style={{ color: T.textSecondary, fontSize: 13, fontWeight: 700 }}>Total Recipe Cost</span>
                <span style={{ color: T.red, fontWeight: 800, fontSize: 17, fontVariantNumeric: 'tabular-nums' }}>
                  {totalCost > 0 ? `₹${totalCost.toFixed(2)}` : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, flexShrink: 0, background: T.surfaceEl }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={() => { setDone(true); setTimeout(onClose, 900) }} style={{
            flex: 2, padding: '11px', borderRadius: 10, border: 'none', fontFamily: 'inherit',
            background: done ? T.green : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(155,35,53,0.3)', transition: 'all 0.2s' }}>
            {done ? <><Check size={15}/> Recipe Saved!</> : <><Check size={15}/> {isEdit ? 'Save Changes' : 'Create Recipe'}</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function RecipesPage() {
  const T = useT()
  const [selected, setSelected] = useState<Recipe>(RECIPES[0])
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = RECIPES.filter(r => r.item.toLowerCase().includes(search.toLowerCase()))

  const grossProfit   = selected.sellingPrice - selected.cost
  const margin        = ((grossProfit / selected.sellingPrice) * 100).toFixed(1)
  const foodCostPct   = ((selected.cost / selected.sellingPrice) * 100).toFixed(1)

  return (
    <div>
      {(showModal || editMode) && (
        <RecipeModal
          initial={editMode ? selected : null}
          onClose={() => { setShowModal(false); setEditMode(false) }}
        />
      )}

      <PageHeader
        title="Recipes / Bill of Materials"
        subtitle="Define ingredient costs for every menu item"
        action={<Btn icon={Plus} onClick={() => setShowModal(true)}>Add Recipe</Btn>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>

        {/* ── LEFT: Recipe list ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card style={{ overflow: 'hidden', flexShrink: 0 }}>
            {/* Search */}
            <div style={{ padding: '12px 14px', borderBottom: `1px solid ${T.border}` }}>
              <SearchBar placeholder="Search recipes…"/>
            </div>

            {/* List */}
            <div style={{ maxHeight: 480, overflowY: 'auto' }}>
              {filtered.map(r => {
                const isActive = selected?.id === r.id
                const gp = r.sellingPrice - r.cost
                const mg = ((gp / r.sellingPrice) * 100).toFixed(0)
                return (
                  <div key={r.id} onClick={() => setSelected(r)}
                    style={{
                      padding: '14px 18px', borderBottom: `1px solid ${T.border}`, cursor: 'pointer',
                      background: isActive ? `${T.burgundy}20` : 'transparent',
                      borderLeft: `3px solid ${isActive ? T.burgundyLight : 'transparent'}`,
                      transition: 'all 0.12s' }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = T.surfaceEl }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                    <div style={{ fontWeight: 700, color: T.textPrimary, fontSize: 13, marginBottom: 5 }}>{r.item}</div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: T.textMuted }}>Cost: <span style={{ color: T.red, fontWeight: 700 }}>₹{r.cost}</span></span>
                      <span style={{ fontSize: 11, color: T.textMuted }}>·</span>
                      <span style={{ fontSize: 11, color: T.textMuted }}>Price: <span style={{ color: T.gold, fontWeight: 700 }}>₹{r.sellingPrice}</span></span>
                      <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 800,
                        color: Number(mg) > 60 ? T.green : Number(mg) > 45 ? T.amber : T.red }}>
                        {mg}%
                      </span>
                    </div>
                    {/* Mini margin bar */}
                    <div style={{ height: 2, background: T.surfaceEl, borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${mg}%`, borderRadius: 2,
                        background: Number(mg) > 60 ? T.green : Number(mg) > 45 ? T.amber : T.red }}/>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Items without recipe */}
          <Card style={{ padding: 16 }}>
            <p style={{ color: T.textMuted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 10px' }}>
              No Recipe ({ITEMS_WITHOUT_RECIPE.length} items)
            </p>
            {ITEMS_WITHOUT_RECIPE.slice(0, 5).map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 12, color: T.textSecondary, fontWeight: 500 }}>{item.name}</span>
                <button onClick={() => setShowModal(true)}
                  style={{ fontSize: 11, fontWeight: 700, color: T.burgundyLight, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  + Add
                </button>
              </div>
            ))}
          </Card>
        </div>

        {/* ── RIGHT: Recipe detail ── */}
        {selected && (
          <Card style={{ padding: 24 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
              <div>
                <h2 style={{ color: T.textPrimary, fontWeight: 800, fontSize: 22, margin: 0, letterSpacing: '-0.02em' }}>{selected.item}</h2>
                <p style={{ color: T.textMuted, fontSize: 12, marginTop: 4 }}>Yield: {(selected as {yieldQty?: number}).yieldQty ?? 1} serving · {selected.ingredients.length} ingredients</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setEditMode(true)} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10,
                  border: `1px solid ${T.border}`, background: T.surfaceEl,
                  color: T.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.burgundy; (e.currentTarget as HTMLElement).style.color = T.textPrimary }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.textSecondary }}>
                  <Edit size={13}/> Edit Recipe
                </button>
              </div>
            </div>

            {/* Profitability cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 22 }}>
              {[
                { label: 'Selling Price', value: `₹${selected.sellingPrice}`, color: T.gold },
                { label: 'Recipe Cost',   value: `₹${selected.cost}`,         color: T.red  },
                { label: 'Gross Profit',  value: `₹${grossProfit}`,           color: T.green },
                { label: 'Food Cost %',   value: `${foodCostPct}%`,           color: T.amber },
              ].map(m => (
                <div key={m.label} style={{ padding: '16px', background: T.surfaceEl, borderRadius: 14, border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, borderRadius: '50%', background: `radial-gradient(circle, ${m.color}15 0%, transparent 70%)`, transform: 'translate(15px,-15px)' }}/>
                  <div style={{ fontSize: 22, fontWeight: 800, color: m.color, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: T.textMuted, marginTop: 5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Margin bar */}
            <div style={{ marginBottom: 26 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: T.textSecondary, fontWeight: 600 }}>Gross Margin</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: Number(margin) > 60 ? T.green : Number(margin) > 45 ? T.amber : T.red }}>{margin}%</span>
              </div>
              <div style={{ height: 8, background: T.surfaceEl, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(Number(margin), 100)}%`, borderRadius: 4,
                  background: Number(margin) > 60 ? `linear-gradient(90deg, ${T.green}, ${T.goldLight})` : Number(margin) > 45 ? T.amber : T.red,
                  transition: 'width 0.6s ease' }}/>
              </div>
            </div>

            {/* Ingredients table */}
            <h4 style={{ color: T.textSecondary, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Ingredients</h4>
            <div style={{ border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: T.surfaceEl }}>
                    {['Ingredient', 'Qty', 'Unit', 'Line Cost', '% of Recipe'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selected.ingredients.map((ing, idx) => (
                    <tr key={idx} style={{ borderTop: `1px solid ${T.border}` }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.surfaceHov}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                      <td style={{ padding: '13px 16px', fontWeight: 700, color: T.textPrimary, fontSize: 13 }}>{ing.name}</td>
                      <td style={{ padding: '13px 16px', color: T.textSecondary, fontSize: 13 }}>{ing.qty}</td>
                      <td style={{ padding: '13px 16px', color: T.textMuted, fontSize: 13 }}>{ing.unit}</td>
                      <td style={{ padding: '13px 16px', fontWeight: 700, color: T.textPrimary, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>₹{ing.cost.toFixed(2)}</td>
                      <td style={{ padding: '13px 16px', fontSize: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1, height: 4, background: T.surfaceEl, borderRadius: 2, overflow: 'hidden', maxWidth: 80 }}>
                            <div style={{ height: '100%', width: `${(ing.cost / selected.cost) * 100}%`, background: T.burgundyLight, borderRadius: 2 }}/>
                          </div>
                          <span style={{ color: T.textMuted, minWidth: 36, textAlign: 'right' }}>{((ing.cost / selected.cost) * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr style={{ borderTop: `2px solid ${T.border}`, background: T.surfaceEl }}>
                    <td style={{ padding: '13px 16px', fontWeight: 800, color: T.textPrimary, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Recipe Cost</td>
                    <td colSpan={2} style={{ padding: '13px 16px' }}/>
                    <td style={{ padding: '13px 16px', fontWeight: 800, color: T.red, fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>₹{selected.cost}</td>
                    <td style={{ padding: '13px 16px', color: T.textMuted, fontSize: 12, fontWeight: 700 }}>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
