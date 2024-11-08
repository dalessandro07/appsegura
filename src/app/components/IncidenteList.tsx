import { Card, CardHeader, CardTitle, CardContent } from '@/core/components/ui/card'
import { useIncidenteStore, type Incidente } from '@/core/store/incidents'
import { incidenteTypes } from './incidenteTypes'

export default function IncidenteList () {
  const incidentes = useIncidenteStore((state) => state.incidentes as Array<Incidente & { tipo: keyof typeof incidenteTypes }>)

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Últimos Incidentes</CardTitle>
      </CardHeader>
      <CardContent>
        {incidentes.map((incidente, index) => {
          const { icon: Icon } = incidenteTypes[incidente.tipo]

          const maps_link = `https://www.google.com/maps/search/?api=1&query=${incidente.ubicacion}`

          return (
            <Card key={index} className='mb-4'>
              <CardHeader>
                <CardTitle className='text-lg flex items-center'>
                  <Icon className='mr-2 h-5 w-5' />
                  {incidente.tipo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {incidente.videoUrl && (
                  <video src={incidente.videoUrl} className='w-full mt-2 rounded mb-5' controls />
                )}

                <p className='pb-2'>
                  {incidente.descripcion}
                </p>

                {incidente.nombre && (
                  <p className='text-sm text-gray-500'>Reportado por: {incidente.nombre}</p>
                )}

                <p className='text-sm text-gray-500'>Ocurrió en: <a className='underline text-blue-600' target='_blank' href={maps_link} rel='noreferrer'>{incidente.ubicacion}</a></p>

                <p className='text-sm text-gray-500'>Fecha: {new Date(incidente.fecha).toLocaleString()}</p>
              </CardContent>
            </Card>
          )
        })}

        {incidentes.length === 0 && (
          <p className='text-sm text-gray-500'>Aún no hay incidentes reportados</p>
        )}
      </CardContent>
    </Card>
  )
}
