import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const dummyUsers = [
  { 
    email: 'user@example.com', 
    password: 'password123', 
    name: 'Neo Anderson', 
    role: 'The One',
    level: '99',
    power: 'Reality Bender',
    avatar: '👁️',
    theme: 'matrix'
  },
  { 
    email: 'admin@example.com', 
    password: 'admin123', 
    name: 'Tony Stark', 
    role: 'Genius',
    level: '∞',
    power: 'Iron Suit',
    avatar: '⚡',
    theme: 'tech'
  },
  { 
    email: 'premium@example.com', 
    password: 'premium123', 
    name: 'Wonder Woman', 
    role: 'Amazon',
    level: 'Ω',
    power: 'God Mode',
    avatar: '🦸',
    theme: 'mythic'
  }
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
  const [particles, setParticles] = useState([])
  const [glitchEffect, setGlitchEffect] = useState(false)
  const router = useRouter()
  const canvasRef = useRef()
  const audioRef = useRef()

  // Matrix-style background particles
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particlesArray = []
    const numberOfParticles = 150

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.speed = Math.random() * 3 + 1
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = `hsl(${Math.random() * 60 + 150}, 100%, 50%)`
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height) {
          this.y = 0
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fillRect(this.x, this.y, this.size, this.size * 3)
        
        // Glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
      }
    }

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particlesArray.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  // Hover sound effects
  const playHoverSound = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

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
    playClickSound()
    setFormData({
      email,
      password,
      rememberMe: false
    })
    setActiveDemo(index)
    setError('')
    
    // Glitch effect
    setGlitchEffect(true)
    setTimeout(() => setGlitchEffect(false), 300)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    playClickSound()

    if (!formData.email || !formData.password) {
      setError('⚡ FILL ALL FIELDS, MORTAL! ⚡')
      setLoading(false)
      return
    }

    try {
      // Epic loading sequence
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      const user = dummyUsers.find(
        u => u.email === formData.email && u.password === formData.password
      )

      if (user) {
        // Success sequence
        document.body.classList.add('login-success')
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email)
        }

        sessionStorage.setItem('currentUser', JSON.stringify(user))
        
        // Redirect with epic transition
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError('💥 ACCESS DENIED! INVALID CREDENTIALS! 💥')
      }
    } catch (err) {
      setError('🌌 SYSTEM MALFUNCTION! TRY AGAIN! 🌌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Matrix Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="matrix-background"
      />

      {/* Hidden Audio for Sound Effects */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/hover.mp3" type="audio/mpeg" />
      </audio>

      {/* Glitch Overlay */}
      {glitchEffect && <div className="glitch-overlay" />}

      {/* Main Container */}
      <div className="galactic-container">
        
        {/* Login Card */}
        <div className={`cyber-card ${loading ? 'quantum-loading' : ''} ${glitchEffect ? 'glitch' : ''}`}>
          
          {/* Header with Animated Title */}
          <div className="cyber-header">
            <div className="title-container">
              <h1 className="cyber-title">
                <span className="title-char">W</span>
                <span className="title-char">E</span>
                <span className="title-char">L</span>
                <span className="title-char">C</span>
                <span className="title-char">O</span>
                <span className="title-char">M</span>
                <span className="title-char">E</span>
                <span className="title-space"> </span>
                <span className="title-char">C</span>
                <span className="title-char">H</span>
                <span className="title-char">O</span>
                <span className="title-char">S</span>
                <span className="title-char">E</span>
                <span className="title-char">N</span>
                <span className="title-char"> </span>
                <span className="title-char">O</span>
                <span className="title-char">N</span>
                <span className="title-char">E</span>
              </h1>
              <div className="title-subtitle">
                SELECT YOUR DIGITAL AVATAR
              </div>
            </div>
          </div>

          {/* Character Selection Grid */}
          <div className="character-grid">
            {dummyUsers.map((user, index) => (
              <div
                key={index}
                className={`character-card ${activeDemo === index ? 'active' : ''} ${user.theme}`}
                onClick={() => fillDemoCredentials(user.email, user.password, index)}
                onMouseEnter={playHoverSound}
              >
                <div className="character-avatar">
                  <div className="avatar-glow"></div>
                  <span className="avatar-icon">{user.avatar}</span>
                </div>
                <div className="character-info">
                  <h3 className="character-name">{user.name}</h3>
                  <div className="character-stats">
                    <span className="stat role">{user.role}</span>
                    <span className="stat level">LVL {user.level}</span>
                    <span className="stat power">{user.power}</span>
                  </div>
                </div>
                <div className="selection-indicator">
                  <div className="indicator-ring"></div>
                  <div className="indicator-core"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Manual Login Section */}
          <div className="manual-login">
            <div className="section-divider">
              <span>OR INPUT MANUAL OVERRIDE</span>
            </div>

            {error && (
              <div className="error-terminal">
                <div className="terminal-header">
                  <span className="terminal-title">SYSTEM ALERT</span>
                  <span className="terminal-time">[{new Date().toLocaleTimeString()}]</span>
                </div>
                <div className="terminal-message">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="cyber-form">
              <div className="input-field cyber-input">
                <div className="input-decoration"></div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ENTER EMAIL PROTOCOL"
                  className="cyber-text-input"
                />
                <span className="input-label">EMAIL MATRIX</span>
                <div className="input-scanner"></div>
              </div>

              <div className="input-field cyber-input">
                <div className="input-decoration"></div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="INPUT ENCRYPTION KEY"
                  className="cyber-text-input"
                />
                <span className="input-label">PASSWORD CIPHER</span>
                <button
                  type="button"
                  className="password-scanner"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'ENCRYPT' : 'DECRYPT'}
                </button>
                <div className="input-scanner"></div>
              </div>

              <div className="form-controls">
                <label className="cyber-checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className="check-box"></span>
                  <span className="check-label">SAVE TO NEURAL NETWORK</span>
                </label>
                <button type="button" className="cyber-link">
                  PASSWORD RECOVERY PROTOCOL
                </button>
              </div>

              <button 
                type="submit" 
                className={`cyber-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="button-spinner"></div>
                    <span>INITIATING QUANTUM ENTRY...</span>
                    <div className="loading-bars">
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="button-glow"></span>
                    <span className="button-text">ACTIVATE DIGITAL PRESENCE</span>
                    <span className="button-pulse"></span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="cyber-footer">
            <div className="footer-grid">
              <div className="footer-item">
                <span className="footer-label">SYSTEM STATUS</span>
                <span className="footer-value online">OPERATIONAL</span>
              </div>
              <div className="footer-item">
                <span className="footer-label">SECURITY LEVEL</span>
                <span className="footer-value maximum">MAXIMUM</span>
              </div>
              <div className="footer-item">
                <span className="footer-label">USER COUNT</span>
                <span className="footer-value">∞</span>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="quantum-overlay">
              <div className="quantum-loader">
                <div className="quantum-sphere"></div>
                <div className="quantum-rings">
                  <div className="ring"></div>
                  <div className="ring"></div>
                  <div className="ring"></div>
                </div>
                <div className="loading-text">
                  <span>ACCESSING DIGITAL REALM</span>
                  <div className="loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Background Effects */}
        <div className="background-effects">
          <div className="effect-grid"></div>
          <div className="effect-particles"></div>
          <div className="effect-scanlines"></div>
        </div>
      </div>
    </>
  )
}
