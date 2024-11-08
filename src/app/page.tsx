import { getSession } from '@/app/actions/action-session'
import HeaderMenu from '@/app/components/HeaderMenu'
import IncidenteMain from '@/app/components/IncidenteMain'

export default async function Home () {
  const { user } = await getSession()

  return (
    <main className='flex flex-col gap-10'>
      <HeaderMenu user={user} />

      <IncidenteMain user={user} />
    </main>
  )
}
