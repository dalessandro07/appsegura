import LoginForm from '@/app/(routes)/login/components/LoginForm'
import Link from 'next/link'

export default function LoginPage () {
  return (
    <main className='p-5 flex flex-col gap-10'>
      <h1 className='font-bold text-2xl'>Inicia sesión</h1>

      <LoginForm />

      <Link className='text-sm underline' href='/register'>
        ¿No tienes una cuenta? Regístrate
      </Link>
    </main>
  )
}
