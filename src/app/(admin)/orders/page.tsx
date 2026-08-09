'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { MetricCard, Card, StatusBadge, OrderTypeBadge, DataTable, Btn, SearchBar, PageHeader } from '@/components/ui'
import { T, ORDERS, MENU_ITEMS, CATEGORIES, fmtINRFull, fmtINR } from '@/lib/mockData'
import { ShoppingBag, DollarSign, TrendingUp, Filter, Download, Plus, X, Minus, ChevronRight, Check } from 'lucide-react'

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

  const categories = CATEGORIES.map(c => c.name)
  const filteredItems = MENU_ITEMS.filter(m => m.category === activeCategory && m.available)

  function addToCart(item: typeof MENU_ITEMS[0]) {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, category: item.category }]
    })
  }

  function updateQty(id: number, delta: number) {
    setCart(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c)
      return updated.filter(c => c.qty > 0)
    })
  }

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const tax = subtotal * 0.05
  const total = subtotal + tax

  function handleComplete() {
    if (cart.length === 0) return
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 380, width: '90%' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(76,175,125,0.15)', border: `2px solid ${T.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Check size={32} color={T.green}/>
          </div>
          <h2 style={{ color: T.textPrimary, fontWeight: 800, fontSize: 20, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Order Placed!</h2>
          <p style={{ color: T.gold, fontWeight: 700, fontSize: 18, margin: '0 0 6px' }}>{orderNum}</p>
          <p style={{ color: T.textMuted, fontSize: 13, margin: '0 0 6px' }}>{orderType.replace('_', ' ')} · {payment}</p>
          <p style={{ color: T.textPrimary, fontWeight: 800, fontSize: 22, margin: '0 0 24px' }}>{fmtINRFull(total)}</p>
          <div style={{ background: T.surfaceEl, borderRadius: 12, padding: '12px 16px', marginBottom: 24, textAlign: 'left' }}>
            {cart.map(c => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: T.textSecondary, padding: '3px 0' }}>
                <span>{c.name} × {c.qty}</span>
                <span style={{ fontWeight: 600 }}>{fmtINRFull(c.price * c.qty)}</span>
              </div>
            ))}
          </div>
          <button onClick={onClose} style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${T.burgundy}, #7A1828)`, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'stretch' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: 1100, margin: 'auto', background: T.bg, borderRadius: 20, overflow: 'hidden', maxHeight: '92vh', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>

        {/* LEFT — Menu */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${T.border}` }}>
          {/* Header */}
          <div style={{ padding: '18px 20px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 16, margin: 0 }}>New Order</h3>
            <button onClick={onClose} style={{ background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
              <X size={16}/>
            </button>
          </div>

          {/* Order type */}
          <div style={{ padding: '12px 20px', borderBottom: `1px solid ${T.border}`, display: 'flex', gap: 8, flexShrink: 0 }}>
            {(['DINE_IN', 'TAKEAWAY', 'DELIVERY'] as OrderType[]).map(t => (
              <button key={t} onClick={() => setOrderType(t)} style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none', fontFamily: 'inherit',
                background: orderType === t ? T.burgundy : T.surfaceEl,
                color: orderType === t ? '#fff' : T.textMuted,
              }}>{t.replace('_', ' ')}</button>
            ))}
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 6, padding: '10px 20px', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
                border: `1px solid ${activeCategory === cat ? T.burgundy : T.border}`,
                background: activeCategory === cat ? `${T.burgundy}25` : 'transparent',
                color: activeCategory === cat ? T.textPrimary : T.textMuted,
              }}>{CATEGORY_ICONS[cat]} {cat}</button>
            ))}
          </div>

          {/* Menu items grid */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10, alignContent: 'start' }}>
            {filteredItems.map(item => {
              const inCart = cart.find(c => c.id === item.id)
              return (
                <button key={item.id} onClick={() => addToCart(item)} style={{
                  background: inCart ? `${T.burgundy}20` : T.surface,
                  border: `1px solid ${inCart ? T.burgundy : T.border}`,
                  borderRadius: 12, padding: '14px 12px', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s', fontFamily: 'inherit', position: 'relative',
                }}>
                  {inCart && (
                    <span style={{ position: 'absolute', top: 8, right: 8, background: T.burgundy, color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                      {inCart.qty}
                    </span>
                  )}
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{CATEGORY_ICONS[item.category] || '🍽️'}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.textPrimary, lineHeight: 1.3, marginBottom: 6 }}>{item.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: T.gold }}>₹{item.price}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* RIGHT — Cart */}
        <div style={{ width: 300, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '18px 20px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
            <h3 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 15, margin: 0 }}>
              Cart {cart.length > 0 && <span style={{ color: T.textMuted, fontWeight: 500 }}>({cart.reduce((s, c) => s + c.qty, 0)} items)</span>}
            </h3>
          </div>

          {/* Cart items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: T.textMuted }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>🛒</div>
                <p style={{ fontSize: 13, fontWeight: 500 }}>Tap items to add to cart</p>
              </div>
            ) : cart.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: T.textPrimary, fontSize: 12, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{item.name}</p>
                  <p style={{ color: T.gold, fontSize: 12, fontWeight: 700, margin: '3px 0 0' }}>₹{item.price} × {item.qty}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => updateQty(item.id, -1)} style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${T.border}`, background: T.surfaceEl, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.textMuted }}>
                    <Minus size={12}/>
                  </button>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary, minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${T.border}`, background: T.surfaceEl, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.textMuted }}>
                    <Plus size={12}/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary + Payment */}
          <div style={{ padding: '14px 16px', borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
            {cart.length > 0 && (
              <>
                <div style={{ marginBottom: 12 }}>
                  {[['Subtotal', fmtINRFull(subtotal)], ['Tax (5%)', fmtINRFull(tax)]].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: T.textMuted, marginBottom: 4 }}>
                      <span>{l}</span><span>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, color: T.textPrimary, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
                    <span>Total</span><span style={{ color: T.gold }}>{fmtINRFull(total)}</span>
                  </div>
                </div>

                {/* Payment method */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {(['CASH', 'CARD', 'UPI'] as PaymentMethod[]).map(p => (
                    <button key={p} onClick={() => setPayment(p)} style={{
                      flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${payment === p ? T.gold : T.border}`, fontFamily: 'inherit',
                      background: payment === p ? `${T.gold}20` : 'transparent',
                      color: payment === p ? T.gold : T.textMuted,
                    }}>{p}</button>
                  ))}
                </div>
              </>
            )}

            <button onClick={handleComplete} disabled={cart.length === 0} style={{
              width: '100%', padding: '13px', borderRadius: 12, border: 'none',
              background: cart.length === 0 ? T.surfaceEl : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
              color: cart.length === 0 ? T.textMuted : '#fff',
              fontSize: 14, fontWeight: 700, cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: cart.length > 0 ? `0 4px 16px rgba(155,35,53,0.3)` : 'none',
            }}>
              <Check size={16}/>
              Complete Order {cart.length > 0 && `· ${fmtINRFull(total)}`}
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
        <MetricCard label="Total Revenue"     value={fmtINRFull(revenue)} icon={DollarSign}  color={T.gold}/>
        <MetricCard label="Gross Profit"      value={fmtINRFull(profit)}  icon={TrendingUp}  color={T.green}/>
        <MetricCard label="Completed Orders"  value={ORDERS.filter(o => o.status === 'COMPLETED').length} icon={ShoppingBag} color={T.blue}/>
        <MetricCard label="Avg Order Value"   value={fmtINR(revenue / Math.max(1, filtered.length))} icon={TrendingUp} color={T.textPrimary}/>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setActiveStatus(s)} style={{
            padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            border: 'none', fontFamily: 'inherit',
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
