'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { MetricCard, Card, StatusBadge, OrderTypeBadge, DataTable, Btn, SearchBar, PageHeader } from '@/components/ui'
import { T, ORDERS, MENU_ITEMS, CATEGORIES, fmtINRFull, fmtINR } from '@/lib/mockData'
import { ShoppingBag, DollarSign, TrendingUp, Filter, Download, Plus, X, Minus, Check } from 'lucide-react'

const STATUSES = ['ALL', 'COMPLETED', 'PREPARING', 'READY', 'CANCELLED']
const CATEGORY_ICONS: Record<string, string> = {
  Chicken: '🍗', Prawns: '🦐', 'Apollo Fish': '🐟', Veg: '🥗',
  Burgers: '🍔', Rolls: '🌯', Waffles: '🧇', 'Fried Momos': '🥟',
  Desserts: '🍫', 'Special Offers': '⚡',
}

type CartItem = { id: number; name: string; price: number; qty: number; category: string }
type OrderType = 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'
type PaymentMethod = 'CASH' | 'CARD' | 'UPI'

function NewOrderModal({ onClose }: { onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState('Chicken')
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderType, setOrderType] = useState<OrderType>('DINE_IN')
  const [payment, setPayment] = useState<PaymentMethod>('CASH')
  const [step, setStep] = useState<'order' | 'success'>('order')
  const [orderNum] = useState(`ORD-${2848 + Math.floor(Math.random() * 10)}`)

  const filteredItems = MENU_ITEMS.filter(m => m.category === activeCategory && m.available)

  function addToCart(item: typeof MENU_ITEMS[0]) {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, category: item.category }]
    })
  }

  function updateQty(id: number, delta: number) {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c).filter(c => c.qty > 0))
  }

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + tax

  if (step === 'success') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '40px 36px', textAlign: 'center', maxWidth: 380, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(76,175,125,0.15)', border: `2px solid ${T.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Check size={32} color={T.green}/>
          </div>
          <h2 style={{ color: T.textPrimary, fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>Order Placed!</h2>
          <p style={{ color: T.gold, fontWeight: 700, fontSize: 17, margin: '0 0 4px' }}>{orderNum}</p>
          <p style={{ color: T.textMuted, fontSize: 13, margin: '0 0 4px' }}>{orderType.replace('_', ' ')} · {payment}</p>
          <p style={{ color: T.textPrimary, fontWeight: 800, fontSize: 24, margin: '12px 0 20px' }}>{fmtINRFull(total)}</p>
          <div style={{ background: T.surfaceEl, borderRadius: 12, padding: '12px 16px', marginBottom: 24, textAlign: 'left' }}>
            {cart.map(c => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: T.textSecondary, padding: '4px 0' }}>
                <span>{c.name} × {c.qty}</span>
                <span style={{ fontWeight: 600 }}>{fmtINRFull(c.price * c.qty)}</span>
              </div>
            ))}
          </div>
          <button onClick={onClose} style={{ width: '100%', padding: 13, borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${T.burgundy}, #7A1828)`, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    // Full screen overlay
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}>
      {/* Modal box — fixed height, two-column layout */}
      <div style={{
        display: 'flex', width: '100%', maxWidth: 1160,
        height: 'calc(100vh - 68px)', maxHeight: 'none',
        background: T.bg, borderRadius: 20, overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        border: `1px solid ${T.border}`,
      }}>

        {/* ── LEFT: Menu browser ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, borderRight: `1px solid ${T.border}` }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
            <div>
              <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 16, margin: 0 }}>New Order</h3>
              <p style={{ color: T.textMuted, fontSize: 12, margin: '2px 0 0' }}>Select items to add to cart</p>
            </div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: T.surfaceEl, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted, flexShrink: 0 }}>
              <X size={15}/>
            </button>
          </div>

          {/* Order type */}
          <div style={{ display: 'flex', gap: 8, padding: '12px 20px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
            {(['DINE_IN', 'TAKEAWAY', 'DELIVERY'] as OrderType[]).map(t => (
              <button key={t} onClick={() => setOrderType(t)} style={{
                padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all 0.15s',
                background: orderType === t ? T.burgundy : T.surfaceEl,
                color: orderType === t ? '#fff' : T.textMuted,
              }}>{t.replace('_', ' ')}</button>
            ))}
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 6, padding: '10px 20px', flexWrap: 'wrap', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
            {CATEGORIES.map(cat => (
              <button key={cat.name} onClick={() => setActiveCategory(cat.name)} style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', transition: 'all 0.15s',
                border: `1px solid ${activeCategory === cat.name ? T.burgundy : T.border}`,
                background: activeCategory === cat.name ? `${T.burgundy}22` : 'transparent',
                color: activeCategory === cat.name ? T.textPrimary : T.textMuted,
                flexShrink: 0,
              }}>{CATEGORY_ICONS[cat.name]} {cat.name}</button>
            ))}
          </div>

          {/* Menu grid — scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, alignContent: 'start' }}>
            {filteredItems.map(item => {
              const inCart = cart.find(c => c.id === item.id)
              return (
                <button key={item.id} onClick={() => addToCart(item)} style={{
                  background: inCart ? `${T.burgundy}18` : T.surface,
                  border: `1.5px solid ${inCart ? T.burgundy : T.border}`,
                  borderRadius: 12, padding: '14px 12px 12px',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                  fontFamily: 'inherit', position: 'relative',
                }}
                onMouseEnter={e => { if (!inCart) (e.currentTarget as HTMLElement).style.borderColor = T.borderEl }}
                onMouseLeave={e => { if (!inCart) (e.currentTarget as HTMLElement).style.borderColor = T.border }}>
                  {inCart && (
                    <span style={{ position: 'absolute', top: 8, right: 8, background: T.burgundy, color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                      {inCart.qty}
                    </span>
                  )}
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{CATEGORY_ICONS[item.category] || '🍽️'}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.textPrimary, lineHeight: 1.3, marginBottom: 6 }}>{item.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: T.gold }}>₹{item.price}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT: Cart ── */}
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', background: T.surface }}>

          {/* Cart header */}
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 15, margin: 0 }}>
              Cart
              {cart.length > 0 && (
                <span style={{ marginLeft: 8, background: T.burgundy, color: '#fff', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                  {cart.reduce((s, c) => s + c.qty, 0)}
                </span>
              )}
            </h3>
          </div>

          {/* Cart items — scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: T.textMuted }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🛒</div>
                <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>Tap items to add</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: T.textPrimary, fontSize: 12, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{item.name}</p>
                    <p style={{ color: T.gold, fontSize: 12, fontWeight: 700, margin: '3px 0 0' }}>₹{item.price} × {item.qty} = {fmtINRFull(item.price * item.qty)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${T.border}`, background: T.surfaceEl, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.textMuted, flexShrink: 0 }}>
                      <Minus size={11}/>
                    </button>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary, minWidth: 18, textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${T.border}`, background: T.surfaceEl, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.textMuted, flexShrink: 0 }}>
                      <Plus size={11}/>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary + Payment + CTA */}
          <div style={{ padding: '12px 14px', borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
            {/* Totals */}
            <div style={{ marginBottom: 14 }}>
              {[['Subtotal', fmtINRFull(subtotal)], ['Tax (5%)', fmtINRFull(tax)]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: T.textMuted, marginBottom: 5 }}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, color: T.textPrimary, marginTop: 8, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                <span>Total</span>
                <span style={{ color: T.gold }}>{fmtINRFull(total)}</span>
              </div>
            </div>

            {/* Payment method */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              {(['CASH', 'CARD', 'UPI'] as PaymentMethod[]).map(p => (
                <button key={p} onClick={() => setPayment(p)} style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 11, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                  border: `1px solid ${payment === p ? T.gold : T.border}`,
                  background: payment === p ? `${T.gold}18` : 'transparent',
                  color: payment === p ? T.gold : T.textMuted,
                }}>{p}</button>
              ))}
            </div>

            {/* Complete button */}
            <button onClick={() => cart.length > 0 && setStep('success')} style={{
              width: '100%', padding: '13px 0', borderRadius: 12, border: 'none',
              background: cart.length === 0
                ? T.surfaceEl
                : `linear-gradient(135deg, ${T.burgundy} 0%, #7A1828 100%)`,
              color: cart.length === 0 ? T.textMuted : '#fff',
              fontSize: 14, fontWeight: 700, cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: cart.length > 0 ? `0 4px 16px rgba(155,35,53,0.3)` : 'none',
              transition: 'all 0.15s',
            }}>
              <Check size={15}/>
              {cart.length === 0 ? 'Add items to order' : `Complete · ${fmtINRFull(total)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState('ALL')
  const [showNewOrder, setShowNewOrder] = useState(false)

  const filtered = activeStatus === 'ALL' ? ORDERS : ORDERS.filter(o => o.status === activeStatus)
  const revenue = filtered.filter(o => o.status !== 'CANCELLED').reduce((s, o) => s + o.total, 0)
  const profit  = filtered.filter(o => o.status !== 'CANCELLED').reduce((s, o) => s + o.profit, 0)

  return (
    <div>
      {showNewOrder && <NewOrderModal onClose={() => setShowNewOrder(false)}/>}

      <PageHeader title="Orders" subtitle={`${ORDERS.length} orders today`}
        action={<Btn icon={Plus} onClick={() => setShowNewOrder(true)}>New Order</Btn>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="Total Revenue"    value={fmtINRFull(revenue)} icon={DollarSign}  color={T.gold}/>
        <MetricCard label="Gross Profit"     value={fmtINRFull(profit)}  icon={TrendingUp}  color={T.green}/>
        <MetricCard label="Completed Orders" value={ORDERS.filter(o => o.status === 'COMPLETED').length} icon={ShoppingBag} color={T.blue}/>
        <MetricCard label="Avg Order Value"  value={fmtINR(revenue / Math.max(1, filtered.length))} icon={TrendingUp} color={T.textPrimary}/>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setActiveStatus(s)} style={{
            padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700,
            cursor: 'pointer', border: 'none', fontFamily: 'inherit',
            background: activeStatus === s ? T.burgundy : T.surfaceEl,
            color: activeStatus === s ? '#fff' : T.textMuted,
          }}>
            {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            {' '}<span style={{ opacity: 0.7, fontSize: 10 }}>{s === 'ALL' ? ORDERS.length : ORDERS.filter(o => o.status === s).length}</span>
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <SearchBar placeholder="Search orders…"/>
          <Btn variant="ghost" icon={Filter}>Filter</Btn>
          <Btn variant="ghost" icon={Download}>Export</Btn>
        </div>
      </div>

      <Card>
        <DataTable
          columns={[
            { key: 'id',      label: 'Order #',     render: v => <span style={{ color: T.gold, fontWeight: 700 }}>{String(v)}</span> },
            { key: 'date',    label: 'Date & Time', render: v => <span style={{ color: T.textMuted, fontSize: 12 }}>{String(v)}</span> },
            { key: 'type',    label: 'Type',        render: (_, r) => <OrderTypeBadge type={String((r as { type: string }).type)}/> },
            { key: 'payment', label: 'Payment' },
            { key: 'items',   label: 'Items' },
            { key: 'total',   label: 'Total',  render: v => <span style={{ fontWeight: 700, color: T.textPrimary }}>{fmtINRFull(Number(v))}</span> },
            { key: 'cogs',    label: 'COGS',   render: v => <span style={{ color: T.textMuted, fontSize: 12 }}>{fmtINRFull(Number(v))}</span> },
            { key: 'profit',  label: 'Profit', render: v => <span style={{ color: T.green, fontWeight: 600 }}>{fmtINRFull(Number(v))}</span> },
            { key: 'status',  label: 'Status', render: (_, r) => <StatusBadge status={String((r as { status: string }).status)}/> },
          ]}
          data={filtered as Record<string, unknown>[]}
        />
      </Card>
    </div>
  )
}
