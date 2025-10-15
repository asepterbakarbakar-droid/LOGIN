import Head from 'next/head'
import LoginForm from '../components/LoginForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Login - Ultimate Power</title>
        <meta name="description" content="Ultimate Login Experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
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
          <div className="particles-container" id="particles-container"></div>
        </div>

        {/* Login Form */}
        <LoginForm />
      </main>
    </>
  )
}
