import { createClient } from '@libsql/client'
import type { ILoginParams, IRegisterParams, IUsuario } from '@/core/lib/types'

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:./data/turso.db',
  authToken: process.env.TURSO_AUTH_TOKEN
})

//* Authentication

// Register function: hashes the password before storing it
export async function tursoRegister (user: IRegisterParams) {
  const { dni, password, nombre_comisaria, ubicacion } = user

  await turso.execute({
    sql: 'INSERT INTO Autoridad (DNI, contrasena, nombre_comisaria, ubicacion) VALUES (?, ?, ?, ?)',
    args: [dni, password, nombre_comisaria, ubicacion]
  })

  const loginResult = await tursoLogin({ dni, password })
  return loginResult
}

// Login function: checks if the username exists and verifies the hashed password
export async function tursoLogin ({ dni, password }: ILoginParams) {
  const result = await turso.execute({
    sql: 'SELECT * FROM Autoridad WHERE DNI=? AND contrasena=?',
    args: [dni, password]
  })

  const user = result.rows[0] as unknown as IUsuario

  return user
}
