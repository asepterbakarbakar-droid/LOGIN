import Head from 'next/head'
import LoginForm from '../components/LoginForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ultimate Login - Next Generation</title>
        <meta name="description" content="Experience the future of authentication" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Video Background */}
        <div className="video-background">
          <video autoPlay muted loop playsInline>
            <source src="/videos/purple-knight.3840x2160.mp4" type="video/mp4" />
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

