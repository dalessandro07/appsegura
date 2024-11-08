'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/ui/table'
import { useIncidenteStore, type Incidente } from '@/core/store/incidents'

export default function TablaIncidentes () {
  const [incidentes, setIncidentes] = useState<Incidente[]>([])
  const storeIncidentes = useIncidenteStore((state) => state.incidentes)

  useEffect(() => {
    setIncidentes(storeIncidentes)
  }, [storeIncidentes])

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidentes.map((incidente, index) => (
            <TableRow key={index}>
              <TableCell>{incidente.tipo}</TableCell>
              <TableCell>{incidente.ubicacion}</TableCell>
              <TableCell>{incidente.descripcion}</TableCell>
              <TableCell>{new Date(incidente.fecha).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
