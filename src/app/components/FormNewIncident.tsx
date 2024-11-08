'use client'

import { useState } from 'react'
import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import { Textarea } from '@/core/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/core/components/ui/card'
import { AlertTriangle, UserX, Siren, MapPin } from 'lucide-react'

// Datos ficticios de incidentes
const incidentesFicticios = [
  { tipo: 'Robo', ubicacion: 'Calle Principal 123', fecha: '2023-05-15' },
  { tipo: 'Asalto', ubicacion: 'Avenida Central 456', fecha: '2023-05-14' },
  { tipo: 'Otro', ubicacion: 'Plaza Mayor', fecha: '2023-05-13' }
]

export default function Component () {
  const [incidentType, setIncidentType] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [location, setLocation] = useState('')

  const handleIncidentSelect = (type: string) => {
    setIncidentType(type)
    setShowForm(true)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Aquí iría la lógica para enviar el reporte
    alert('Reporte enviado. Gracias por contribuir a la seguridad de la comunidad.')
    setIncidentType('')
    setShowForm(false)
    setLocation('')
  }

  const captureLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setLocation(`${latitude}, ${longitude}`)
      }, (error) => {
        console.error('Error capturando ubicación:', error)
        alert('No se pudo capturar la ubicación. Por favor, ingrésala manualmente.')
      })
    } else {
      alert('Tu navegador no soporta geolocalización. Por favor, ingresa la ubicación manualmente.')
    }
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-md'>
      <h1 className='text-2xl font-bold text-center mb-6'>Reportar Incidente de Seguridad</h1>

      {!showForm ? (
        <div className='grid grid-cols-1 gap-4'>
          <Button
            className='h-20 text-lg'
            onClick={() => handleIncidentSelect('Robo')}
          >
            <UserX className='mr-2 h-6 w-6' /> Robo
          </Button>
          <Button
            className='h-20 text-lg'
            onClick={() => handleIncidentSelect('Asalto')}
          >
            <AlertTriangle className='mr-2 h-6 w-6' /> Asalto
          </Button>
          <Button
            className='h-20 text-lg'
            onClick={() => handleIncidentSelect('Otro')}
          >
            <Siren className='mr-2 h-6 w-6' /> Otro Incidente
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <h2 className='text-xl font-semibold'>Detalles del {incidentType}</h2>
          <div className='flex space-x-2'>
            <Input
              placeholder='Ubicación'
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='flex-grow'
            />
            <Button type='button' onClick={captureLocation} className='flex-shrink-0'>
              <MapPin className='h-4 w-4' />
            </Button>
          </div>
          <Textarea
            placeholder='Describe brevemente lo ocurrido'
            required
          />
          <div className='flex space-x-2'>
            <Button type='submit' className='flex-1'>Enviar Reporte</Button>
            <Button type='button' variant='outline' onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </form>
      )}

      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Últimos Incidentes en la Zona</h2>
        {incidentesFicticios.map((incidente, index) => (
          <Card key={index} className='mb-4'>
            <CardHeader>
              <CardTitle>{incidente.tipo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Ubicación:</strong> {incidente.ubicacion}</p>
              <p><strong>Fecha:</strong> {incidente.fecha}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
