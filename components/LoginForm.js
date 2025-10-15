import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const dummyUsers = [
  { email: 'user@example.com', password: 'password123', name: 'John Doe', role: 'user', avatar: '👨‍💼' },
  { email: 'admin@example.com', password: 'admin123', name: 'Sarah Wilson', role: 'admin', avatar: '👩‍💻' },
  { email: 'premium@example.com', password: 'premium123', name: 'Mike Johnson', role: 'premium', avatar: '🎩' }
]

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeDemo, setActiveDemo] = useState(null)
  const [floatingElements, setFloatingElements] = useState([])
  const router = useRouter()
  const formRef = useRef()

  // Floating elements animation
  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 20,
      type: ['🔮', '⚡', '🌟', '💎', '🚀', '🎯', '🔥', '💫'][i % 8]
    }))
    setFloatingElements(elements)
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    setError('')
    setActiveDemo(null)
  }

  const fillDemoCredentials = (email, password, index) => {
    setFormData({
      email,
      password,
      rememberMe: false
    })
    setActiveDemo(index)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.email || !formData.password) {
      setError('🔥 Please fill all fields!')
      setLoading(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const user = dummyUsers.find(
        u => u.email === formData.email && u.password === formData.password
      )

      if (user) {
        // Success effect
        document.body.style.overflow = 'hidden'
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email)
        }

        sessionStorage.setItem('currentUser', JSON.stringify(user))
        
        // Redirect dengan delay untuk animasi
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        setError('❌ Invalid email or password!')
      }
    } catch (err) {
      setError('💥 Login failed! Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Background Elements */}
      <div className="floating-elements">
        {floatingElements.map(element => (
          <div
            key={element.id}
            className="floating-element"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`
            }}
          >
            {element.type}
          </div>
        ))}
      </div>

      {/* Animated Background Gradient */}
      <div className="animated-gradient"></div>

      <div className="container">
        <div className={`login-card ${loading ? 'pulse' : ''}`} ref={formRef}>
          
          {/* Header dengan Animasi */}
          <div className="card-header">
            <div className="logo-wrapper">
              <div className="logo-circle">
                <div className="logo-inner">⚡</div>
              </div>
              <div className="logo-orbits">
                <div className="orbit orbit-1"></div>
                <div className="orbit orbit-2"></div>
                <div className="orbit orbit-3"></div>
              </div>
            </div>
            <h1 className="main-title">
              Welcome <span className="title-gradient">Back!</span>
            </h1>
            <p className="subtitle">Ready to continue your journey?</p>
          </div>

          {/* Demo Accounts - Styled seperti game cards */}
          <div className="demo-section">
            <div className="section-label">
              <span>🚀 Quick Launch</span>
            </div>
            <div className="demo-cards">
              {dummyUsers.map((user, index) => (
                <div
                  key={index}
                  className={`demo-card ${activeDemo === index ? 'active' : ''}`}
                  onClick={() => fillDemoCredentials(user.email, user.password, index)}
                >
                  <div className="demo-avatar">{user.avatar}</div>
                  <div className="demo-info">
                    <span className="demo-role">{user.role}</span>
                    <span className="demo-name">{user.name}</span>
                  </div>
                  <div className="demo-badge">{user.role.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Login - Modern Design */}
          <div className="social-section">
            <div className="divider">
              <span>Or power up with</span>
            </div>
            <div className="social-grid">
              <button className="social-item google">
                <span className="social-icon">🔍</span>
                <span>Google</span>
              </button>
              <button className="social-item github">
                <span className="social-icon">🐙</span>
                <span>GitHub</span>
              </button>
              <button className="social-item apple">
                <span className="social-icon">🍎</span>
                <span>Apple</span>
              </button>
            </div>
          </div>

          {/* Login Form - Ultra Modern */}
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-banner">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="input-group">
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="modern-input"
                  placeholder=" "
                />
                <label className="modern-label">📧 Email Address</label>
                <div className="input-decoration"></div>
              </div>
            </div>

            <div className="input-group">
              <div className="input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="modern-input"
                  placeholder=" "
                />
                <label className="modern-label">🔒 Password</label>
                <button
                  type="button"
                  className="password-reveal"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
                <div className="input-decoration"></div>
              </div>
            </div>

            <div className="form-actions">
              <label className="checkbox-modern">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">Remember this device</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  <span>Initializing System...</span>
                </>
              ) : (
                <>
                  <span className="button-icon">🚀</span>
                  <span>Launch Session</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="card-footer">
            <p>
              New to our universe?{' '}
              <a href="#" className="signup-link">
                Create Warp Drive <span>→</span>
              </a>
            </p>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="loading-spinner"></div>
                <p>Engaging Hyperdrive...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
