import { signIn } from 'next-auth/react'
import GoogleSVG from '@/components/Icons/GoogleSVG'

interface MainFormProps {
  providers: Record<string, any>
}

const MainForm = ({ providers }: MainFormProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32 px-24 bg-white rounded-lg border">
      <h1>Te damos la bienvenida a Fial App</h1>
      <h2 className="font-bold text-center text-base mb-12">
        Inicia sesión para acceder a la aplicación
      </h2>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="w-72 h-12 bg-white border border-gray-300 rounded-md flex items-center justify-between space-x-2 hover:bg-gray-100"
            onClick={() => signIn(provider.id)}
          >
            <GoogleSVG className="w-6 h-6 flex-1" />
            <span>Continuar con {provider.name}</span>
            <span className="flex-1"></span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default MainForm
