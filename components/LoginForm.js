import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const dummyUsers = [
  { email: 'user@example.com', password: 'password123', name: 'John Doe', role: 'user' },
  { email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { email: 'premium@example.com', password: 'premium123', name: 'Premium User', role: 'premium' }
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
  const [shake, setShake] = useState(false)
  const [particles, setParticles] = useState([])
  const router = useRouter()
  const formRef = useRef()

  // Particle effect untuk background
  useEffect(() => {
    const createParticle = () => {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }
    }

    const initialParticles = Array.from({ length: 50 }, createParticle)
    setParticles(initialParticles)

    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
      })))
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [])

  // Auto-focus effect
  useEffect(() => {
    const inputs = formRef.current?.querySelectorAll('input')
    inputs?.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused')
      })
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused')
        }
      })
    })
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill all fields!')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Invalid email format!')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const user = dummyUsers.find(
        u => u.email === formData.email && u.password === formData.password
      )

      if (user) {
        // Success animation
        formRef.current.classList.add('success')
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email)
        }

        sessionStorage.setItem('currentUser', JSON.stringify(user))
        
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        setError('Invalid credentials!')
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
    } catch (err) {
      setError('Login failed!')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = (email, password) => {
    setFormData({
      email,
      password,
      rememberMe: false
    })
  }

  const socialLogin = (provider) => {
    setLoading(true)
    setTimeout(() => {
      alert(`${provider} login would be implemented here!`)
      setLoading(false)
    }, 1500)
  }

  return (
    <>
      {/* Animated Particles */}
      <div className="particles">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className={`login-form ${shake ? 'shake' : ''} ${loading ? 'loading' : ''}`} ref={formRef}>
          {/* Animated Logo */}
          <div className="logo-container">
            <div className="logo">
              <i className="fas fa-rocket"></i>
            </div>
            <h1 className="title">Welcome Back!</h1>
            <p className="subtitle">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          {/* Demo Accounts */}
          <div className="demo-section">
            <p className="demo-title">Quick Login (Demo):</p>
            <div className="demo-buttons">
              <button
                type="button"
                onClick={() => fillDemoCredentials('user@example.com', 'password123')}
                className="demo-btn user"
              >
                <i className="fas fa-user"></i>
                User
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin@example.com', 'admin123')}
                className="demo-btn admin"
              >
                <i className="fas fa-crown"></i>
                Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('premium@example.com', 'premium123')}
                className="demo-btn premium"
              >
                <i className="fas fa-gem"></i>
                Premium
              </button>
            </div>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <div className="divider">
              <span>Or continue with</span>
            </div>
            <div className="social-buttons">
              <button 
                type="button" 
                className="social-btn google"
                onClick={() => socialLogin('Google')}
                disabled={loading}
              >
                <i className="fab fa-google"></i>
              </button>
              <button 
                type="button" 
                className="social-btn github"
                onClick={() => socialLogin('GitHub')}
                disabled={loading}
              >
                <i className="fab fa-github"></i>
              </button>
              <button 
                type="button" 
                className="social-btn facebook"
                onClick={() => socialLogin('Facebook')}
                disabled={loading}
              >
                <i className="fab fa-facebook"></i>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <i className="fas fa-envelope icon"></i>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                disabled={loading}
                className="input-field"
              />
              <label className="input-label">Email Address</label>
            </div>

            <div className="input-group">
              <i className="fas fa-lock icon"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                disabled={loading}
                className="input-field"
              />
              <label className="input-label">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="form-footer">
            <p>
              Don't have an account? <a href="#" className="signup-link">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
