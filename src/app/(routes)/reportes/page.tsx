import TablaIncidentes from '@/app/components/IncidentesTabla'

export default function PageReportes () {
  return (
    <main className='p-5 flex flex-col gap-10'>

      <h1 className='font-bold text-2xl'>
        Reportes de incidentes
      </h1>

      <TablaIncidentes />
    </main>
  )
}
