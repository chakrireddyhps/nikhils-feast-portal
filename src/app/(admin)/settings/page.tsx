'use client'
import { useT } from '@/lib/themeContext'
export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { PageHeader } from '@/components/ui'
import {
  Globe, ShoppingBag, Package, Users, Lock, ShieldAlert,
  ChevronRight, X, Check, ChevronLeft, Eye, EyeOff,
  Plus, Trash2, Edit, Shield, Clock, Search, Filter,
  AlertTriangle, ToggleLeft, ToggleRight, Phone, Mail,
  MapPin, Camera } from 'lucide-react'

// ─── SHARED STYLES ─────────────────────────────────────────────────────────────







function SaveBtn({ label = 'Save Changes', done, onClick }: { label?: string; done: boolean; onClick: () => void }) {
  const T = useT()
  return (
    <button onClick={onClick} style={{
      padding: '10px 22px', borderRadius: 10, border: 'none', fontFamily: 'inherit',
      background: done ? T.green : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
      color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 7, transition: 'all 0.2s',
      boxShadow: done ? 'none' : '0 4px 14px rgba(155,35,53,0.3)' }}>
      <Check size={14}/> {done ? 'Saved!' : label}
    </button>
  )
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  const T = useT()
  return (
    <button onClick={() => onChange(!on)} style={{
      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
      position: 'relative', background: on ? T.green : T.border, transition: 'background 0.2s' }}>
      <span style={{
        position: 'absolute', top: 3, left: on ? 22 : 3, width: 18, height: 18,
        borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}/>
    </button>
  )
}

// ─── RESTAURANT PROFILE ───────────────────────────────────────────────────────
function RestaurantProfile() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const SECTION: React.CSSProperties = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }
  const SECTION_HEADER: React.CSSProperties = { padding: '16px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  const INPUT: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
    function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }

  const [form, setForm] = useState({
    name: "Nikhil's Feast", tagline: 'A Feast To Be Remembered',
    email: 'nikhil@nikhilsfeast.com', phone: '+91 98765 43210',
    address: '12, Food Street, Hyderabad', city: 'Hyderabad',
    state: 'Telangana', pincode: '500001' })
  const [done, setDone] = useState(false)
  const set = (k: string, v: string) => { setForm(p => ({ ...p, [k]: v })); setDone(false) }

  return (
    <div>
      {/* Avatar */}
      <div style={{ ...SECTION }}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Restaurant Logo</h4>
        </div>
        <div style={{ padding: 22, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: `linear-gradient(135deg, ${T.burgundy}, #6B1020)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38 }}>🍗</div>
            <button style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: '50%', background: T.burgundy, border: `2px solid ${T.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={13} color="#fff"/>
            </button>
          </div>
          <div>
            <p style={{ color: T.textPrimary, fontWeight: 600, fontSize: 13, margin: '0 0 4px' }}>Upload restaurant logo</p>
            <p style={{ color: T.textMuted, fontSize: 12, margin: '0 0 10px' }}>PNG, JPG up to 2MB · Recommended 512×512px</p>
            <button style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.surfaceEl, color: T.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Upload Image
            </button>
          </div>
        </div>
      </div>

      {/* Basic info */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Basic Information</h4>
        </div>
        <div style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { key: 'name',    label: 'Restaurant Name *', placeholder: "Nikhil's Feast" },
            { key: 'tagline', label: 'Tagline',            placeholder: 'A Feast To Be Remembered' },
            { key: 'email',   label: 'Email Address',      placeholder: 'nikhil@nikhilsfeast.com' },
            { key: 'phone',   label: 'Phone Number',       placeholder: '+91 98765 43210' },
          ].map(f => (
            <div key={f.key}>
              <label style={LABEL}>{f.label}</label>
              <input value={form[f.key as keyof typeof form]} onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder} style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
          ))}
        </div>
      </div>

      {/* Address */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Address</h4>
        </div>
        <div style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div style={{ gridColumn: 'span 3' }}>
            <label style={LABEL}>Street Address</label>
            <input value={form.address} onChange={e => set('address', e.target.value)}
              placeholder="Street address" style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
          </div>
          {[
            { key: 'city', label: 'City', placeholder: 'Hyderabad' },
            { key: 'state', label: 'State', placeholder: 'Telangana' },
            { key: 'pincode', label: 'PIN Code', placeholder: '500001' },
          ].map(f => (
            <div key={f.key}>
              <label style={LABEL}>{f.label}</label>
              <input value={form[f.key as keyof typeof form]} onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder} style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 22px', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'flex-end' }}>
          <SaveBtn done={done} onClick={() => setDone(true)}/>
        </div>
      </div>
    </div>
  )
}

// ─── ORDER SETTINGS ───────────────────────────────────────────────────────────
function OrderSettings() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const SECTION: React.CSSProperties = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }
  const SECTION_HEADER: React.CSSProperties = { padding: '16px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  const INPUT: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
    function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }

  const [form, setForm] = useState({
    prefix: 'ORD', nextNumber: '2848', defaultTax: '5',
    autoAccept: false, requireTable: false, allowCash: true,
    allowCard: true, allowUPI: true, allowOther: false,
    roundOff: true, printReceipt: false })
  const [done, setDone] = useState(false)
  const set = (k: string, v: string | boolean) => { setForm(p => ({ ...p, [k]: v })); setDone(false) }

  return (
    <div>
      {/* Order numbering */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Order Numbering</h4>
        </div>
        <div style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div>
            <label style={LABEL}>Order Prefix</label>
            <input value={form.prefix} onChange={e => set('prefix', e.target.value)} style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
            <p style={{ color: T.textMuted, fontSize: 11, marginTop: 5 }}>e.g. ORD, INV, #</p>
          </div>
          <div>
            <label style={LABEL}>Next Order Number</label>
            <input type="number" value={form.nextNumber} onChange={e => set('nextNumber', e.target.value)} style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
          </div>
          <div>
            <label style={LABEL}>Preview</label>
            <div style={{ ...INPUT, color: T.gold, fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', cursor: 'default' }}>
              {form.prefix}-{form.nextNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Tax */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Tax Settings</h4>
        </div>
        <div style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
          <div>
            <label style={LABEL}>Default Tax Rate (%)</label>
            <input type="number" value={form.defaultTax} onChange={e => set('defaultTax', e.target.value)} style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
            <Toggle on={form.roundOff} onChange={v => set('roundOff', v)}/>
            <div>
              <p style={{ color: T.textPrimary, fontWeight: 600, fontSize: 13, margin: 0 }}>Round off order totals</p>
              <p style={{ color: T.textMuted, fontSize: 11, margin: '2px 0 0' }}>Round to nearest rupee on final bill</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Payment Methods</h4>
          <p style={{ color: T.textMuted, fontSize: 12, margin: 0 }}>Enable accepted payment methods</p>
        </div>
        <div style={{ padding: 22, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {[
            { key: 'allowCash', label: 'Cash', desc: 'Accept cash payments' },
            { key: 'allowCard', label: 'Card', desc: 'Debit & credit cards' },
            { key: 'allowUPI',  label: 'UPI',  desc: 'PhonePe, GPay, Paytm' },
            { key: 'allowOther',label: 'Other', desc: 'Cheque, vouchers, etc.' },
          ].map(({ key, label, desc }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${T.border}` }}>
              <div>
                <p style={{ color: T.textPrimary, fontWeight: 600, fontSize: 13, margin: 0 }}>{label}</p>
                <p style={{ color: T.textMuted, fontSize: 11, margin: '2px 0 0' }}>{desc}</p>
              </div>
              <Toggle on={form[key as keyof typeof form] as boolean} onChange={v => set(key, v)}/>
            </div>
          ))}
        </div>
      </div>

      {/* Order behaviour */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Order Behaviour</h4>
        </div>
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { key: 'autoAccept', label: 'Auto-accept new orders', desc: 'Orders go directly to Preparing without manual confirmation' },
            { key: 'requireTable', label: 'Require table number for Dine In', desc: 'Staff must enter a table number when creating dine-in orders' },
            { key: 'printReceipt', label: 'Auto-print receipt on completion', desc: 'Automatically send receipt to printer when order is completed' },
          ].map(({ key, label, desc }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${T.border}` }}>
              <div>
                <p style={{ color: T.textPrimary, fontWeight: 600, fontSize: 13, margin: 0 }}>{label}</p>
                <p style={{ color: T.textMuted, fontSize: 11, margin: '2px 0 0' }}>{desc}</p>
              </div>
              <Toggle on={form[key as keyof typeof form] as boolean} onChange={v => set(key, v)}/>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 22px', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'flex-end' }}>
          <SaveBtn done={done} onClick={() => setDone(true)}/>
        </div>
      </div>
    </div>
  )
}

// ─── INVENTORY SETTINGS ───────────────────────────────────────────────────────
function InventorySettings() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const SECTION: React.CSSProperties = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }
  const SECTION_HEADER: React.CSSProperties = { padding: '16px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  const INPUT: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
    function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }

  const [form, setForm] = useState({
    defaultUnit: 'KG', lowStockThreshold: '20',
    criticalStockThreshold: '10', autoDeductOnOrder: true,
    trackExpiry: true, wastageAlert: true, wastageAlertPct: '5' })
  const [done, setDone] = useState(false)
  const set = (k: string, v: string | boolean) => { setForm(p => ({ ...p, [k]: v })); setDone(false) }

  return (
    <div>
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Default Settings</h4>
        </div>
        <div style={{ padding: 22, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          <div>
            <label style={LABEL}>Default Unit</label>
            <select value={form.defaultUnit} onChange={e => set('defaultUnit', e.target.value)}
              style={{ ...INPUT, appearance: 'none', cursor: 'pointer' }} onFocus={focusBorder} onBlur={blurBorder}>
              {['KG','GRAM','LITRE','ML','PCS','PACK'].map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label style={LABEL}>Low Stock Alert (%)</label>
            <input type="number" value={form.lowStockThreshold} onChange={e => set('lowStockThreshold', e.target.value)}
              style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
            <p style={{ color: T.textMuted, fontSize: 11, marginTop: 5 }}>Alert when below % of max stock</p>
          </div>
          <div>
            <label style={LABEL}>Critical Stock Alert (%)</label>
            <input type="number" value={form.criticalStockThreshold} onChange={e => set('criticalStockThreshold', e.target.value)}
              style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
          </div>
        </div>
      </div>

      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Inventory Behaviour</h4>
        </div>
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { key: 'autoDeductOnOrder', label: 'Auto-deduct ingredients on order completion', desc: 'Automatically reduce stock when an order is marked complete' },
            { key: 'trackExpiry', label: 'Track ingredient expiry dates', desc: 'Get alerts when ingredients are approaching expiry' },
            { key: 'wastageAlert', label: 'Wastage alerts', desc: `Alert when weekly wastage exceeds ${form.wastageAlertPct}% of revenue` },
          ].map(({ key, label, desc }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${T.border}` }}>
              <div>
                <p style={{ color: T.textPrimary, fontWeight: 600, fontSize: 13, margin: 0 }}>{label}</p>
                <p style={{ color: T.textMuted, fontSize: 11, margin: '2px 0 0' }}>{desc}</p>
              </div>
              <Toggle on={form[key as keyof typeof form] as boolean} onChange={v => set(key, v)}/>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 22px', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'flex-end' }}>
          <SaveBtn done={done} onClick={() => setDone(true)}/>
        </div>
      </div>
    </div>
  )
}

// ─── USER MANAGEMENT ──────────────────────────────────────────────────────────
const MOCK_USERS = [
  { id:1, name:'Nikhil',      email:'nikhil@nikhilsfeast.com', role:'Owner',   status:'active',   lastLogin:'2 min ago'   },
  { id:2, name:'Ravi Kumar',  email:'ravi@nikhilsfeast.com',   role:'Manager', status:'active',   lastLogin:'1 hour ago'  },
  { id:3, name:'Priya Singh', email:'priya@nikhilsfeast.com',  role:'Staff',   status:'active',   lastLogin:'3 hours ago' },
  { id:4, name:'Rahul M',     email:'rahul@nikhilsfeast.com',  role:'Staff',   status:'inactive', lastLogin:'2 days ago'  },
]
const ROLE_COLORS: Record<string, string> = { Owner: '#C9A84C', Manager: '#5B9BD5', Admin: '#A855F7', Staff: '#4CAF7D' }

function UserManagement() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const SECTION: React.CSSProperties = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }
  const SECTION_HEADER: React.CSSProperties = { padding: '16px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  const INPUT: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
    function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }

  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Staff')
  const [inviteDone, setInviteDone] = useState(false)

  return (
    <div>
      {/* Users list */}
      <div style={SECTION}>
        <div style={{ ...SECTION_HEADER }}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Team Members ({MOCK_USERS.length})</h4>
          <button onClick={() => setShowInvite(true)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10,
            border: 'none', background: `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
            color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: `0 4px 14px ${T.burgundyGlow}` }}>
            <Plus size={14}/> Invite Member
          </button>
        </div>

        {/* Invite form */}
        {showInvite && (
          <div style={{ padding: '16px 22px', borderBottom: `1px solid ${T.border}`, background: `${T.burgundy}08` }}>
            <p style={{ color: T.textPrimary, fontWeight: 700, fontSize: 13, margin: '0 0 12px' }}>Invite New Member</p>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto auto', gap: 10, alignItems: 'flex-end' }}>
              <div>
                <label style={LABEL}>Email Address</label>
                <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)}
                  placeholder="staff@nikhilsfeast.com" style={INPUT} onFocus={focusBorder} onBlur={blurBorder}/>
              </div>
              <div>
                <label style={LABEL}>Role</label>
                <select value={inviteRole} onChange={e => setInviteRole(e.target.value)}
                  style={{ ...INPUT, appearance: 'none', cursor: 'pointer' }}>
                  {['Manager','Staff','Admin'].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <button onClick={() => { setInviteDone(true); setTimeout(() => { setShowInvite(false); setInviteEmail(''); setInviteDone(false) }, 1000) }} style={{
                padding: '10px 18px', borderRadius: 10, border: 'none', fontFamily: 'inherit',
                background: inviteDone ? T.green : `linear-gradient(135deg, ${T.burgundy}, #7A1828)`,
                color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                <Check size={14}/>{inviteDone ? 'Sent!' : 'Send Invite'}
              </button>
              <button onClick={() => setShowInvite(false)} style={{ padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'transparent', color: T.textMuted, cursor: 'pointer' }}>
                <X size={15}/>
              </button>
            </div>
          </div>
        )}

        {MOCK_USERS.map((user, i) => (
          <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px', borderBottom: i < MOCK_USERS.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${ROLE_COLORS[user.role]}20`, border: `1.5px solid ${ROLE_COLORS[user.role]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: ROLE_COLORS[user.role], flexShrink: 0 }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <p style={{ color: T.textPrimary, fontWeight: 700, fontSize: 13, margin: 0 }}>{user.name}</p>
                {user.status === 'inactive' && <span style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, background: T.surfaceEl, padding: '1px 7px', borderRadius: 20, border: `1px solid ${T.border}` }}>Inactive</span>}
              </div>
              <p style={{ color: T.textMuted, fontSize: 12, margin: '2px 0 0' }}>{user.email} · Last seen {user.lastLogin}</p>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: ROLE_COLORS[user.role], background: `${ROLE_COLORS[user.role]}15`, padding: '4px 12px', borderRadius: 20, border: `1px solid ${ROLE_COLORS[user.role]}30` }}>
              {user.role}
            </span>
            {user.role !== 'Owner' && (
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.surfaceEl, color: T.textMuted, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Edit size={12}/> Edit
                </button>
                <button style={{ padding: '6px 10px', borderRadius: 8, border: `1px solid rgba(224,90,90,0.3)`, background: 'rgba(224,90,90,0.08)', color: T.red, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Trash2 size={12}/>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Roles & Permissions info */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Role Permissions</h4>
        </div>
        <div style={{ padding: 22 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {['Permission', 'Owner', 'Manager', 'Staff'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: h === 'Permission' ? 'left' : 'center', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', background: T.surfaceEl }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Dashboard & Reports', true, true, false],
                ['Orders Management', true, true, true],
                ['Menu Management', true, true, false],
                ['Inventory & Stock', true, true, false],
                ['Wastage Recording', true, true, true],
                ['Expenses & Finance', true, false, false],
                ['P&L Reports', true, false, false],
                ['User Management', true, false, false],
                ['Settings', true, false, false],
              ].map(([label, ...vals], i) => (
                <tr key={String(label)} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: '10px 12px', fontSize: 13, color: T.textSecondary, fontWeight: 500 }}>{String(label)}</td>
                  {vals.map((v, j) => (
                    <td key={j} style={{ padding: '10px 12px', textAlign: 'center' }}>
                      {v
                        ? <Check size={15} color={T.green}/>
                        : <X size={15} color={T.textSubtle}/>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── SECURITY ─────────────────────────────────────────────────────────────────
function Security() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const SECTION: React.CSSProperties = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }
  const SECTION_HEADER: React.CSSProperties = { padding: '16px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  const INPUT: React.CSSProperties = {
    width: '100%', padding: '10px 13px', background: T.surfaceEl,
    border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13,
    color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
    function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.burgundy }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { e.target.style.borderColor = T.border }

  const [showPw, setShowPw] = useState({ curr: false, new: false, conf: false })
  const [pw, setPw] = useState({ curr: '', new: '', conf: '' })
  const [pwDone, setPwDone] = useState(false)
  const [twoFA, setTwoFA] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState('60')

  return (
    <div>
      {/* Change password */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Change Password</h4>
        </div>
        <div style={{ padding: 22, maxWidth: 420 }}>
          {(['curr','new','conf'] as const).map((k, i) => (
            <div key={k} style={{ marginBottom: 16 }}>
              <label style={LABEL}>{['Current Password','New Password','Confirm New Password'][i]}</label>
              <div style={{ position: 'relative' }}>
                <input type={showPw[k] ? 'text' : 'password'} value={pw[k]} onChange={e => setPw(p => ({ ...p, [k]: e.target.value }))}
                  placeholder="••••••••" style={{ ...INPUT, paddingRight: 40 }}
                  onFocus={focusBorder} onBlur={blurBorder}/>
                <button type="button" onClick={() => setShowPw(p => ({ ...p, [k]: !p[k] }))}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted }}>
                  {showPw[k] ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>
          ))}
          {pw.new && pw.conf && pw.new !== pw.conf && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: T.red, fontSize: 12, marginBottom: 12 }}>
              <AlertTriangle size={13}/> Passwords do not match
            </div>
          )}
          <SaveBtn label="Update Password" done={pwDone} onClick={() => { setPwDone(true); setPw({ curr:'',new:'',conf:'' }); setTimeout(() => setPwDone(false), 2000) }}/>
        </div>
      </div>

      {/* 2FA + session */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Security Settings</h4>
        </div>
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* 2FA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${twoFA ? T.green + '40' : T.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: twoFA ? `${T.green}18` : T.bg, border: `1px solid ${twoFA ? T.green + '40' : T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <Shield size={16} color={twoFA ? T.green : T.textMuted}/>
              </div>
              <div>
                <p style={{ color: T.textPrimary, fontWeight: 700, fontSize: 13, margin: 0 }}>Two-Factor Authentication</p>
                <p style={{ color: T.textMuted, fontSize: 11, margin: '2px 0 0' }}>Add an extra layer of security to your account</p>
              </div>
            </div>
            <Toggle on={twoFA} onChange={setTwoFA}/>
          </div>

          {/* Session timeout */}
          <div style={{ padding: '16px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${T.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: T.bg, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={16} color={T.textMuted}/>
                </div>
                <div>
                  <p style={{ color: T.textPrimary, fontWeight: 700, fontSize: 13, margin: 0 }}>Session Timeout</p>
                  <p style={{ color: T.textMuted, fontSize: 11, margin: '2px 0 0' }}>Auto-logout after inactivity</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['15','30','60','120','Never'].map(v => (
                <button key={v} onClick={() => setSessionTimeout(v)} style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  border: `1px solid ${sessionTimeout === v ? T.burgundy : T.border}`,
                  background: sessionTimeout === v ? `${T.burgundy}20` : 'transparent',
                  color: sessionTimeout === v ? T.textPrimary : T.textMuted, fontFamily: 'inherit' }}>{v === 'Never' ? 'Never' : `${v} min`}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active sessions */}
      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Active Sessions</h4>
        </div>
        {[
          { device: 'Chrome on Windows', location: 'Hyderabad, IN', time: 'Active now', current: true },
          { device: 'Safari on iPhone',  location: 'Hyderabad, IN', time: '2 hours ago', current: false },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', borderBottom: i === 0 ? `1px solid ${T.border}` : 'none' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <p style={{ color: T.textPrimary, fontWeight: 600, fontSize: 13, margin: 0 }}>{s.device}</p>
                {s.current && <span style={{ fontSize: 10, fontWeight: 700, color: T.green, background: `${T.green}15`, padding: '1px 8px', borderRadius: 20, border: `1px solid ${T.green}30` }}>Current</span>}
              </div>
              <p style={{ color: T.textMuted, fontSize: 12, margin: '3px 0 0' }}>{s.location} · {s.time}</p>
            </div>
            {!s.current && (
              <button style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid rgba(224,90,90,0.3)`, background: 'rgba(224,90,90,0.08)', color: T.red, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── AUDIT LOGS ───────────────────────────────────────────────────────────────
const AUDIT_LOGS = [
  { id:1,  user:'Nikhil',      action:'Updated menu item price',  entity:'Chicken Wings',         time:'2 min ago',   type:'menu',     old:'₹109', new:'₹119' },
  { id:2,  user:'Ravi Kumar',  action:'Recorded wastage',         entity:'Chicken Breast 1.2 KG', time:'18 min ago',  type:'wastage',  old:'',     new:'₹288' },
  { id:3,  user:'Nikhil',      action:'Completed order',          entity:'ORD-2847',              time:'32 min ago',  type:'order',    old:'',     new:'₹522' },
  { id:4,  user:'Priya Singh', action:'Added new purchase',       entity:'PUR-006',               time:'1 hr ago',    type:'purchase', old:'',     new:'₹4,200' },
  { id:5,  user:'Nikhil',      action:'Deleted menu item',        entity:'Fries Chicken',         time:'2 hrs ago',   type:'menu',     old:'₹179', new:'' },
  { id:6,  user:'Ravi Kumar',  action:'Adjusted stock',           entity:'Refined Oil -2L',       time:'3 hrs ago',   type:'inventory',old:'20.2L',new:'18.2L' },
  { id:7,  user:'Nikhil',      action:'Added expense',            entity:'Equipment Repair',      time:'4 hrs ago',   type:'expense',  old:'',     new:'₹3,200' },
  { id:8,  user:'Nikhil',      action:'Updated recipe',           entity:'Crispy Chicken Burger', time:'5 hrs ago',   type:'recipe',   old:'₹58',  new:'₹54' },
  { id:9,  user:'Priya Singh', action:'Created order',            entity:'ORD-2839',              time:'6 hrs ago',   type:'order',    old:'',     new:'₹1,027' },
  { id:10, user:'Nikhil',      action:'Invited team member',      entity:'rahul@nikhilsfeast.com',time:'1 day ago',   type:'user',     old:'',     new:'Staff' },
]

const LOG_TYPE_COLORS: Record<string, string> = {
  menu: '#C9A84C', order: '#4CAF7D', wastage: '#E05A5A', purchase: '#5B9BD5',
  inventory: '#F5A623', expense: '#A855F7', recipe: '#06B6D4', user: '#EC4899' }

function AuditLogs() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const SECTION: React.CSSProperties = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }
  const SECTION_HEADER: React.CSSProperties = { padding: '16px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  const [filter, setFilter] = useState('all')
  const types = ['all', 'menu', 'order', 'wastage', 'purchase', 'inventory', 'expense', 'recipe', 'user']
  const filtered = filter === 'all' ? AUDIT_LOGS : AUDIT_LOGS.filter(l => l.type === filter)

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
            border: `1px solid ${filter === t ? (LOG_TYPE_COLORS[t] || T.burgundy) : T.border}`,
            background: filter === t ? `${LOG_TYPE_COLORS[t] || T.burgundy}18` : 'transparent',
            color: filter === t ? (LOG_TYPE_COLORS[t] || T.textPrimary) : T.textMuted, fontFamily: 'inherit' }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      <div style={SECTION}>
        <div style={SECTION_HEADER}>
          <h4 style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>
            Activity Log <span style={{ color: T.textMuted, fontWeight: 500, fontSize: 13 }}>({filtered.length} entries)</span>
          </h4>
        </div>

        {filtered.map((log, i) => (
          <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 22px', borderBottom: i < filtered.length - 1 ? `1px solid ${T.border}` : 'none', transition: 'background 0.1s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.surfaceEl}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
            {/* Type dot */}
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${LOG_TYPE_COLORS[log.type] || T.textMuted}18`, border: `1px solid ${LOG_TYPE_COLORS[log.type] || T.textMuted}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: LOG_TYPE_COLORS[log.type] || T.textMuted }}/>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ color: T.textPrimary, fontWeight: 700, fontSize: 13 }}>{log.user}</span>
                <span style={{ color: T.textMuted, fontSize: 13 }}>{log.action}</span>
                <span style={{ color: LOG_TYPE_COLORS[log.type] || T.gold, fontWeight: 600, fontSize: 13 }}>{log.entity}</span>
              </div>
              {(log.old || log.new) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  {log.old && <span style={{ fontSize: 11, color: T.red, background: `${T.red}10`, padding: '2px 8px', borderRadius: 6, fontVariantNumeric: 'tabular-nums' }}>Before: {log.old}</span>}
                  {log.old && log.new && <ChevronRight size={12} color={T.textSubtle}/>}
                  {log.new && <span style={{ fontSize: 11, color: T.green, background: `${T.green}10`, padding: '2px 8px', borderRadius: 6, fontVariantNumeric: 'tabular-nums' }}>After: {log.new}</span>}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: T.textSubtle, fontWeight: 500 }}>{log.time}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: LOG_TYPE_COLORS[log.type] || T.textMuted, background: `${LOG_TYPE_COLORS[log.type] || T.textMuted}15`, padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {log.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN SETTINGS PAGE ───────────────────────────────────────────────────────
const SETTINGS_SECTIONS = [
  { key: 'profile',   icon: Globe,        label: 'Restaurant Profile',  desc: 'Name, logo, address, contact details',    color: '#C9A84C' },
  { key: 'orders',    icon: ShoppingBag,  label: 'Order Settings',      desc: 'Numbering, tax, payment methods',          color: '#5B9BD5' },
  { key: 'inventory', icon: Package,      label: 'Inventory Settings',  desc: 'Default units, reorder thresholds',        color: '#F5A623' },
  { key: 'users',     icon: Users,        label: 'User Management',     desc: 'Manage team access, roles, permissions',   color: '#A855F7' },
  { key: 'security',  icon: Lock,         label: 'Security',            desc: 'Password, 2FA, session management',        color: T.green },
  { key: 'audit',     icon: ShieldAlert,  label: 'Audit Logs',          desc: 'Track who changed what and when',          color: T.burgundyLight },
]

export default function SettingsPage() {
  const T = useT()
  const LABEL = { display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 } as React.CSSProperties
  const SECTION: React.CSSProperties = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }
  const SECTION_HEADER: React.CSSProperties = { padding: '16px 22px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  const [active, setActive] = useState<string | null>(null)

  const current = SETTINGS_SECTIONS.find(s => s.key === active)

  if (active && current) {
    return (
      <div>
        {/* Back header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <button onClick={() => setActive(null)} style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surfaceEl, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted, flexShrink: 0 }}>
            <ChevronLeft size={18}/>
          </button>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: T.textPrimary, margin: 0, letterSpacing: '-0.03em' }}>{current.label}</h1>
            <p style={{ fontSize: 13, color: T.textMuted, marginTop: 4, fontWeight: 500 }}>{current.desc}</p>
          </div>
        </div>

        {active === 'profile'   && <RestaurantProfile/>}
        {active === 'orders'    && <OrderSettings/>}
        {active === 'inventory' && <InventorySettings/>}
        {active === 'users'     && <UserManagement/>}
        {active === 'security'  && <Security/>}
        {active === 'audit'     && <AuditLogs/>}
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your restaurant configuration"/>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {SETTINGS_SECTIONS.map(s => (
          <button key={s.key} onClick={() => setActive(s.key)} style={{
            display: 'flex', alignItems: 'center', gap: 16, padding: '20px 22px',
            background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16,
            cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
            transition: 'all 0.15s' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = s.color + '60'; el.style.background = T.surfaceEl }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.border; el.style.background = T.surface }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: `${s.color}15`, border: `1.5px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={20} color={s.color}/>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: T.textPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>{s.label}</p>
              <p style={{ color: T.textMuted, fontSize: 12, margin: '4px 0 0', fontWeight: 500 }}>{s.desc}</p>
            </div>
            <ChevronRight size={18} color={T.textSubtle}/>
          </button>
        ))}
      </div>
    </div>
  )
}
