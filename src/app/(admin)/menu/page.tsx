'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Card, Btn, SearchBar, PageHeader } from '@/components/ui'
import { T, MENU_ITEMS, CATEGORIES } from '@/lib/mockData'
import { Plus, Star, Flame, MoreHorizontal, X, Check, ChevronDown, Leaf, Zap } from 'lucide-react'

const CATEGORY_ICONS: Record<string, string> = {
  Chicken: '🍗', Prawns: '🦐', 'Apollo Fish': '🐟', Veg: '🥗',
  Burgers: '🍔', Rolls: '🌯', Waffles: '🧇', 'Fried Momos': '🥟',
  Desserts: '🍫', 'Special Offers': '⚡',
}

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 999,
  background: 'rgba(0,0,0,0.8)',
  display: 'flex', alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16,
}

// ─── ADD CATEGORY MODAL ───────────────────────────────────────────────────────
function AddCategoryModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('🍽️')
  const [done, setDone] = useState(false)

  const ICON_OPTIONS = ['🍗','🦐','🐟','🥗','🍔','🌯','🧇','🥟','🍫','⚡','🥩','🍱','🥤','🍕','🌮','🥞','🧆','🫕']

  function handleSave() {
    if (!name.trim()) return
    setDone(true)
    setTimeout(onClose, 1200)
  }

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 20, width: '100%', maxWidth: 480,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden',
      }}>
        {/* Top stripe */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold}, ${T.burgundy})` }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}` }}>
          <div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>Add Category</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>Create a new menu category</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Category Name */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
              Category Name *
            </label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Chicken, Burgers, Desserts"
              style={{ width: '100%', padding: '11px 14px', background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = T.burgundy}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = T.border}
            />
          </div>

          {/* Icon picker */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
              Category Icon
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ICON_OPTIONS.map(ic => (
                <button key={ic} onClick={() => setIcon(ic)} style={{
                  width: 44, height: 44, borderRadius: 10, fontSize: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontFamily: 'inherit',
                  background: icon === ic ? `${T.burgundy}25` : T.surfaceEl,
                  border: `1.5px solid ${icon === ic ? T.burgundy : T.border}`,
                  transition: 'all 0.15s',
                }}>{ic}</button>
              ))}
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: T.surfaceEl, borderRadius: 10, border: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 24 }}>{icon}</span>
              <span style={{ color: T.textSecondary, fontSize: 13, fontWeight: 600 }}>{name || 'Category Name'}</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Cancel
            </button>
            <button onClick={handleSave} style={{
              flex: 2, padding: '11px', borderRadius: 10, border: 'none',
              background: done ? T.green : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: `0 4px 16px rgba(155,35,53,0.3)`, transition: 'all 0.2s',
            }}>
              {done ? <><Check size={15}/> Saved!</> : <><Plus size={15}/> Add Category</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ADD ITEM MODAL ───────────────────────────────────────────────────────────
function AddItemModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: '', category: 'Chicken', price: '', cost: '',
    veg: false, spicy: false, featured: false, available: true,
    description: '',
  })
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
    setTimeout(onClose, 1200)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted,
    textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7,
  }

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 20, width: '100%', maxWidth: 680,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', maxHeight: 'calc(100vh - 24px)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Top stripe */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold}, ${T.burgundy})`, flexShrink: 0 }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 17, margin: 0 }}>Add Menu Item</h3>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>Add a new item to your menu</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
            <X size={15}/>
          </button>
        </div>

        {/* Body — scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* Row 1: Name + Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Item Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="e.g. Crispy Chicken Burger" style={inputStyle}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = T.burgundy}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = T.border}/>
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <div style={{ position: 'relative' }}>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  style={{ ...inputStyle, appearance: 'none', paddingRight: 36, cursor: 'pointer' }}>
                  {CATEGORIES.map(c => <option key={c.name} value={c.name}>{CATEGORY_ICONS[c.name]} {c.name}</option>)}
                </select>
                <ChevronDown size={14} color={T.textMuted} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>
          </div>

          {/* Row 2: Price + Cost + Margin */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Selling Price (₹) *</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)}
                placeholder="119" style={inputStyle}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = T.burgundy}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = T.border}/>
            </div>
            <div>
              <label style={labelStyle}>Food Cost (₹)</label>
              <input type="number" value={form.cost} onChange={e => set('cost', e.target.value)}
                placeholder="42" style={inputStyle}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = T.burgundy}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = T.border}/>
            </div>
            <div>
              <label style={labelStyle}>Gross Margin</label>
              <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16,
                color: margin ? (Number(margin) > 60 ? T.green : Number(margin) > 45 ? T.amber : T.red) : T.textSubtle,
                background: T.surfaceEl, cursor: 'default',
              }}>
                {margin ? `${margin}%` : '—'}
              </div>
            </div>
          </div>

          {/* Margin bar */}
          {margin && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ height: 6, background: T.surfaceEl, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(Number(margin), 100)}%`, borderRadius: 3, transition: 'width 0.4s',
                  background: Number(margin) > 60 ? T.green : Number(margin) > 45 ? T.amber : T.red }}/>
              </div>
              <p style={{ color: T.textMuted, fontSize: 11, marginTop: 4 }}>
                Food cost: ₹{form.cost} · Profit per item: ₹{Number(form.price) - Number(form.cost)}
              </p>
            </div>
          )}

          {/* Description */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              placeholder="Short description of the item…" rows={2}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
              onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = T.burgundy}
              onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = T.border}/>
          </div>

          {/* Toggles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 4 }}>
            {[
              { key: 'veg',       label: 'Vegetarian', icon: <Leaf size={14}/>,  color: '#4CAF7D' },
              { key: 'spicy',     label: 'Spicy',      icon: <Flame size={14}/>, color: T.amber },
              { key: 'featured',  label: 'Featured',   icon: <Star size={14}/>,  color: T.gold },
              { key: 'available', label: 'Available',  icon: <Zap size={14}/>,   color: T.blue },
            ].map(({ key, label, icon, color }) => {
              const active = form[key as keyof typeof form] as boolean
              return (
                <button key={key} onClick={() => set(key, !active)} style={{
                  padding: '10px 8px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                  border: `1.5px solid ${active ? color : T.border}`,
                  background: active ? `${color}15` : T.surfaceEl,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transition: 'all 0.15s',
                }}>
                  <span style={{ color: active ? color : T.textMuted }}>{icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: active ? color : T.textMuted }}>{label}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: active ? color : T.textSubtle }}>{active ? 'ON' : 'OFF'}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{
            flex: 2, padding: '11px', borderRadius: 10, border: 'none',
            background: done ? T.green : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: `0 4px 16px rgba(155,35,53,0.3)`, transition: 'all 0.2s',
          }}>
            {done ? <><Check size={15}/> Item Added!</> : <><Plus size={15}/> Add to Menu</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)

  const categories = ['All', ...CATEGORIES.map(c => c.name)]
  const filtered = activeCategory === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(m => m.category === activeCategory)

  return (
    <div>
      {showAddCategory && <AddCategoryModal onClose={() => setShowAddCategory(false)}/>}
      {showAddItem && <AddItemModal onClose={() => setShowAddItem(false)}/>}

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
            whiteSpace: 'nowrap', transition: 'all 0.15s', fontFamily: 'inherit', flexShrink: 0,
          }}>
            {cat !== 'All' && CATEGORY_ICONS[cat] ? `${CATEGORY_ICONS[cat]} ` : ''}{cat}
          </button>
        ))}
      </div>

      {/* Summary + Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: T.textMuted }}>{filtered.length} items</span>
        <span style={{ color: T.textSubtle }}>·</span>
        <span style={{ fontSize: 13, color: T.green }}>{filtered.filter(m => m.available).length} available</span>
        <span style={{ color: T.textSubtle }}>·</span>
        <span style={{ fontSize: 13, color: T.red }}>{filtered.filter(m => !m.available).length} unavailable</span>
        <div style={{ marginLeft: 'auto' }}>
          <SearchBar placeholder="Search menu…"/>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {filtered.map(item => (
          <Card key={item.id} style={{ overflow: 'hidden', position: 'relative' }}>
            {/* Image area */}
            <div style={{
              height: 110, background: `linear-gradient(135deg, ${T.surfaceEl} 0%, ${T.surfaceHov} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, position: 'relative',
            }}>
              {CATEGORY_ICONS[item.category] || '🍽️'}
              <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 5, alignItems: 'center' }}>
                <span style={{
                  background: item.veg ? '#2D5A27' : '#5A1B1B',
                  color: item.veg ? '#6DDA6D' : '#E07070',
                  fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20,
                  border: `1px solid ${item.veg ? '#3D7A37' : '#7A2B2B'}`,
                }}>{item.veg ? 'VEG' : 'NON-VEG'}</span>
                {item.spicy && <Flame size={13} color={T.amber}/>}
              </div>
              {item.featured && (
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <Star size={14} color={T.gold} fill={T.gold}/>
                </div>
              )}
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

              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: `1px solid ${T.border}`, background: 'transparent', color: T.textMuted, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                <button style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: `1px solid ${T.border}`, background: 'transparent', color: T.textMuted, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Recipe</button>
                <button style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MoreHorizontal size={14} color={T.textMuted}/>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
