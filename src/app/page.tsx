import FormNewIncident from '@/app/components/FormNewIncident'

export default function Home () {
  return (
    <main className='p-5 flex flex-col gap-10'>
      <header>
        <h1 className='text-center font-bold text-4xl'>AppSegura</h1>
      </header>

      <FormNewIncident />
    </main>
  )
}
