import { getSession } from '@/app/actions/action-session'
import TablaIncidentes from '@/app/components/IncidentesTabla'
import HeaderMenu from '@/app/components/HeaderMenu'

export default async function PageReportes () {
  const { user } = await getSession()

  return (
    <main className='p-5 flex flex-col gap-10'>
      <HeaderMenu user={user} />

      <h1 className='font-bold text-2xl'>
        Reportes de incidentes
      </h1>

      <TablaIncidentes />
    </main>
  )
}
