'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/core/components/ui/button'
import { Toaster, toast } from 'sonner'

import { useIncidenteStore } from '@/core/store/incidents'
import IncidenteForm from '@/app/components/IncidenteForm'
import IncidenteList from '@/app/components/IncidenteList'
import { incidenteTypes } from './incidenteTypes'
import type { IUsuario } from '@/core/lib/types'

export default function IncidenteMain ({ user }: {
  user: IUsuario | null
}) {
  const [showForm, setShowForm] = useState(false)
  const [incidentType, setIncidentType] = useState('')
  const { agregarIncidente, limpiarIncidentes } = useIncidenteStore(state => state)

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  const handleIncidentSelect = (type: string) => {
    setIncidentType(type)
    setShowForm(true)
  }

  const handleSubmit = (formData: FormData) => {
    const nuevoIncidente = {
      tipo: incidentType,
      ubicacion: formData.get('ubicacion') as string,
      descripcion: formData.get('descripcion') as string,
      nombre: formData.get('nombre') as string,
      fecha: new Date().toISOString(),
      videoUrl: formData.get('videoUrl') as string
    }
    agregarIncidente(nuevoIncidente)
    toast.success('Reporte enviado. Gracias por contribuir a la seguridad de la comunidad.')
    setShowForm(false)

    if ('Notification' in window && Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification('Nuevo Incidente Reportado', {
        body: `Se ha reportado un ${incidentType} en ${nuevoIncidente.ubicacion}`
      })
    }
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-md'>
      <Toaster position='top-center' />

      <div className='mb-8'>
        {!showForm ? (
          <div className='grid grid-cols-1 gap-4'>
            {Object.entries(incidenteTypes).map(([key, { icon: Icon, label }]) => (
              <Button key={key} className='h-16 text-lg' onClick={() => handleIncidentSelect(key)}>
                <Icon className='mr-2 h-5 w-5' /> {label}
              </Button>
            ))}
          </div>
        ) : (
          <IncidenteForm
            user={user}
            incidentType={incidentType}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      <IncidenteList />

      <Button variant='destructive' onClick={limpiarIncidentes} className='mt-4'>Limpiar Incidentes</Button>
    </div>
  )
}
