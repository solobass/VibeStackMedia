'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminHome() {
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('vsm_admin_auth')
    if (!auth) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to Vibe Stack Admin</h2>
      <p>Select a content section from the sidebar to get started.</p>
    </div>
  )
}

