'use client'

import { useActionState, useEffect, useState } from 'react'
import Form from 'next/form'
import { login } from '@/app/actions/action-session'
import { toast } from 'sonner'
import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function LoginForm () {
  const [state, formAction] = useActionState(login, null)

  const [viewPassword, setViewPassword] = useState(false)

  useEffect(() => {
    const message = state?.message
    const success = state?.success

    if (message) {
      toast[success ? 'success' : 'error'](message, {
        id: 'login-toast'
      })
    }

    return () => {
      toast.dismiss('login-toast')
    }
  }, [state])

  return (
    <section>
      <Form className='flex flex-col gap-5' action={formAction}>
        <Input required type='number' name='dni' placeholder='DNI (8 dígitos)' />

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

        <Button type='submit'>Ingresar</Button>
      </Form>
    </section>
  )
}
