'use client'
import { useT } from '@/lib/themeContext'
export const dynamic = 'force-dynamic'

import React, { useState, useRef, useEffect } from 'react'
import { Card, Btn, SearchBar, PageHeader } from '@/components/ui'
import { MENU_ITEMS, CATEGORIES } from '@/lib/mockData'
import { Plus, Star, Flame, MoreHorizontal, X, Check, ChevronDown, Leaf, Zap, Edit, BookOpen, Copy, ToggleLeft, Trash2, AlertTriangle } from 'lucide-react'

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 999,
  background: 'rgba(0,0,0,0.8)',
  display: 'flex', alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16,
}

  Plus, Star, Flame, MoreHorizontal, X, Check, ChevronDown,
  Leaf, Zap, Edit, BookOpen, Copy, ToggleLeft, Trash2, AlertTriangle } from 'lucide-react'

type MenuItem = typeof MENU_ITEMS[0]

const CATEGORY_ICONS: Record<string, string> = {
  Chicken: '🍗', Prawns: '🦐', 'Apollo Fish': '🐟', Veg: '🥗',
  Burgers: '🍔', Rolls: '🌯', Waffles: '🧇', 'Fried Momos': '🥟',
  Desserts: '🍫', 'Special Offers': '⚡' }


function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = T.burgundy
}
function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = T.border
}

// ─── ITEM FORM (shared by Add + Edit) ────────────────────────────────────────
function ItemForm({
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const INPUT: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
    function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }
 initial, onSave, onClose, title, subtitle, saveLabel }: {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  initial: Partial<MenuItem>
  onSave: () => void
  onClose: () => void
  title: string
  subtitle: string
  saveLabel: string
}) {
  const [form, setForm] = useState({
    name:        initial.name        ?? '',
    category:    initial.category    ?? 'Chicken',
    price:       String(initial.price  ?? ''),
    cost:        String(initial.cost   ?? ''),
    veg:         initial.veg         ?? false,
    spicy:       initial.spicy       ?? false,
    featured:    initial.featured    ?? false,
    available:   initial.available   ?? true,
    description: '' })
  const [done, setDone] = useState(false)

  function set(key: string, val: string | boolean) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  const margin = form.price && form.cost
    ? (((Number(form.price) - Number(form.cost)) / Number(form.price)) * 100).toFixed(1)
    : null

  function handleSave() {
    if (!form.name || !form.price) return
    setDone(true)
    setTimeout(onSave, 900)
  }

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
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>{title}</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>{subtitle}</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* Name + Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={LABEL}>Item Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="e.g. Crispy Chicken Burger" style={INPUT}
                onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>Category *</label>
              <div style={{ position: 'relative' }}>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  style={{ ...INPUT, appearance: 'none', paddingRight: 36, cursor: 'pointer' }}
                  onFocus={focusBorder} onBlur={blurBorder}>
                  {CATEGORIES.map(c => <option key={c.name} value={c.name}>{CATEGORY_ICONS[c.name]} {c.name}</option>)}
                </select>
                <ChevronDown size={14} color={T.textMuted} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>
          </div>

          {/* Price + Cost + Margin */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 12 }}>
            <div>
              <label style={LABEL}>Selling Price (₹) *</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)}
                placeholder="119" style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>Food Cost (₹)</label>
              <input type="number" value={form.cost} onChange={e => set('cost', e.target.value)}
                placeholder="42" style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
            <div>
              <label style={LABEL}>Gross Margin</label>
              <div style={{ ...INPUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, cursor: 'default',
                color: margin ? (Number(margin) > 60 ? T.green : Number(margin) > 45 ? T.amber : T.red) : T.textSubtle }}>
                {margin ? `${margin}%` : '—'}
              </div>
            </div>
          </div>

          {/* Margin bar */}
          {margin && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ height: 5, background: T.surfaceEl, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(Number(margin), 100)}%`, borderRadius: 3, transition: 'width 0.4s',
                  background: Number(margin) > 60 ? T.green : Number(margin) > 45 ? T.amber : T.red }}/>
              </div>
              <p style={{ color: T.textMuted, fontSize: 11, marginTop: 5 }}>
                Profit per item: <strong style={{ color: T.textSecondary }}>₹{Number(form.price) - Number(form.cost)}</strong>
                {' · '}Food cost: <strong style={{ color: T.textSecondary }}>₹{form.cost}</strong>
              </p>
            </div>
          )}

          {/* Description */}
          <div style={{ marginBottom: 18 }}>
            <label style={LABEL}>Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              placeholder="Short description of the item…" rows={2}
              style={{ ...INPUT, resize: 'vertical', lineHeight: 1.6 }}
              onFocus={focusBorder} onBlur={blurBorder}/>
          </div>

          {/* Toggle badges */}
          <div>
            <label style={{ ...LABEL, marginBottom: 10 }}>Item Properties</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {[
                { key: 'veg',       label: 'Vegetarian', icon: <Leaf size={16}/>,      color: '#4CAF7D' },
                { key: 'spicy',     label: 'Spicy',      icon: <Flame size={16}/>,     color: T.amber },
                { key: 'featured',  label: 'Featured',   icon: <Star size={16}/>,      color: T.gold },
                { key: 'available', label: 'Available',  icon: <Zap size={16}/>,       color: T.blue },
              ].map(({ key, label, icon, color }) => {
                const active = form[key as keyof typeof form] as boolean
                return (
                  <button key={key} onClick={() => set(key, !active)} style={{
                    padding: '12px 8px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
                    border: `1.5px solid ${active ? color : T.border}`,
                    background: active ? `${color}15` : T.surfaceEl,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, transition: 'all 0.15s' }}>
                    <span style={{ color: active ? color : T.textMuted }}>{icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: active ? color : T.textMuted }}>{label}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 800, letterSpacing: '0.06em',
                      color: active ? '#fff' : T.textSubtle,
                      background: active ? color : T.border,
                      padding: '1px 8px', borderRadius: 20 }}>{active ? 'ON' : 'OFF'}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, flexShrink: 0, background: T.surfaceEl }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{
            flex: 2, padding: '11px', borderRadius: 10, border: 'none',
            background: done ? T.green : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: `0 4px 16px rgba(155,35,53,0.3)`, transition: 'all 0.2s' }}>
            {done ? <><Check size={15}/> Saved!</> : <><Check size={15}/> {saveLabel}</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── ADD CATEGORY MODAL ───────────────────────────────────────────────────────
function AddCategoryModal({
  const T = useT()
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
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('🍽️')
  const [done, setDone] = useState(false)
  const ICONS = ['🍗','🦐','🐟','🥗','🍔','🌯','🧇','🥟','🍫','⚡','🥩','🍱','🥤','🍕','🌮','🥞','🧆','🫕']

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, width: '100%', maxWidth: 460, boxShadow: '0 32px 80px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold}, ${T.burgundy})` }}/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}` }}>
          <div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>Add Category</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>Create a new menu category</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={LABEL}>Category Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Rolls, Desserts"
              style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={LABEL}>Category Icon</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {ICONS.map(ic => (
                <button key={ic} onClick={() => setIcon(ic)} style={{
                  width: 44, height: 44, borderRadius: 10, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit',
                  background: icon === ic ? `${T.burgundy}25` : T.surfaceEl,
                  border: `1.5px solid ${icon === ic ? T.burgundy : T.border}`, transition: 'all 0.15s' }}>{ic}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div>
                <p style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>{name || 'Category Name'}</p>
                <p style={{ color: T.textMuted, fontSize: 11, margin: '2px 0 0' }}>Preview</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: 11, borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button onClick={() => { if (!name.trim()) return; setDone(true); setTimeout(onClose, 900) }} style={{
              flex: 2, padding: 11, borderRadius: 10, border: 'none',
              background: done ? T.green : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(155,35,53,0.3)' }}>
              {done ? <><Check size={15}/> Saved!</> : <><Plus size={15}/> Add Category</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── DELETE CONFIRM MODAL ─────────────────────────────────────────────────────
function DeleteModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const [done, setDone] = useState(false)
  return (
    <div style={MODAL_OVERLAY}>
      <div style={{ background: T.surface, border: `1px solid rgba(224,90,90,0.3)`, borderRadius: 20, width: '100%', maxWidth: 420, boxShadow: '0 32px 80px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.red}, #A83232, ${T.red})` }}/>
        <div style={{ padding: '28px 28px 24px', textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(224,90,90,0.12)', border: `2px solid rgba(224,90,90,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <AlertTriangle size={26} color={T.red}/>
          </div>
          <h3 style={{ color: T.textPrimary, fontWeight: 800, fontSize: 17, margin: '0 0 8px' }}>Delete Menu Item?</h3>
          <p style={{ color: T.textMuted, fontSize: 13, lineHeight: 1.6, margin: '0 0 6px' }}>
            You&apos;re about to delete <strong style={{ color: T.textPrimary }}>{item.name}</strong>.
          </p>
          <p style={{ color: T.textMuted, fontSize: 12, margin: '0 0 24px' }}>
            Historical orders will not be affected. This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button onClick={() => { setDone(true); setTimeout(onClose, 900) }} style={{
              flex: 1, padding: '11px', borderRadius: 10, border: 'none', fontFamily: 'inherit',
              background: done ? T.green : `linear-gradient(135deg, ${T.red}, #A83232)`,
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
              {done ? <><Check size={14}/> Deleted!</> : <><Trash2 size={14}/> Delete Item</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── CONTEXT MENU DROPDOWN ────────────────────────────────────────────────────
function ContextMenu({ item, onEdit, onDelete, onClose }: {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  item: MenuItem; onEdit: () => void; onDelete: () => void; onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  const menuItems = [
    { icon: <Edit size={14}/>,       label: 'Edit Item',          action: onEdit,   color: T.textSecondary },
    { icon: <BookOpen size={14}/>,   label: 'Configure Recipe',   action: onClose,  color: T.textSecondary },
    { icon: <Copy size={14}/>,       label: 'Duplicate Item',     action: onClose,  color: T.textSecondary },
    { icon: <ToggleLeft size={14}/>, label: item.available ? 'Mark Unavailable' : 'Mark Available', action: onClose, color: T.amber },
    { icon: <Trash2 size={14}/>,     label: 'Delete Item',        action: onDelete, color: T.red, danger: true },
  ]

  return (
    <div ref={ref} style={{
      position: 'absolute', bottom: '110%', right: 0, zIndex: 50,
      background: T.surfaceEl, border: `1px solid ${T.borderEl}`,
      borderRadius: 12, padding: '6px', minWidth: 190,
      boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
      animation: 'fadeUp 0.15s ease-out' }}>
      {menuItems.map((mi, i) => (
        <div key={i}>
          {i === 4 && <div style={{ height: 1, background: T.border, margin: '4px 0' }}/>}
          <button onClick={() => { mi.action(); onClose() }} style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: '9px 12px', borderRadius: 8, border: 'none',
            background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
            color: mi.color, fontSize: 13, fontWeight: 500, transition: 'background 0.1s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = mi.danger ? 'rgba(224,90,90,0.1)' : T.surfaceHov}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
            {mi.icon}
            {mi.label}
          </button>
        </div>
      ))}
    </div>
  )
}

// ─── MENU ITEM CARD ───────────────────────────────────────────────────────────
function MenuItemCard({ item }: { item: MenuItem }) {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const [showMenu, setShowMenu] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  return (
    <>
      {showEdit && (
        <ItemForm
          initial={item} title="Edit Menu Item"
          subtitle={`Editing — ${item.name}`}
          saveLabel="Save Changes"
          onSave={() => setShowEdit(false)}
          onClose={() => setShowEdit(false)}
        />
      )}
      {showDelete && <DeleteModal item={item} onClose={() => setShowDelete(false)}/>}

      <Card style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Image area */}
        <div style={{ height: 110, background: `linear-gradient(135deg, ${T.surfaceEl} 0%, ${T.surfaceHov} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, position: 'relative' }}>
          {CATEGORY_ICONS[item.category] || '🍽️'}
          <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 5, alignItems: 'center' }}>
            <span style={{
              background: item.veg ? '#2D5A27' : '#5A1B1B',
              color: item.veg ? '#6DDA6D' : '#E07070',
              fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20,
              border: `1px solid ${item.veg ? '#3D7A37' : '#7A2B2B'}` }}>{item.veg ? 'VEG' : 'NON-VEG'}</span>
            {item.spicy && <Flame size={13} color={T.amber}/>}
          </div>
          {item.featured && <div style={{ position: 'absolute', top: 8, right: 8 }}><Star size={14} color={T.gold} fill={T.gold}/></div>}
          {!item.available && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,11,10,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: T.red, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>UNAVAILABLE</span>
            </div>
          )}
        </div>

        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.category}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary, marginBottom: 12, lineHeight: 1.3 }}>{item.name}</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: T.gold }}>₹{item.price}</div>
              <div style={{ fontSize: 10, color: T.textMuted }}>Cost: ₹{item.cost}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: item.margin > 60 ? T.green : item.margin > 45 ? T.amber : T.red }}>{item.margin}%</div>
              <div style={{ fontSize: 10, color: T.textMuted }}>Margin</div>
            </div>
          </div>

          <div style={{ height: 3, background: T.surfaceEl, borderRadius: 2, marginBottom: 12, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${item.margin}%`, borderRadius: 2, background: item.margin > 65 ? T.green : item.margin > 55 ? T.amber : T.red }}/>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setShowEdit(true)} style={{
              flex: 1, padding: '8px 0', borderRadius: 8,
              border: `1px solid ${T.border}`, background: T.surfaceEl,
              color: T.textSecondary, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.burgundy; (e.currentTarget as HTMLElement).style.color = T.textPrimary }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.textSecondary }}>
              <Edit size={12}/> Edit
            </button>

            <button style={{
              flex: 1, padding: '8px 0', borderRadius: 8,
              border: `1px solid ${T.border}`, background: T.surfaceEl,
              color: T.textSecondary, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.gold; (e.currentTarget as HTMLElement).style.color = T.gold }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.textSecondary }}>
              <BookOpen size={12}/> Recipe
            </button>

            {/* More dropdown */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowMenu(!showMenu)} style={{
                width: 34, height: 34, borderRadius: 8,
                border: `1px solid ${showMenu ? T.borderEl : T.border}`,
                background: showMenu ? T.surfaceHov : T.surfaceEl,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s' }}>
                <MoreHorizontal size={14} color={showMenu ? T.textPrimary : T.textMuted}/>
              </button>
              {showMenu && (
                <ContextMenu
                  item={item}
                  onEdit={() => { setShowMenu(false); setShowEdit(true) }}
                  onDelete={() => { setShowMenu(false); setShowDelete(true) }}
                  onClose={() => setShowMenu(false)}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const [activeCategory, setActiveCategory] = useState('All')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const categories = ['All', ...CATEGORIES.map(c => c.name)]
  const filtered = activeCategory === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(m => m.category === activeCategory)

  return (
    <div>
      {showAddCategory && <AddCategoryModal onClose={() => setShowAddCategory(false)}/>}
      {showAddItem && (
        <ItemForm
          initial={{}} title="Add Menu Item" subtitle="Add a new item to your menu"
          saveLabel="Add to Menu"
          onSave={() => setShowAddItem(false)}
          onClose={() => setShowAddItem(false)}
        />
      )}

      <PageHeader
        title="Menu Management"
        subtitle={`${MENU_ITEMS.length} items across ${CATEGORIES.length} categories`}
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="ghost" icon={Plus} onClick={() => setShowAddCategory(true)}>Add Category</Btn>
            <Btn icon={Plus} onClick={() => setShowAddItem(true)}>Add Item</Btn>
          </div>
        }
      />

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', marginBottom: 20 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            border: `1px solid ${activeCategory === cat ? T.burgundy : T.border}`,
            background: activeCategory === cat ? `${T.burgundy}25` : 'transparent',
            color: activeCategory === cat ? T.textPrimary : T.textMuted,
            whiteSpace: 'nowrap', transition: 'all 0.15s', fontFamily: 'inherit', flexShrink: 0 }}>
            {cat !== 'All' && CATEGORY_ICONS[cat] ? `${CATEGORY_ICONS[cat]} ` : ''}{cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: T.textMuted }}>{filtered.length} items</span>
        <span style={{ color: T.textSubtle }}>·</span>
        <span style={{ fontSize: 13, color: T.green }}>{filtered.filter(m => m.available).length} available</span>
        <span style={{ color: T.textSubtle }}>·</span>
        <span style={{ fontSize: 13, color: T.red }}>{filtered.filter(m => !m.available).length} unavailable</span>
        <div style={{ marginLeft: 'auto' }}><SearchBar placeholder="Search menu…"/></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {filtered.map(item => <MenuItemCard key={item.id} item={item}/>)}
      </div>
    </div>
  )
}
