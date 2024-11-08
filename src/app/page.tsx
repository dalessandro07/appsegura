import { getSession } from '@/app/actions/action-session'
import IncidenteMain from '@/app/components/IncidenteMain'
import { EarthLockIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Home () {
  const { user } = await getSession()

  return (
    <main className='p-5 flex flex-col gap-10'>
      <header className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <EarthLockIcon size={32} />
          <span className='text-xs font-bold'>AppSegura</span>
        </div>

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
            </ul>
          </nav>
        )}
      </header>

      <IncidenteMain user={user} />
    </main>
  )
}
