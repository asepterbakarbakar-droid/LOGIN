import Head from 'next/head'
import dynamic from 'next/dynamic'

// Dynamic import untuk menghindari SSR issues
const LoginForm = dynamic(() => import('../components/LoginForm'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      color: '#00ff41',
      fontFamily: 'monospace'
    }}>
      INITIALIZING SYSTEM...
    </div>
  )
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Cyber Login - Matrix System</title>
        <meta name="description" content="Enter the digital realm" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        {/* Video Background Fallback */}
        <div className="video-background">
          <video autoPlay muted loop playsInline>
            <source src="/videos/background.mp4" type="video/mp4" />
            <source src="/videos/background.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay"></div>
        </div>

        {/* Login Form Component */}
        <LoginForm />
      </main>
    </>
  )
}
