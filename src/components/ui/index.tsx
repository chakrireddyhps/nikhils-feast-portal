'use client'
import React from 'react'
import { ArrowUpRight, ArrowDownRight, Search, ChevronRight } from 'lucide-react'
import { useTheme } from '@/lib/themeContext'
import { DARK } from '@/lib/mockData'

// ─── METRIC CARD ──────────────────────────────────────────────────────────────
interface MetricCardProps {
  label: string; value: string | number; icon: React.ElementType
  color?: string; trend?: number | null; sub?: string
}
export function MetricCard({ label, value, icon: Icon, color, trend, sub }: MetricCardProps) {
  const { theme: T } = useTheme()
  const c = color || T.gold
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: '20px 22px', position: 'relative', overflow: 'hidden', boxShadow: T.cardShadow, transition: 'background 0.25s, border-color 0.25s' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${c}18 0%, transparent 70%)`, transform: 'translate(20px,-20px)' }}/>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${c}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={18} color={c}/>
        </div>
        {trend !== undefined && trend !== null && <TrendBadge val={trend}/>}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: T.textPrimary, letterSpacing: '-0.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: T.textSubtle, marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

export function TrendBadge({ val, inverse = false }: { val: number; inverse?: boolean }) {
  const { theme: T } = useTheme()
  const positive = inverse ? val < 0 : val >= 0
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, fontWeight: 700, color: positive ? T.green : T.red }}>
      {positive ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
      {Math.abs(val).toFixed(1)}%
    </span>
  )
}

const STATUS_CFG: Record<string, { label: string; bg: string; color: string; dot: string }> = {
  COMPLETED: { label: 'Completed', bg: 'rgba(76,175,125,0.15)',  color: '#4CAF7D', dot: '#4CAF7D' },
  CANCELLED: { label: 'Cancelled', bg: 'rgba(224,90,90,0.15)',   color: '#E05A5A', dot: '#E05A5A' },
  PREPARING: { label: 'Preparing', bg: 'rgba(245,166,35,0.15)',  color: '#F5A623', dot: '#F5A623' },
  READY:     { label: 'Ready',     bg: 'rgba(91,155,213,0.15)',  color: '#5B9BD5', dot: '#5B9BD5' },
  RECEIVED:  { label: 'Received',  bg: 'rgba(76,175,125,0.15)',  color: '#4CAF7D', dot: '#4CAF7D' },
  healthy:   { label: 'In Stock',  bg: 'rgba(76,175,125,0.15)',  color: '#4CAF7D', dot: '#4CAF7D' },
  low:       { label: 'Low Stock', bg: 'rgba(245,166,35,0.15)',  color: '#F5A623', dot: '#F5A623' },
  critical:  { label: 'Critical',  bg: 'rgba(224,90,90,0.15)',   color: '#E05A5A', dot: '#E05A5A' },
  out:       { label: 'Out of Stock', bg: 'rgba(155,35,53,0.25)', color: '#F08080', dot: '#F08080' },
}

export function StatusBadge({ status }: { status: string }) {
  const c = STATUS_CFG[status] || STATUS_CFG.COMPLETED
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, background: c.bg, color: c.color, fontSize: 11, fontWeight: 700, border: `1px solid ${c.color}30`, whiteSpace: 'nowrap' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }}/>
      {c.label}
    </span>
  )
}

export function OrderTypeBadge({ type }: { type: string }) {
  const cfg: Record<string, string> = { DINE_IN: '#7B9ED9', TAKEAWAY: '#C9A84C', DELIVERY: '#A855F7', OTHER: '#7A6A63' }
  return <span style={{ fontSize: 11, fontWeight: 700, color: cfg[type] || '#7A6A63' }}>{type.replace('_', ' ')}</span>
}

export function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const { theme: T } = useTheme()
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, boxShadow: T.cardShadow, transition: 'background 0.25s, border-color 0.25s', overflow: 'hidden', ...style }}>
      {children}
    </div>
  )
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  const { theme: T } = useTheme()
  return (
    <div className="page-header-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, gap: 16, flexWrap: 'wrap' }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: T.textPrimary, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: T.textMuted, marginTop: 5, fontWeight: 500 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Btn({ children, variant = 'primary', onClick, icon: Icon, small = false, style = {} }: {
  children?: React.ReactNode; variant?: 'primary' | 'gold' | 'ghost' | 'danger'
  onClick?: () => void; icon?: React.ElementType; small?: boolean; style?: React.CSSProperties
}) {
  const { theme: T } = useTheme()
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 7, borderRadius: 10,
    fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all 0.15s',
    fontSize: small ? 12 : 13, padding: small ? '7px 14px' : '10px 18px',
    fontFamily: 'inherit', flexShrink: 0, ...style,
  }
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: `linear-gradient(135deg, ${T.burgundy} 0%, #7A1828 100%)`, color: '#fff', boxShadow: `0 4px 16px ${T.burgundyGlow}` },
    gold:    { background: `linear-gradient(135deg, ${T.gold} 0%, #A8842A 100%)`, color: '#fff', boxShadow: `0 4px 16px ${T.goldGlow}` },
    ghost:   { background: 'transparent', color: T.textSecondary, border: `1px solid ${T.border}` },
    danger:  { background: 'rgba(224,90,90,0.15)', color: T.red, border: `1px solid ${T.red}30` },
  }
  return (
    <button style={{ ...base, ...variants[variant] }} onClick={onClick}>
      {Icon && <Icon size={small ? 13 : 15}/>}
      {children}
    </button>
  )
}

// Responsive: full-width on mobile, fixed 200px on desktop
export function SearchBar({ placeholder = 'Search…' }: { placeholder?: string }) {
  const { theme: T } = useTheme()
  return (
    <div className="searchbar-wrap" style={{ position: 'relative', flexShrink: 0 }}>
      <Search size={14} color={T.textMuted} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
      <input placeholder={placeholder} style={{
        background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 10,
        padding: '9px 12px 9px 34px', fontSize: 13, color: T.textPrimary,
        outline: 'none', width: '100%', minWidth: 140, maxWidth: 220,
        fontFamily: 'inherit', transition: 'background 0.25s',
      }}/>
    </div>
  )
}

interface Column<R> { key: string; label: string; render?: (value: unknown, row: R) => React.ReactNode }
export function DataTable<R extends Record<string, unknown>>({ columns, data, onRowClick }: {
  columns: Column<R>[]; data: R[]; onRowClick?: (row: R) => void
}) {
  const { theme: T } = useTheme()
  return (
    <div className="table-scroll-wrap">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${T.border}` }}>
            {columns.map(col => (
              <th key={col.key} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', background: T.surfaceEl, whiteSpace: 'nowrap', transition: 'background 0.25s' }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={ri} onClick={() => onRowClick?.(row)}
              style={{ borderBottom: `1px solid ${T.border}`, cursor: onRowClick ? 'pointer' : 'default', transition: 'background 0.1s' }}
              onMouseEnter={e => { if (onRowClick) (e.currentTarget as HTMLElement).style.background = T.surfaceHov }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
              {columns.map(col => (
                <td key={col.key} style={{ padding: '13px 16px', fontSize: 13, color: T.textSecondary, whiteSpace: 'nowrap', transition: 'color 0.25s' }}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ChartTip({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; color: string; name: string; value: number }>; label?: string }) {
  const { theme: T } = useTheme()
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: T.surfaceEl, border: `1px solid ${T.borderEl}`, borderRadius: 12, padding: '10px 14px', fontSize: 12 }}>
      <p style={{ color: T.textMuted, marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color, fontWeight: 700, margin: '2px 0' }}>
          {p.name}: {['Revenue', 'Profit', 'COGS'].includes(p.name) ? `₹${p.value.toLocaleString('en-IN')}` : p.value}
        </p>
      ))}
    </div>
  )
}

// Re-export DARK as T for pages that still import T from mockData
export { DARK as T }
