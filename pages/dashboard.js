import { useRouter } from 'next/router'
import Head from 'next/head' // Tambahkan import ini

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
        <meta name="description" content="User dashboard" />
      </Head>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>🎉 Welcome to Dashboard!</h1>
        <p style={{ marginBottom: '30px', fontSize: '18px', opacity: 0.9 }}>
          You have successfully logged in to your account.
        </p>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Account Information</h3>
          <p><strong>Email:</strong> user@example.com</p>
          <p><strong>Status:</strong> Active</p>
          <p><strong>Last Login:</strong> Just now</p>
        </div>

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
            transition: 'all 0.3s ease',
            fontWeight: '600'
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
