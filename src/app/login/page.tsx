'use client'
import { useT } from '@/lib/themeContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const T = useT()
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setLoading(true); setError('')
    setTimeout(() => router.push('/dashboard'), 900)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 30% 20%, #3D0808 0%, #1A0A08 40%, #0F0B0A 100%)',
      padding: 20, position: 'relative', overflow: 'hidden',
      fontFamily: "'Poppins', system-ui, sans-serif" }}>
      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,35,53,0.15) 0%, transparent 70%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: -120, left: -120, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '28px 28px', pointerEvents: 'none' }}/>

      <div style={{ width: '100%', maxWidth: 400, position: 'relative' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', width: 72, height: 72, borderRadius: 20,
            background: 'linear-gradient(135deg, #9B2335 0%, #6B1020 100%)',
            alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 16,
            boxShadow: '0 8px 32px rgba(155,35,53,0.35)' }}>🍗</div>
          <h1 style={{ color: T.textPrimary, fontWeight: 900, fontSize: 22, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            NIKHIL&apos;S FEAST
          </h1>
          <p style={{ color: '#C9A84C', fontSize: 12, fontWeight: 600, margin: '6px 0 0', letterSpacing: '0.08em' }}>
            A Feast To Be Remembered
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#1C1412', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
          <div style={{ height: 3, background: 'linear-gradient(90deg, #9B2335, #C9A84C, #9B2335)' }}/>

          <div style={{ padding: '28px 28px 24px' }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ color: T.textPrimary, fontWeight: 800, fontSize: 20, margin: '0 0 6px', letterSpacing: '-0.03em' }}>
                Welcome back
              </h2>
              <p style={{ color: T.textMuted, fontSize: 13, margin: 0, fontWeight: 500, letterSpacing: '0.01em' }}>
                Sign in to manage your restaurant
              </p>
            </div>

            {error && (
              <div style={{ background: 'rgba(224,90,90,0.1)', border: '1px solid rgba(224,90,90,0.3)', color: '#E05A5A', fontSize: 13, padding: '10px 14px', borderRadius: 10, marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <AlertCircle style={{ width: 15, height: 15, flexShrink: 0, marginTop: 1 }}/>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                  Email Address
                </label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address" required
                  style={{ width: '100%', padding: '11px 14px', background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', letterSpacing: '0.01em' }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#9B2335'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" required
                    style={{ width: '100%', padding: '11px 40px 11px 14px', background: T.surfaceEl, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.textPrimary, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#9B2335'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, padding: 0, display: 'flex' }}>
                    {showPw ? <EyeOff style={{ width: 16, height: 16 }}/> : <Eye style={{ width: 16, height: 16 }}/>}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '13px', borderRadius: 12, border: 'none',
                background: loading ? '#444' : 'linear-gradient(135deg, #9B2335 0%, #7A1828 100%)',
                color: '#fff', fontSize: 14, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '-0.01em', boxShadow: '0 4px 20px rgba(155,35,53,0.35)',
                marginBottom: 16, fontFamily: 'inherit', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {loading && <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }}/>}
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div style={{ textAlign: 'center', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 11, color: T.textSubtle, fontWeight: 500 }}>
                © 2026 Nikhil&apos;s Feast · Restaurant Management Portal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
