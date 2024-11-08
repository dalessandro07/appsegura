import RegisterForm from '@/app/(routes)/register/components/RegisterForm'
import { getSession } from '@/app/actions/action-session'
import { EarthLockIcon } from 'lucide-react'
import Link from 'next/link'

export default async function RegisterPage () {
  const { user } = await getSession()

  return (
    <main className='p-5 flex flex-col gap-10'>
      <header className='flex justify-between items-center'>
        <Link href='/' className='flex items-center gap-1'>
          <EarthLockIcon size={32} />
          <span className='text-xs font-bold'>AppSegura</span>
        </Link>

        {user ? (
          <div className='flex items-center gap-5'>
            Bienvenido, {user.nombre_comisaria} - ({user.dni})
          </div>
        ) : (
          <nav>
            <ul className='flex gap-2 text-sm'>
              <li>
                <Link className='underline' href='/login'>
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link className='underline' href='/register'>
                  Registrarse
                </Link>
              </li>
              <li>
                <Link className='underline' href='/reportes'>
                  Reportes
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <h1 className='text-2xl font-bold'>Crea tu cuenta</h1>

      <RegisterForm />

      <Link className='text-sm underline' href='/login'>
        ¿Ya tienes una cuenta? Inicia sesión
      </Link>
    </main>
  )
}
