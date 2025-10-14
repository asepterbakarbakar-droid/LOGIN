import Head from 'next/head'
import LoginForm from '../components/LoginForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Login - My App</title>
        <meta name="description" content="Login to your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Video Background */}
        <div className="video-background">
          <video autoPlay muted loop playsInline>
            <source src="/videos/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay"></div>
        </div>

        {/* Login Form */}
        <LoginForm />
      </main>
    </>
  )
}