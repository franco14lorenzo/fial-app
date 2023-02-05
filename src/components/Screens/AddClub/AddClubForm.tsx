import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClubSchema } from '@/schemas'

const AddClubForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: zodResolver(ClubSchema)
  })

  return (
    <form
      className="w-full flex flex-col items-start justify-start gap-4"
      onSubmit={handleSubmit((d) => console.log(d))}
    >
      <div className="flex flex-col items-start justify-start gap-1 w-full mt-2">
        <label
          htmlFor="name"
          className="text-slate-600 w-full md:mt-4 text-sm font-semibold"
        >
          Nombre del Club
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <label
          htmlFor="description"
          className="text-slate-600 w-full md:mt-4 text-sm font-semibold"
        >
          Breve descripción
        </label>
        <textarea
          {...register('description')}
          id="description"
          className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <label
          htmlFor="schedule"
          className="text-slate-600 w-full md:mt-4 text-sm font-semibold"
        >
          Horario
        </label>
        <input
          type="text"
          {...register('schedule')}
          id="schedule"
          className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <label
          htmlFor="address"
          className="text-slate-600 w-full md:mt-4 text-sm font-semibold"
        >
          Dirección
        </label>
        <input
          type="text"
          {...register('address')}
          id="address"
          className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <label
          htmlFor="phone"
          className="text-slate-600 w-full md:mt-4 text-sm font-semibold"
        >
          Teléfono
        </label>
        <input
          type="text"
          {...register('phone')}
          id="phone"
          className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <label
          htmlFor="latitude"
          className="text-slate-600 w-full md:mt-4 text-sm font-semibold"
        >
          Latitud
        </label>
        <input
          type="text"
          {...register('latitude', { valueAsNumber: true })}
          id="latitude"
          className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <label
          htmlFor="longitude"
          className="text-slate-600 w-full md:mt-4 text-sm font-semibold"
        >
          Longitud
        </label>
        <input
          type="text"
          {...register('longitude', { valueAsNumber: true })}
          id="longitude"
          className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        {Object.keys(errors)?.length > 0 && (
          <div className="w-full flex flex-col items-start justify-start gap-1 text-red-500">
            {Object?.keys(errors as any).map((key) => (
              <span key={key}>{errors?.[key]?.message?.toString()}</span>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white rounded-md mt-4 px-4 py-2 font-semibold hover:bg-emerald-600"
        >
          Enviar
        </button>
      </div>
    </form>
  )
}

export default AddClubForm
