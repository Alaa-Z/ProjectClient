import RegisterForm from 'components/RegisterForm'
import Head from 'next/head';
import MainLayout from '@/components/MainLayout';

function Register() {
  return (
    <div>
        <Head>
        <title>Sign up</title>
        </Head>
        <MainLayout>
          <RegisterForm />
        </MainLayout>
    </div>
  )
}

export default Register;
