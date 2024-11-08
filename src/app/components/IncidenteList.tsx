'use client'

import { useRef } from 'react'
import { useIncidenteStore, type Incidente } from '@/core/store/incidents'
import { incidenteTypes } from './incidenteTypes'

export default function IncidenteList () {
  const incidentes = useIncidenteStore((state) => state.incidentes as Array<Incidente & { tipo: keyof typeof incidenteTypes }>)
  const containerRef = useRef<HTMLDivElement>(null)

  if (incidentes.length === 0) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-xl text-gray-500'>Aún no hay incidentes reportados</p>
      </div>
    )
  }

  return (
    <div className='relative h-screen overflow-hidden'>
      <div ref={containerRef} className='h-full overflow-y-scroll snap-y snap-mandatory'>
        {incidentes.map((incidente, index) => {
          const { icon: Icon } = incidenteTypes[incidente.tipo]
          const maps_link = `https://www.google.com/maps/search/?api=1&query=${incidente.ubicacion}`

          return (
            <div key={index} className='h-screen w-full flex flex-col justify-center items-center snap-start'>
              <div className='grow flex flex-col w-full h-full bg-gray-200 rounded-lg shadow-lg overflow-hidden'>
                <header className='bg-gray-100 p-4'>
                  <h2 className='text-xl font-bold flex items-center'>
                    <Icon className='mr-2 h-6 w-6' />
                    {incidente.tipo}
                  </h2>
                </header>

                <div className='flex flex-col grow h-full bg-black'>
                  {incidente.videoUrl && (
                    <video src={incidente.videoUrl} className='w-full h-full rounded mb-4' controls />
                  )}
                </div>

                <div className='p-4'>
                  <p className='text-lg mb-4'>{incidente.descripcion}</p>
                  {incidente.nombre && (
                    <p className='text-sm text-gray-600'>Reportado por: {incidente.nombre}</p>
                  )}
                  <p className='text-sm text-gray-600'>
                    Ocurrió en: <a className='underline text-blue-600' target='_blank' href={maps_link} rel='noreferrer'>{incidente.ubicacion}</a>
                  </p>
                  <p className='text-sm text-gray-600'>
                    Fecha: {new Date(incidente.fecha).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
