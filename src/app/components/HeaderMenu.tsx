'use client'

import { EarthLockIcon, Menu } from 'lucide-react'
import { Button } from '@/core/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/core/components/ui/sheet'
import Link from 'next/link'
import type { IUsuario } from '@/core/lib/types'

interface HamburgerMenuProps {
  user: IUsuario | null
}

export default function HeaderMenu ({ user }: HamburgerMenuProps) {
  return (
    <header className='flex justify-between items-center'>
      <Link href='/' className='flex items-center gap-1'>
        <EarthLockIcon size={32} />
        <span className='text-xs font-bold'>AppSegura</span>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon'>
            <Menu className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menú</SheetTitle>
          </SheetHeader>
          <nav className='flex flex-col gap-4 mt-4'>
            {user ? (
              <>
                <Link href='/perfil' className='text-sm font-medium underline text-blue-600'>
                  Perfil
                </Link>
                <Link href='/reportes' className='text-sm font-medium underline text-blue-600'>
                  Reportes
                </Link>
                <Link href='/logout' className='text-sm font-medium underline text-red-600'>
                  Cerrar sesión
                </Link>
              </>
            ) : (
              <>
                <Link href='/login' className='text-sm font-medium underline text-blue-600'>
                  Iniciar sesión
                </Link>
                <Link href='/register' className='text-sm font-medium underline text-blue-600'>
                  Registrarse
                </Link>
                <Link href='/reportes' className='text-sm font-medium underline text-blue-600'>
                  Reportes
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
