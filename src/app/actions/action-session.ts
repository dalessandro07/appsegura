'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getIronSession } from 'iron-session'
import { defaultSession, sessionOptions } from '@/core/lib/session'
import type { ISessionData } from '@/core/lib/types'
import { tursoLogin, tursoRegister } from '@/core/db/turso'

//* Funciones de Autenticación

export async function getSession () {
  const session = await getIronSession<ISessionData>(await cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
    session.user = defaultSession.user
  }

  return session
}

export async function register (initialState: unknown, formData: FormData) {
  const session = await getSession()

  const dni = formData.get('dni') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const lastname = formData.get('lastname') as string
  const nombre_comisaria = formData.get('nombre_comisaria') as string
  const ubicacion = formData.get('ubicacion') as string

  /* Validaciones */

  if (dni.length !== 8) {
    return { message: 'El DNI debe tener 8 dígitos.', success: false, dni, user: null }
  }

  if (dni === '' || password === '' || name === '' || lastname === '') {
    return { message: 'Por favor, complete todos los campos.', success: false, dni, user: null }
  }

  try {
    const user = await tursoRegister({ dni, password, nombre_comisaria, ubicacion })
    if (user == null) return { message: 'El usuario ya existe.', success: false, user: null }

    /* Establecer la sesión para el usuario */
    session.isLoggedIn = true
    session.user = {
      dni,
      contrasena: password,
      nombre: name,
      apellido: lastname,
      nombre_comisaria,
      ubicacion
    }
    await session.save()
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed: usuarios.username')) {
        return { message: 'Ese nombre de usuario ya existe.', success: false, user: null }
      }
    }

    const message = (error instanceof Error) ? error.message : 'Ocurrió un error inesperado.'

    return { message, success: false, user: null }
  }

  /* Redirigir a la ruta principal */
  redirect('/')
}

export async function logout () {
  const session = await getSession()
  session.destroy()

  redirect('/login')
}

export async function login (initialState: unknown, formData: FormData) {
  const session = await getSession()

  const dni = formData.get('dni') as string
  const password = formData.get('password') as string

  /* Validaciones */
  if (dni === '' || password === '') {
    return { message: 'Por favor, complete todos los campos.', success: false, dni, user: null }
  }

  try {
    const user = await tursoLogin({ dni, password })

    /* Establecer la sesión para el usuario */
    session.isLoggedIn = true
    session.user = {
      dni,
      nombre_comisaria: user.nombre_comisaria,
      ubicacion: user.ubicacion,
      contrasena: password
    }
    await session.save()
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Ocurrió un error inesperado.'
    return { message, success: false, user: null }
  }

  /* Redirigir a la ruta principal */
  redirect('/')
}

//* Funciones de seguridad

export async function checkSession () {
  const session = await getSession()
  return session.isLoggedIn
}

export async function requireSession (redirectPath: string, validPath: string) {
  if (!await checkSession()) redirect(redirectPath)

  redirect(validPath)
}
