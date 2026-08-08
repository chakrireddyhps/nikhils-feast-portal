'use client'
import { usePathname } from 'next/navigation'
import { AdminShell } from '@/components/layout/AdminShell'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return <AdminShell pathname={pathname}>{children}</AdminShell>
}
