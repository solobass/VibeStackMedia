'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Store password in localStorage for client-side auth
    localStorage.setItem('vsm_admin_auth', pw)
    
    // Test auth with API
    fetch('/api/admin/list-files', {
      headers: { authorization: `Bearer ${pw}` },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('vsm_admin_auth')
          setError('Wrong password')
        } else {
          router.push('/admin')
        }
      })
      .catch(() => {
        setError('Connection error')
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl mb-4 font-semibold">Admin Login</h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm">{error}</div>
        )}
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          className="border border-slate-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

