export interface IUsuario {
  dni: string
  contrasena?: string
  nombre?: string
  apellido?: string
  nombre_comisaria?: string
  ubicacion?: string
}

export interface IRegisterParams {
  dni: string
  password: string
  passwordConfirmation?: string
  nombre_comisaria: string
  ubicacion: string
}

export interface ILoginParams {
  dni: string
  password: string
}

export interface ISessionData {
  isLoggedIn: boolean
  user: IUsuario | null
}
