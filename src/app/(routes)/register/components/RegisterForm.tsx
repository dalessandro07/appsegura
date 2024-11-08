'use client'

import Form from 'next/form'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { register } from '@/app/actions/action-session'
import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function RegisterForm () {
  const [state, formAction] = useActionState(register, null)

  const [viewPassword, setViewPassword] = useState(false)
  const [viewPasswordConfirmation, setViewPasswordConfirmation] = useState(false)

  useEffect(() => {
    const message = state?.message
    const success = state?.success

    if (message) {
      toast[success ? 'success' : 'error'](message, {
        id: 'register-toast'
      })
    }

    return () => {
      toast.dismiss('register-toast')
    }
  }, [state])

  // Función para manejar el envío del formulario
  const handleActionSubmit = (formData: FormData) => {
    const password = formData.get('password') as string
    const passwordConfirmation = formData.get('passwordConfirmation') as string

    if (password !== passwordConfirmation) {
      toast.error('Las contraseñas no coinciden', {
        id: 'register-toast'
      })

      return
    }

    formAction(formData)
  }

  return (
    <section>
      <Form className='flex flex-col gap-5' action={handleActionSubmit}>
        <Input
          required
          type='number'
          name='dni'
          placeholder='DNI (8 dígitos)'
        />

        <Input required type='text' name='name' placeholder='Nombre' />

        <Input required type='text' name='lastname' placeholder='Apellido' />

        <Input required type='text' name='nombre_comisaria' placeholder='Nombre de la comisaría' />

        <Input required type='text' name='ubicacion' placeholder='Ubicación de la comisaría' />

        <div className='relative'>
          <Input required type={viewPassword ? 'text' : 'password'} name='password' placeholder='Contraseña' />

          <button
            type='button'
            className='absolute right-0 top-0 p-2'
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <div className='relative'>
          <Input
            required
            type='password'
            name='passwordConfirmation'
            placeholder='Confirma tu contraseña'
          />

          <button
            type='button'
            className='absolute right-0 top-0 p-2'
            onClick={() => setViewPasswordConfirmation(!viewPassword)}
          >
            {viewPasswordConfirmation ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <Button type='submit'>Crear cuenta</Button>
      </Form>
    </section>
  )
}
