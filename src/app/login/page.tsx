'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'

export default function LoginPage() {
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #1A0304 0%, #3D0707 35%, #7A0000 65%, #9B2335 100%)' }}>

      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)' }}/>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(155,35,53,0.25) 0%, transparent 70%)' }}/>
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '28px 28px' }}/>
      </div>

      <div className="relative w-full max-w-[390px]">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-[22px] mb-5"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              fontSize: 34,
            }}>
            🍗
          </div>
          <h1 className="text-white text-[22px] font-extrabold tracking-tight drop-shadow-sm">
            NIKHIL&apos;S FEAST
          </h1>
          <p className="text-white/60 text-sm mt-1.5 font-medium tracking-wide">
            A Feast To Be Remembered
          </p>
        </div>

        {/* Card — white, exactly like reference */}
        <div className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.98)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)',
          }}>

          {/* Top stripe */}
          <div className="h-1 w-full"
            style={{ background: 'linear-gradient(90deg, #9B2335 0%, #C0272D 50%, #C9A84C 100%)' }}/>

          <div className="px-7 pt-7 pb-7">
            <div className="mb-7">
              <h2 className="text-gray-900 text-xl font-extrabold tracking-tight">Welcome back</h2>
              <p className="text-gray-500 text-sm mt-1.5 font-medium">Sign in to manage your restaurant</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5"/>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="nikhil@nikhilsfeast.com"
                  className="w-full px-4 py-3 text-sm text-gray-900 font-medium bg-white border border-gray-200 rounded-xl placeholder-gray-400 transition-all duration-150"
                  style={{ outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#9B2335'}
                  onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 text-sm text-gray-900 font-medium bg-white border border-gray-200 rounded-xl placeholder-gray-400 transition-all duration-150"
                    style={{ outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#9B2335'}
                    onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                    required
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-0.5">
                    {showPw ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-60 mt-1"
                style={{
                  background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #9B2335 0%, #7A1828 100%)',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(155,35,53,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                  letterSpacing: '-0.01em',
                }}>
                {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div className="mt-7 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 font-medium">
                © 2024 Nikhil&apos;s Feast · Restaurant Management Portal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
