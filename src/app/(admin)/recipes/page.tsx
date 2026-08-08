'use client'
import { useState } from 'react'
import { Card, Btn, SearchBar, PageHeader } from '@/components/ui'
import { T, RECIPES } from '@/lib/mockData'
import { Plus, Edit } from 'lucide-react'

export default function RecipesPage() {
  const [selected, setSelected] = useState(RECIPES[0])

  return (
    <div>
      <PageHeader title="Recipes / Bill of Materials" subtitle="Define ingredient costs for every menu item" action={<Btn icon={Plus}>Add Recipe</Btn>}/>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
        {/* List */}
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ padding: '12px 14px', borderBottom: `1px solid ${T.border}` }}>
            <SearchBar placeholder="Search recipes…"/>
          </div>
          {RECIPES.map(r => (
            <div key={r.id} onClick={() => setSelected(r)}
              style={{
                padding: '14px 18px', borderBottom: `1px solid ${T.border}`, cursor: 'pointer',
                background: selected?.id === r.id ? `${T.burgundy}20` : 'transparent',
                borderLeft: selected?.id === r.id ? `2px solid ${T.burgundyLight}` : '2px solid transparent',
                transition: 'background 0.1s',
              }}>
              <div style={{ fontWeight: 700, color: T.textPrimary, fontSize: 13 }}>{r.item}</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <span style={{ fontSize: 11, color: T.textMuted }}>Cost: <span style={{ color: T.red }}>₹{r.cost}</span></span>
                <span style={{ fontSize: 11, color: T.textMuted }}>Price: <span style={{ color: T.gold }}>₹{r.sellingPrice}</span></span>
              </div>
            </div>
          ))}
        </Card>

        {/* Detail */}
        {selected && (() => {
          const grossProfit   = selected.sellingPrice - selected.cost
          const margin        = ((grossProfit / selected.sellingPrice) * 100).toFixed(1)
          const foodCostPct   = ((selected.cost / selected.sellingPrice) * 100).toFixed(1)
          return (
            <Card style={{ padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <h3 style={{ color: T.textPrimary, fontWeight: 800, fontSize: 18, margin: 0 }}>{selected.item}</h3>
                  <p style={{ color: T.textMuted, fontSize: 12, marginTop: 4 }}>Yield: 1 serving</p>
                </div>
                <Btn variant="ghost" small icon={Edit}>Edit Recipe</Btn>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 22 }}>
                {[
                  { label: 'Selling Price', value: `₹${selected.sellingPrice}`, color: T.gold },
                  { label: 'Recipe Cost',   value: `₹${selected.cost}`,         color: T.red  },
                  { label: 'Gross Profit',  value: `₹${grossProfit}`,           color: T.green },
                  { label: 'Food Cost %',   value: `${foodCostPct}%`,           color: T.amber },
                ].map(m => (
                  <div key={m.label} style={{ padding: '14px 16px', background: T.surfaceEl, borderRadius: 12, border: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: m.color }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3, fontWeight: 600 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 600 }}>Gross Margin</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: Number(margin) > 60 ? T.green : T.amber }}>{margin}%</span>
                </div>
                <div style={{ height: 8, background: T.surfaceEl, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${margin}%`, borderRadius: 4, background: `linear-gradient(90deg, ${T.green}, ${T.goldLight})`, transition: 'width 0.8s' }}/>
                </div>
              </div>

              <h4 style={{ color: T.textPrimary, fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Ingredients</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                    {['Ingredient', 'Qty', 'Unit', 'Line Cost', '% of Recipe'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', background: T.surfaceEl }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selected.ingredients.map((ing, idx) => (
                    <tr key={idx} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: T.textPrimary, fontSize: 13 }}>{ing.name}</td>
                      <td style={{ padding: '10px 12px', color: T.textSecondary, fontSize: 13 }}>{ing.qty}</td>
                      <td style={{ padding: '10px 12px', color: T.textMuted, fontSize: 13 }}>{ing.unit}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: T.textPrimary }}>₹{ing.cost.toFixed(2)}</td>
                      <td style={{ padding: '10px 12px', color: T.textMuted, fontSize: 12 }}>{((ing.cost / selected.cost) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr style={{ background: T.surfaceEl }}>
                    <td colSpan={3} style={{ padding: '12px', fontWeight: 800, color: T.textPrimary, fontSize: 13 }}>TOTAL RECIPE COST</td>
                    <td style={{ padding: '12px', fontWeight: 800, color: T.red, fontSize: 14 }}>₹{selected.cost}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: T.textMuted }}>100%</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          )
        })()}
      </div>
    </div>
  )
}
