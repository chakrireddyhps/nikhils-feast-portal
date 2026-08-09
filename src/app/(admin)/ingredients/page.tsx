'use client'
export const dynamic = 'force-dynamic'
import React, { useState } from 'react'
import { useT } from '@/lib/themeContext'
import { MetricCard, Card, StatusBadge, DataTable, Btn, SearchBar, PageHeader } from '@/components/ui'
import { INGREDIENTS, fmtINRFull } from '@/lib/mockData'
import { Package, AlertTriangle, XCircle, Warehouse, Plus, Filter, X, Check, ChevronDown } from 'lucide-react'

const MODAL_OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.8)',
  display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
  paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16,
}
const UNITS = ['KG','GRAM','LITRE','ML','PCS','PACK','BOX','BOTTLE','DOZEN']
const CATEGORIES = ['Protein','Dairy','Dry Goods','Vegetables','Oils','Sauces','Spices','Bakery','Other']

function AddIngredientModal({ onClose }: { onClose: () => void }) {
  const T = useT()
  const S: React.CSSProperties = { width:'100%', padding:'10px 13px', background:T.surfaceEl, border:`1px solid ${T.border}`, borderRadius:10, fontSize:13, color:T.textPrimary, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }
  const L: React.CSSProperties = { display:'block', fontSize:10, fontWeight:700, color:T.textMuted, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:7 }
  const onFocus = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement>) => { e.target.style.borderColor = T.burgundy }
  const onBlur  = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement>) => { e.target.style.borderColor = T.border }

  const [form, setForm] = useState({ name:'', sku:'', category:'Protein', unit:'KG', minStock:'', maxStock:'', reorderLevel:'', avgCost:'', supplier:'' })
  const [done, setDone] = useState(false)
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))
  const stockValue = form.avgCost && form.minStock ? Number(form.avgCost)*Number(form.minStock) : null

  return (
    <div style={MODAL_OVERLAY}>
      <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:20, width:'100%', maxWidth:680, boxShadow:'0 32px 80px rgba(0,0,0,0.6)', overflow:'hidden', maxHeight:'calc(100vh - 24px)', display:'flex', flexDirection:'column' }}>
        <div style={{ height:3, background:`linear-gradient(90deg,${T.burgundy},${T.gold},${T.burgundy})`, flexShrink:0 }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
          <div><h3 style={{ color:T.textPrimary, fontWeight:700, fontSize:17, margin:0 }}>Add Ingredient</h3><p style={{ color:T.textMuted, fontSize:12, margin:'3px 0 0' }}>Add a new ingredient to your inventory</p></div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, background:T.surfaceEl, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:T.textMuted }}><X size={15}/></button>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:24 }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:16 }}>
            <div><label style={L}>Ingredient Name *</label><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Chicken Breast" style={S} onFocus={onFocus} onBlur={onBlur}/></div>
            <div><label style={L}>SKU / Code</label><input value={form.sku} onChange={e=>set('sku',e.target.value)} placeholder="CHK-001" style={S} onFocus={onFocus} onBlur={onBlur}/></div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
            <div><label style={L}>Category</label><div style={{ position:'relative' }}><select value={form.category} onChange={e=>set('category',e.target.value)} style={{ ...S, appearance:'none', paddingRight:36, cursor:'pointer' }} onFocus={onFocus} onBlur={onBlur}>{CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select><ChevronDown size={14} color={T.textMuted} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/></div></div>
            <div><label style={L}>Unit of Measurement</label><div style={{ position:'relative' }}><select value={form.unit} onChange={e=>set('unit',e.target.value)} style={{ ...S, appearance:'none', paddingRight:36, cursor:'pointer' }} onFocus={onFocus} onBlur={onBlur}>{UNITS.map(u=><option key={u} value={u}>{u}</option>)}</select><ChevronDown size={14} color={T.textMuted} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/></div></div>
          </div>
          <div style={{ padding:16, background:T.surfaceEl, borderRadius:12, border:`1px solid ${T.border}`, marginBottom:16 }}>
            <p style={{ color:T.textSecondary, fontWeight:700, fontSize:12, margin:'0 0 14px' }}>📦 Stock Level Thresholds</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
              {[{k:'minStock',l:'Minimum Stock',p:'10',h:'Alert below this'},{k:'reorderLevel',l:'Reorder Level',p:'15',h:'Trigger reorder'},{k:'maxStock',l:'Maximum Stock',p:'50',h:'Upper limit'}].map(({k,l,p,h})=>(
                <div key={k}><label style={L}>{l}</label><input type="number" value={form[k as keyof typeof form]} onChange={e=>set(k,e.target.value)} placeholder={p} style={{ ...S, background:T.bg }} onFocus={onFocus} onBlur={onBlur}/><p style={{ color:T.textSubtle, fontSize:10, marginTop:4 }}>{h}</p></div>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
            <div><label style={L}>Average Cost (₹ per {form.unit})</label><div style={{ position:'relative' }}><span style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', color:T.textMuted, fontSize:13 }}>₹</span><input type="number" value={form.avgCost} onChange={e=>set('avgCost',e.target.value)} placeholder="0.00" style={{ ...S, paddingLeft:28 }} onFocus={onFocus} onBlur={onBlur}/></div></div>
            <div><label style={L}>Primary Supplier</label><input value={form.supplier} onChange={e=>set('supplier',e.target.value)} placeholder="e.g. Ram Poultry Farms" style={S} onFocus={onFocus} onBlur={onBlur}/></div>
          </div>
          {(form.name||form.avgCost)&&(<div style={{ padding:'14px 16px', background:`${T.gold}0E`, border:`1px solid ${T.gold}30`, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div><p style={{ color:T.textPrimary, fontWeight:700, fontSize:13, margin:0 }}>{form.name||'Ingredient Name'}</p><p style={{ color:T.textMuted, fontSize:11, margin:'3px 0 0' }}>{form.category} · {form.unit}</p></div>
            <div style={{ textAlign:'right' }}><p style={{ color:T.gold, fontWeight:800, fontSize:15, margin:0 }}>₹{form.avgCost||'0'}/{form.unit}</p>{stockValue&&<p style={{ color:T.textMuted, fontSize:11, margin:'3px 0 0' }}>Min stock value: {fmtINRFull(stockValue)}</p>}</div>
          </div>)}
        </div>
        <div style={{ padding:'16px 24px', borderTop:`1px solid ${T.border}`, display:'flex', gap:10, flexShrink:0, background:T.surfaceEl }}>
          <button onClick={onClose} style={{ flex:1, padding:11, borderRadius:10, border:`1px solid ${T.border}`, background:'transparent', color:T.textSecondary, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
          <button onClick={()=>{ if(!form.name) return; setDone(true); setTimeout(onClose,900) }} style={{ flex:2, padding:11, borderRadius:10, border:'none', fontFamily:'inherit', background:done?T.green:`linear-gradient(135deg,${T.burgundy},#7A1828)`, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.2s' }}>
            {done?<><Check size={15}/> Ingredient Added!</>:<><Plus size={15}/> Add Ingredient</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function IngredientsPage() {
  const T = useT()
  const [showAddIngredient, setShowAddIngredient] = useState(false)
  const totalValue = INGREDIENTS.reduce((s,i)=>s+i.stockValue,0)
  const lowCount   = INGREDIENTS.filter(i=>i.status==='low'||i.status==='critical').length
  const outCount   = INGREDIENTS.filter(i=>i.status==='out').length

  return (
    <div>
      {showAddIngredient&&<AddIngredientModal onClose={()=>setShowAddIngredient(false)}/>}
      <PageHeader title="Ingredients & Stock" subtitle="Manage your inventory and ingredient costs" action={<Btn icon={Plus} onClick={()=>setShowAddIngredient(true)}>Add Ingredient</Btn>}/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
        <MetricCard label="Total Inventory Value" value={fmtINRFull(totalValue)} icon={Warehouse} color={T.gold}/>
        <MetricCard label="Total Ingredients" value={INGREDIENTS.length} icon={Package} color={T.blue}/>
        <MetricCard label="Low / Critical Stock" value={lowCount} icon={AlertTriangle} color={T.amber}/>
        <MetricCard label="Out of Stock" value={outCount} icon={XCircle} color={T.red}/>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
        <SearchBar placeholder="Search ingredients…"/>
        <Btn variant="ghost" icon={Filter}>Filter</Btn>
        <div style={{ marginLeft:'auto' }}><Btn icon={Plus}>Add Purchase</Btn></div>
      </div>
      <Card>
        <DataTable
          columns={[
            { key:'name', label:'Ingredient', render:(v,r)=>(<div><div style={{ fontWeight:700, color:T.textPrimary, fontSize:13 }}>{String(v)}</div><div style={{ fontSize:11, color:T.textMuted }}>{String((r as {category:string}).category)}</div></div>) },
            { key:'current', label:'Current Stock', render:(v,r)=>{ const row=r as {status:string;unit:string}; return <span style={{ fontWeight:700, color:row.status==='out'?T.red:row.status==='critical'?T.red:row.status==='low'?T.amber:T.textPrimary }}>{String(v)} {row.unit}</span> }},
            { key:'min', label:'Min Level', render:(v,r)=>`${v} ${(r as {unit:string}).unit}` },
            { key:'reorder', label:'Reorder At', render:(v,r)=>`${v} ${(r as {unit:string}).unit}` },
            { key:'avgCost', label:'Avg Cost', render:(v,r)=>`₹${v}/${(r as {unit:string}).unit}` },
            { key:'stockValue', label:'Stock Value', render:v=><span style={{ fontWeight:700, color:T.gold }}>{fmtINRFull(Number(v))}</span> },
            { key:'status', label:'Status', render:(_,r)=><StatusBadge status={String((r as {status:string}).status)}/> },
            { key:'id', label:'', render:()=>(<div style={{ display:'flex', gap:6 }}><button style={{ padding:'5px 12px', borderRadius:7, border:`1px solid ${T.border}`, background:T.surfaceEl, color:T.textMuted, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Edit</button><button style={{ padding:'5px 12px', borderRadius:7, border:`1px solid ${T.border}`, background:T.surfaceEl, color:T.textMuted, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Adjust</button></div>) },
          ]}
          data={INGREDIENTS as Record<string,unknown>[]}
        />
      </Card>
    </div>
  )
}
