import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Dashboard() {
  const router = useRouter()

  const handleLogout = () => {
    // Simulasi logout
    router.push('/')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '20px'
    }}>
      <Head>
        <title>Dashboard - My App</title>
      </Head>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '20px' }}>Welcome to Dashboard!</h1>
        <p style={{ marginBottom: '30px', fontSize: '18px' }}>
          You have successfully logged in.
        </p>
        <button
          onClick={handleLogout}
          style={{
            padding: '12px 30px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = '#667eea';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.color = 'white';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}