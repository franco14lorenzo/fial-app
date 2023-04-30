import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClubSchema } from '@/schemas'

const AddClubForm = ({ userId }: { userId: string }) => {
  console.log(userId)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: zodResolver(ClubSchema)
  })

  return (
    <form
      className="flex flex-col items-start justify-start w-full gap-4"
      onSubmit={handleSubmit((d) => console.log(d))}
    >
      <div className="flex flex-col items-start justify-start w-full gap-1 mt-2">
        <label
          htmlFor="name"
          className="w-full text-sm font-semibold text-slate-600 md:mt-4"
        >
          Nombre del Club
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="w-full px-4 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <label
          htmlFor="description"
          className="w-full text-sm font-semibold text-slate-600 md:mt-4"
        >
          Breve descripción
        </label>
        <textarea
          {...register('description')}
          id="description"
          className="w-full px-4 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <label
          htmlFor="schedule"
          className="w-full text-sm font-semibold text-slate-600 md:mt-4"
        >
          Horario
        </label>
        <input
          type="text"
          {...register('schedule')}
          id="schedule"
          className="w-full px-4 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <label
          htmlFor="address"
          className="w-full text-sm font-semibold text-slate-600 md:mt-4"
        >
          Dirección
        </label>
        <input
          type="text"
          {...register('address')}
          id="address"
          className="w-full px-4 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <label
          htmlFor="phone"
          className="w-full text-sm font-semibold text-slate-600 md:mt-4"
        >
          Teléfono
        </label>
        <input
          type="text"
          {...register('phone')}
          id="phone"
          className="w-full px-4 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <label
          htmlFor="latitude"
          className="w-full text-sm font-semibold text-slate-600 md:mt-4"
        >
          Latitud
        </label>
        <input
          type="text"
          {...register('latitude', { valueAsNumber: true })}
          id="latitude"
          className="w-full px-4 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <label
          htmlFor="longitude"
          className="w-full text-sm font-semibold text-slate-600 md:mt-4"
        >
          Longitud
        </label>
        <input
          type="text"
          {...register('longitude', { valueAsNumber: true })}
          id="longitude"
          className="w-full px-4 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        {Object.keys(errors)?.length > 0 && (
          <div className="flex flex-col items-start justify-start w-full gap-1 text-red-500">
            {Object?.keys(errors as any).map((key) => (
              <span key={key}>{errors?.[key]?.message?.toString()}</span>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-semibold text-white rounded-md bg-indigo-500 hover:bg-indigo-600"
        >
          Enviar
        </button>
      </div>
    </form>
  )
}

export default AddClubForm
