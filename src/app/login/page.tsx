'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { T } from '@/lib/mockData'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('nikhil@nikhilsfeast.com')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 800)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 30% 20%, #3D0808 0%, #1A0A08 40%, #0F0B0A 100%)',
      padding: 20, position: 'relative', overflow: 'hidden',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${T.burgundy}15 0%, transparent 70%)`, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: -120, left: -120, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${T.gold}08 0%, transparent 70%)`, pointerEvents: 'none' }}/>
      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '28px 28px', pointerEvents: 'none' }}/>

      <div style={{ width: '100%', maxWidth: 400, position: 'relative' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', width: 72, height: 72, borderRadius: 20,
            background: `linear-gradient(135deg, ${T.burgundy} 0%, #6B1020 100%)`,
            alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 16,
            boxShadow: `0 8px 32px ${T.burgundyGlow}`,
          }}>🍗</div>
          <h1 style={{ color: T.textPrimary, fontWeight: 900, fontSize: 24, margin: 0, letterSpacing: '-0.3px' }}>NIKHIL&apos;S FEAST</h1>
          <p style={{ color: T.gold, fontSize: 13, fontWeight: 600, margin: '6px 0 0', letterSpacing: '0.05em' }}>A Feast To Be Remembered</p>
        </div>

        {/* Card */}
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
          <div style={{ height: 3, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold}, ${T.burgundy})` }}/>
          <div style={{ padding: '28px 28px 24px' }}>
            <h2 style={{ color: T.textPrimary, fontWeight: 800, fontSize: 20, margin: '0 0 6px' }}>Welcome back</h2>
            <p style={{ color: T.textMuted, fontSize: 13, marginBottom: 24, fontWeight: 500 }}>Sign in to manage your restaurant</p>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 }}>Email Address</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ width: '100%', padding: '11px 14px', background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ width: '100%', padding: '11px 40px 11px 14px', background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, padding: 0 }}>
                    {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '13px', borderRadius: 12, border: 'none',
                background: loading ? '#444' : `linear-gradient(135deg, ${T.burgundy} 0%, #7A1828 100%)`,
                color: '#fff', fontSize: 14, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.05em', boxShadow: `0 4px 20px ${T.burgundyGlow}`,
                marginBottom: 16, fontFamily: 'inherit', transition: 'all 0.15s',
              }}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: 11, color: T.textMuted }}>
              © 2024 Nikhil&apos;s Feast · Restaurant Management Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
