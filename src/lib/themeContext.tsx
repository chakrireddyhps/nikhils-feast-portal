'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { DARK, LIGHT, Theme } from './theme'

interface ThemeCtx {
  theme: Theme
  isDark: boolean
  toggle: () => void
}

const Ctx = createContext<ThemeCtx>({ theme: DARK, isDark: true, toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('nf-theme')
    if (saved === 'light') setIsDark(false)
  }, [])

  function toggle() {
    setIsDark(prev => {
      const next = !prev
      localStorage.setItem('nf-theme', next ? 'dark' : 'light')
      return next
    })
  }

  const theme = isDark ? DARK : LIGHT

  // Apply CSS vars on body for global overrides
  useEffect(() => {
    document.body.style.background = theme.bg
    document.body.style.color = theme.textPrimary
  }, [theme])

  return (
    <Ctx.Provider value={{ theme, isDark, toggle }}>
      {children}
    </Ctx.Provider>
  )
}

export function useTheme() { return useContext(Ctx) }
