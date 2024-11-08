'use client'

import { useState } from 'react'
import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import { Textarea } from '@/core/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/core/components/ui/card'
import { Toaster, toast } from 'sonner'
import { AlertTriangle, UserX, Siren, MapPin, User, Calendar, MapPinned, Send, X } from 'lucide-react'

// Datos ficticios de incidentes
const incidentesFicticios = [
  { tipo: 'Robo', ubicacion: 'Calle Principal 123', fecha: '2023-05-15' },
  { tipo: 'Asalto', ubicacion: 'Avenida Central 456', fecha: '2023-05-14' },
  { tipo: 'Otro', ubicacion: 'Plaza Mayor', fecha: '2023-05-13' }
]

export default function FormNewIncident () {
  const [incidentType, setIncidentType] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [location, setLocation] = useState('')
  const [userName, setUserName] = useState('')

  const handleIncidentSelect = (type: string) => {
    setIncidentType(type)
    setShowForm(true)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Aquí iría la lógica para enviar el reporte
    toast.success('Reporte enviado. Gracias por contribuir a la seguridad de la comunidad.')
    setIncidentType('')
    setShowForm(false)
    setLocation('')
    setUserName('')
  }

  const captureLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setLocation(`${latitude}, ${longitude}`)
        toast.success('Ubicación capturada con éxito')
      }, (error) => {
        console.error('Error capturando ubicación:', error)
        toast.error('No se pudo capturar la ubicación. Por favor, ingrésala manualmente.')
      })
    } else {
      toast.error('Tu navegador no soporta geolocalización. Por favor, ingresa la ubicación manualmente.')
    }
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-lg'>
      <Toaster position='top-center' />
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='sr-only'>Reportar Incidente de Seguridad</CardTitle>
        </CardHeader>
        <CardContent>
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
              <h2 className='text-xl font-semibold'>
                Detalles del {incidentType}
              </h2>
              <div className='flex items-center space-x-2'>
                <User className='h-5 w-5 text-gray-500' />
                <Input
                  placeholder='Tu nombre'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className='flex items-center space-x-2'>
                <MapPinned className='h-5 w-5 text-gray-500' />
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
              <div className='flex items-start space-x-2'>
                <Calendar className='h-5 w-5 text-gray-500 mt-2' />
                <Textarea
                  placeholder='Describe brevemente lo ocurrido'
                  required
                />
              </div>
              <div className='flex space-x-2'>
                <Button type='submit' className='flex-1'>
                  <Send className='mr-2 h-4 w-4' /> Enviar Reporte
                </Button>
                <Button type='button' variant='outline' onClick={() => setShowForm(false)}>
                  <X className='mr-2 h-4 w-4' /> Cancelar
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>Últimos Incidentes en la Zona</CardTitle>
        </CardHeader>
        <CardContent>
          {incidentesFicticios.map((incidente, index) => (
            <Card key={index} className='mb-4'>
              <CardHeader>
                <CardTitle className='text-lg flex items-center'>
                  {incidente.tipo === 'Robo' && <UserX className='mr-2 h-5 w-5' />}
                  {incidente.tipo === 'Asalto' && <AlertTriangle className='mr-2 h-5 w-5' />}
                  {incidente.tipo === 'Otro' && <Siren className='mr-2 h-5 w-5' />}
                  {incidente.tipo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='flex items-center'><MapPinned className='mr-2 h-4 w-4' /> {incidente.ubicacion}</p>
                <p className='flex items-center'><Calendar className='mr-2 h-4 w-4' /> {incidente.fecha}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
