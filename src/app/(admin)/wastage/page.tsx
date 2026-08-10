'use client'
export const dynamic = 'force-dynamic'
import React, { useState } from 'react'
import { useT } from '@/lib/themeContext'
import { MetricCard, Card, DataTable, Btn, PageHeader, ChartTip } from '@/components/ui'
import { WASTAGE, fmtINRFull } from '@/lib/mockData'
import { Trash2, BarChart3, TrendingDown, ReceiptText, AlertTriangle, Plus, Filter, X, Check, ChevronDown } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.8)',
  display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
  paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16,
}

const REASONS = ['Expired','Burnt','Damaged','Overproduction','Spillage','Preparation Waste','Storage Issue','Other']
const UNITS   = ['KG','GRAM','LITRE','ML','PCS','PACK']
const INGR    = ['Chicken (Whole)','Chicken Breast','Prawns (Frozen)','Fish Fillet','Paneer','All-Purpose Flour','Refined Oil','Bread Buns','Waffle Mix','Chocolate Sauce','Baby Corn','Mushroom','Mixed Spices','Cheese Slices','Brownie Mix','Chicken Keema']
const RCOLORS: Record<string,string> = {
  Expired:'#E05A5A', Spillage:'#F5A623', Overproduction:'#C0272D',
  Burnt:'#5B9BD5', 'Preparation Waste':'#A855F7', 'Storage Issue':'#4CAF7D',
  Damaged:'#F97316', Other:'#7A6A63',
}

type WRow = { ingredient:string; qty:string; unit:string; cost:string; reason:string; total:number }

function RecordWastageModal({ onClose }: { onClose: () => void }) {
  const T = useT()
  const [rows, setRows] = useState<WRow[]>([{ ingredient:'',qty:'',unit:'KG',cost:'',reason:'Expired',total:0 }])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [by, setBy] = useState('')
  const [notes, setNotes] = useState('')
  const [done, setDone] = useState(false)

  const upd = (i: number, k: string, v: string) => setRows(prev => prev.map((r,idx) => {
    if (idx !== i) return r
    const u = { ...r, [k]: v }
    u.total = (Number(u.qty)||0) * (Number(u.cost)||0)
    return u
  }))

  const tot = rows.reduce((s,r) => s+r.total, 0)
  const bdr = '1px solid ' + T.border
  const is: React.CSSProperties = { width:'100%', padding:'7px 10px', background:T.surfaceEl, border:bdr, borderRadius:10, fontSize:12, color:T.textPrimary, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{ background:T.surface, border:'1px solid rgba(224,90,90,0.2)', borderRadius:20, width:'100%', maxWidth:760, boxShadow:'0 32px 80px rgba(0,0,0,0.6)', overflow:'hidden', maxHeight:'calc(100vh - 24px)', display:'flex', flexDirection:'column' }}>
        <div style={{ height:3, background:'linear-gradient(90deg,#E05A5A,#A83232,#E05A5A)', flexShrink:0 }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', borderBottom:bdr, flexShrink:0 }}>
          <div><h3 style={{ color:T.textPrimary, fontWeight:700, fontSize:17, margin:0 }}>Record Wastage</h3><p style={{ color:T.textMuted, fontSize:12, margin:'3px 0 0' }}>Log food wastage to track losses</p></div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, background:T.surfaceEl, border:bdr, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:T.textMuted }}><X size={15}/></button>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:24 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
            <div><label style={{ display:'block', fontSize:10, fontWeight:700, color:T.textMuted, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:7 }}>Date *</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{ ...is, padding:'10px 13px', colorScheme:'dark' }}/></div>
            <div><label style={{ display:'block', fontSize:10, fontWeight:700, color:T.textMuted, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:7 }}>Recorded By</label><input value={by} onChange={e=>setBy(e.target.value)} placeholder="Staff name" style={{ ...is, padding:'10px 13px' }}/></div>
          </div>
          <div style={{ marginBottom:18 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <label style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:'uppercase', letterSpacing:'0.12em' }}>Wastage Items *</label>
              <button onClick={()=>setRows(p=>[...p,{ingredient:'',qty:'',unit:'KG',cost:'',reason:'Expired',total:0}])} style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', borderRadius:8, border:bdr, background:T.surfaceEl, color:T.textSecondary, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}><Plus size={13}/> Add Row</button>
            </div>
            <div style={{ border:bdr, borderRadius:12, overflow:'hidden' }}>
              <div style={{ display:'grid', gridTemplateColumns:'2fr 80px 70px 100px 150px 90px 32px', gap:8, padding:'9px 12px', background:T.surfaceEl, borderBottom:bdr }}>
                {['Ingredient','Qty','Unit','Cost/Unit','Reason','Value',''].map(h=><span key={h} style={{ fontSize:9, fontWeight:700, color:T.textMuted, textTransform:'uppercase', letterSpacing:'0.1em' }}>{h}</span>)}
              </div>
              {rows.map((row,i)=>(
                <div key={i} style={{ display:'grid', gridTemplateColumns:'2fr 80px 70px 100px 150px 90px 32px', gap:8, padding:'8px 12px', borderBottom:i<rows.length-1?bdr:'none', alignItems:'center' }}>
                  <div style={{ position:'relative' }}><select value={row.ingredient} onChange={e=>upd(i,'ingredient',e.target.value)} style={{ ...is, appearance:'none', paddingRight:24 }}><option value="">Select…</option>{INGR.map(g=><option key={g} value={g}>{g}</option>)}</select><ChevronDown size={11} color={T.textMuted} style={{ position:'absolute', right:7, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/></div>
                  <input type="number" value={row.qty} onChange={e=>upd(i,'qty',e.target.value)} placeholder="0" style={is}/>
                  <select value={row.unit} onChange={e=>upd(i,'unit',e.target.value)} style={{ ...is, appearance:'none' }}>{UNITS.map(u=><option key={u} value={u}>{u}</option>)}</select>
                  <div style={{ position:'relative' }}><span style={{ position:'absolute', left:8, top:'50%', transform:'translateY(-50%)', color:T.textMuted, fontSize:12 }}>₹</span><input type="number" value={row.cost} onChange={e=>upd(i,'cost',e.target.value)} placeholder="0" style={{ ...is, paddingLeft:20 }}/></div>
                  <div style={{ position:'relative' }}><select value={row.reason} onChange={e=>upd(i,'reason',e.target.value)} style={{ ...is, appearance:'none', paddingRight:24, color:RCOLORS[row.reason]||T.textSecondary }}>{REASONS.map(r=><option key={r} value={r}>{r}</option>)}</select><ChevronDown size={11} color={T.textMuted} style={{ position:'absolute', right:7, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/></div>
                  <div style={{ color:row.total>0?'#E05A5A':T.textSubtle, fontWeight:700, fontSize:13, textAlign:'right' }}>{row.total>0?'-'+fmtINRFull(row.total):'—'}</div>
                  <button onClick={()=>{ if(rows.length>1) setRows(p=>p.filter((_,j)=>j!==i)) }} style={{ width:28, height:28, borderRadius:6, border:bdr, background:'transparent', cursor:rows.length===1?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#E05A5A', opacity:rows.length===1?0.3:1 }}><X size={12}/></button>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', background:'rgba(224,90,90,0.06)', borderTop:'1px solid rgba(224,90,90,0.2)' }}>
                <span style={{ color:T.textSecondary, fontSize:13, fontWeight:700 }}>Total Wastage Value</span>
                <span style={{ color:'#E05A5A', fontWeight:800, fontSize:18 }}>{tot>0?'-'+fmtINRFull(tot):'—'}</span>
              </div>
            </div>
          </div>
          <div><label style={{ display:'block', fontSize:10, fontWeight:700, color:T.textMuted, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:7 }}>Notes</label><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Additional context…" rows={2} style={{ width:'100%', padding:'10px 13px', background:T.surfaceEl, border:bdr, borderRadius:10, fontSize:13, color:T.textPrimary, outline:'none', boxSizing:'border-box', fontFamily:'inherit', resize:'vertical', lineHeight:'1.6' }}/></div>
          {tot>0&&<div style={{ marginTop:14, padding:'12px 16px', background:'rgba(224,90,90,0.06)', border:'1px solid rgba(224,90,90,0.25)', borderRadius:10, display:'flex', alignItems:'center', gap:10 }}><AlertTriangle size={15} color="#E05A5A"/><p style={{ color:T.textSecondary, fontSize:12, margin:0 }}>Recording will deduct <strong style={{ color:'#E05A5A' }}>{fmtINRFull(tot)}</strong> from inventory value.</p></div>}
        </div>
        <div style={{ padding:'16px 24px', borderTop:bdr, display:'flex', gap:10, flexShrink:0, background:T.surfaceEl }}>
          <button onClick={onClose} style={{ flex:1, padding:'11px', borderRadius:10, border:bdr, background:'transparent', color:T.textSecondary, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
          <button onClick={()=>{ setDone(true); setTimeout(onClose,900) }} style={{ flex:2, padding:'11px', borderRadius:10, border:'none', fontFamily:'inherit', background:done?T.green:'linear-gradient(135deg,#E05A5A,#A83232)', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.2s' }}>
            {done?<><Check size={15}/> Wastage Recorded!</>:<><Trash2 size={15}/> Record Wastage{tot>0?' · -'+fmtINRFull(tot):''}</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function WastagePage() {
  const T = useT()
  const [showRecord, setShowRecord] = useState(false)
  const totalWastage = WASTAGE.reduce((s,w)=>s+w.total, 0)
  const byReason = WASTAGE.reduce((acc:Record<string,number>,w)=>{ acc[w.reason]=(acc[w.reason]||0)+w.total; return acc }, {})
  const pieData = Object.entries(byReason).map(([name,value])=>({ name, value, color:RCOLORS[name]||'#7A6A63' })).sort((a,b)=>b.value-a.value)
  const bdr = '1px solid ' + T.border

  return (
    <div>
      {showRecord&&<RecordWastageModal onClose={()=>setShowRecord(false)}/>}
      <PageHeader title="Wastage Management" subtitle="Track and reduce food wastage" action={<Btn icon={Plus} onClick={()=>setShowRecord(true)}>Record Wastage</Btn>}/>
      <div className='grid-4-kpi' style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
        <MetricCard label="Today's Wastage" value={fmtINRFull(408)} icon={Trash2} color={T.red} trend={6.3}/>
        <MetricCard label="This Week" value={fmtINRFull(totalWastage)} icon={BarChart3} color={T.amber}/>
        <MetricCard label="Wastage %" value="4.4%" icon={TrendingDown} color={T.textPrimary}/>
        <MetricCard label="Records" value={WASTAGE.length} icon={ReceiptText} color={T.blue}/>
      </div>
      <div style={{ background:'rgba(224,90,90,0.06)', border:'1px solid rgba(224,90,90,0.25)', borderRadius:12, padding:'14px 18px', marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
        <AlertTriangle size={16} color="#E05A5A"/>
        <span style={{ color:T.textSecondary, fontSize:13, fontWeight:600 }}>Highest wastage this week: <strong style={{ color:T.textPrimary }}>Chicken (Whole)</strong> — ₹360 lost due to overproduction</span>
      </div>
      <div className='grid-chart-row' style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
        <Card>
          <div className='card-toolbar card-header-with-search' style={{ padding:'18px 22px', borderBottom:bdr, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h3 style={{ color:T.textPrimary, fontWeight:700, margin:0, fontSize:15 }}>Wastage Records</h3>
            <Btn variant="ghost" icon={Filter} small>Filter</Btn>
          </div>
          <DataTable
            columns={[
              { key:'date', label:'Date', render:v=><span style={{ fontSize:12, color:T.textMuted }}>{String(v)}</span> },
              { key:'ingredient', label:'Ingredient', render:v=><span style={{ fontWeight:700, color:T.textPrimary }}>{String(v)}</span> },
              { key:'qty', label:'Qty', render:(v,r)=>String(v)+' '+String((r as {unit:string}).unit) },
              { key:'total', label:'Value', render:v=><span style={{ color:'#E05A5A', fontWeight:700 }}>{'₹'+String(v)}</span> },
              { key:'reason', label:'Reason', render:v=><span style={{ fontSize:11, fontWeight:700, color:RCOLORS[String(v)]||T.amber, background:(RCOLORS[String(v)]||T.amber)+'20', padding:'3px 9px', borderRadius:20 }}>{String(v)}</span> },
              { key:'by', label:'Recorded By', render:v=><span style={{ fontSize:12, color:T.textMuted }}>{String(v)}</span> },
            ]}
            data={WASTAGE as Record<string,unknown>[]}
          />
        </Card>
        <Card style={{ padding:22 }}>
          <h3 style={{ color:T.textPrimary, fontWeight:700, margin:'0 0 4px', fontSize:15 }}>By Reason</h3>
          <p style={{ color:T.textMuted, fontSize:12, marginBottom:18 }}>This week</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart><Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={2} strokeWidth={0}>{pieData.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie><Tooltip content={<ChartTip/>}/></PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:12 }}>
            {pieData.map(d=>(
              <div key={d.name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:T.textSecondary }}><span style={{ width:9, height:9, borderRadius:2, background:d.color, flexShrink:0 }}/>{d.name}</span>
                <span style={{ color:'#E05A5A', fontWeight:700, fontSize:12 }}>{'₹'+d.value}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:14, paddingTop:14, borderTop:bdr, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:13, fontWeight:700, color:T.textSecondary }}>Total Wastage</span>
            <span style={{ fontSize:16, fontWeight:800, color:'#E05A5A' }}>{fmtINRFull(totalWastage)}</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
