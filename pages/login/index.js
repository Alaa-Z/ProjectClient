import LoginForm from 'components/LoginForm'
import Head from 'next/head';
import MainLayout from '@/components/MainLayout';

function Login() {
  return (
    <div>
        <Head>
          <title>Login</title>
        </Head>
        <MainLayout>
          <LoginForm />
        </MainLayout>
        
    </div>
  )
}

export default Login;
