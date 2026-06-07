import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

function Dashboard() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
  }, [])

  if (loading) return <p style={{ color: 'white' }}>Cargando...</p>

  if (!session) return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '4rem' }}>
      <p>No hay sesión activa.</p>
      <a href="/landing.html" style={{ color: '#6e7cfb' }}>
        Ir al landing →
      </a>
    </div>
  )

  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '4rem' }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {session.user.email}</p>
    </div>
  )
}

export default Dashboard