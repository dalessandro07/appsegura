import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import { Textarea } from '@/core/components/ui/textarea'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { User, MapPinned, MapPin, Calendar, Send, X, StopCircleIcon, Video } from 'lucide-react'
import type { IUsuario } from '@/core/lib/types'

interface IncidenteFormProps {
  incidentType: string
  onSubmit: (formData: FormData) => void
  onCancel: () => void
  user: IUsuario | null
}

export default function IncidenteForm ({ incidentType, onSubmit, onCancel, user }: IncidenteFormProps) {
  const [location, setLocation] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
    mediaRecorderRef.current = new MediaRecorder(stream)
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }
    mediaRecorderRef.current.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const videoUrl = URL.createObjectURL(blob)
        if (videoRef.current) {
          videoRef.current.src = videoUrl
        }
      }
    }
    setIsRecording(false)
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (videoRef.current && videoRef.current.src) {
      formData.append('videoUrl', videoRef.current.src)
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h2 className='text-xl font-semibold'>
        Detalles del {incidentType}
      </h2>
      <div className='flex items-center space-x-2'>
        <User className='h-5 w-5 text-gray-500' />
        <Input
          name='nombre'
          placeholder='Tu nombre'
          required
          defaultValue={user ? `${user?.nombre} ${user?.apellido}` : ''}
        />
      </div>
      <div className='space-y-2'>
        <div className='flex space-x-2'>
          <Button type='button' onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? <StopCircleIcon className='mr-2 h-4 w-4' /> : <Video className='mr-2 h-4 w-4' />}
            {isRecording ? 'Detener Grabación' : 'Iniciar Grabación'}
          </Button>
        </div>
        <video ref={videoRef} className='w-full' controls />
      </div>
      <div className='flex items-center space-x-2'>
        <MapPinned className='h-5 w-5 text-gray-500' />
        <Input
          name='ubicacion'
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
          name='descripcion'
          placeholder='Describe brevemente lo ocurrido'
          required
        />
      </div>
      <div className='flex space-x-2'>
        <Button type='submit' className='flex-1'>
          <Send className='mr-2 h-4 w-4' /> Enviar Reporte
        </Button>
        <Button type='button' variant='outline' onClick={onCancel}>
          <X className='mr-2 h-4 w-4' /> Cancelar
        </Button>
      </div>
    </form>
  )
}
