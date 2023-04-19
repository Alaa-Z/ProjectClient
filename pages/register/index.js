import RegisterForm from 'components/RegisterForm'
import Head from 'next/head';

function Register() {
  return (
    <div>
        <Head>
        <title>Sign up</title>
        </Head>
        <h1>Register</h1>
        <RegisterForm />
    </div>
  )
}

export default Register;
