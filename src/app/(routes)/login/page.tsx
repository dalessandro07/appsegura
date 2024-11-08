import LoginForm from '@/app/(routes)/login/components/LoginForm'
import { getSession } from '@/app/actions/action-session'
import HeaderMenu from '@/app/components/HeaderMenu'
import Link from 'next/link'

export default async function LoginPage () {
  const { user } = await getSession()

  return (
    <main className='p-5 flex flex-col gap-10'>
      <HeaderMenu user={user} />

      <h1 className='font-bold text-2xl'>Inicia sesión</h1>

      <LoginForm />

      <Link className='text-sm underline' href='/register'>
        ¿No tienes una cuenta? Regístrate
      </Link>
    </main>
  )
}
