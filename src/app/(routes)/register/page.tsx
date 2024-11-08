import RegisterForm from '@/app/(routes)/register/components/RegisterForm'
import { getSession } from '@/app/actions/action-session'
import HeaderMenu from '@/app/components/HeaderMenu'
import Link from 'next/link'

export default async function RegisterPage () {
  const { user } = await getSession()

  return (
    <main className='p-5 flex flex-col gap-10'>
      <HeaderMenu user={user} />

      <h1 className='text-2xl font-bold'>Crea tu cuenta</h1>

      <RegisterForm />

      <Link className='text-sm underline' href='/login'>
        ¿Ya tienes una cuenta? Inicia sesión
      </Link>
    </main>
  )
}
