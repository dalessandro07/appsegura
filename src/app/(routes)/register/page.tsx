import RegisterForm from '@/app/(routes)/register/components/RegisterForm'
import Link from 'next/link'

export default function RegisterPage () {
  return (
    <main className='p-5 flex flex-col gap-10'>
      <h1 className='text-2xl font-bold'>Crea tu cuenta</h1>

      <RegisterForm />

      <Link className='text-sm underline' href='/login'>
        ¿Ya tienes una cuenta? Inicia sesión
      </Link>
    </main>
  )
}
