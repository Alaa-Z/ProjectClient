import LoginForm from 'components/LoginForm'
import Head from 'next/head';

function Login() {
  return (
    <div>
        <Head>
        <title>Login</title>
        </Head>
        <h1>Login</h1>
        <LoginForm />
    </div>
  )
}

export default Login;
