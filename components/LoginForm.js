import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validasi sederhana
    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi')
      setLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Format email tidak valid')
      setLoading(false)
      return
    }

    try {
      // Simulasi proses login
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Login berhasil - redirect ke dashboard
      router.push('/dashboard')
    } catch (err) {
      setError('Login gagal. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className={`login-form ${loading ? 'loading' : ''}`}>
        <div className="logo">
          {/* Ganti dengan logo Anda */}
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            borderRadius: '50%',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            LOGO
          </div>
          <h1>Welcome Back</h1>
          <p style={{ color: '#666', marginTop: '5px' }}>Please sign in to your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn-login"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="forgot-password">
          <a href="#">Forgot your password?</a>
        </div>
      </div>
    </div>
  )
}