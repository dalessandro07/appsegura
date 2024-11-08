import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Incidente {
  tipo: string
  ubicacion: string
  descripcion: string
  fecha: string
  nombre: string
  videoUrl?: string
}

interface IncidenteStore {
  incidentes: Incidente[]
  agregarIncidente: (incidente: Incidente) => void
  limpiarIncidentes: () => void
}

export const useIncidenteStore = create<IncidenteStore>()(
  persist<IncidenteStore>(
    (set) => ({
      incidentes: [],
      agregarIncidente: (incidente) =>
        set((state) => ({ incidentes: [incidente, ...state.incidentes] })),
      limpiarIncidentes: () => set({ incidentes: [] })
    }),
    {
      name: 'incidente-storage'
    }
  )
)
