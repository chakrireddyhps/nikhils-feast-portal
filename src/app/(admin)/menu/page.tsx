'use client'
import { useState } from 'react'
import { Card, Btn, SearchBar, PageHeader } from '@/components/ui'
import { T, MENU_ITEMS, CATEGORIES } from '@/lib/mockData'
import { Plus, Star, Flame, MoreHorizontal } from 'lucide-react'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...CATEGORIES.map(c => c.name)]
  const filtered = activeCategory === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(m => m.category === activeCategory)

  const CATEGORY_ICONS: Record<string, string> = {
    Chicken: '🍗', Prawns: '🦐', 'Apollo Fish': '🐟', Veg: '🥗',
    Burgers: '🍔', Rolls: '🌯', Waffles: '🧇', 'Fried Momos': '🥟',
    Desserts: '🍫', 'Special Offers': '⚡',
  }

  return (
    <div>
      <PageHeader
        title="Menu Management"
        subtitle={`${MENU_ITEMS.length} items across ${CATEGORIES.length} categories`}
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="ghost" icon={Plus}>Add Category</Btn>
            <Btn icon={Plus}>Add Item</Btn>
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
            whiteSpace: 'nowrap', transition: 'all 0.15s', fontFamily: 'inherit',
          }}>
            {CATEGORY_ICONS[cat] && `${CATEGORY_ICONS[cat]} `}{cat}
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
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <SearchBar placeholder="Search menu…"/>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
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
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.green }}>{item.margin}%</div>
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
