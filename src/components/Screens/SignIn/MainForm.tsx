import { signIn } from 'next-auth/react'
import GoogleSVG from '@/components/Icons/GoogleSVG'

interface MainFormProps {
  providers: Record<string, any>
  redirectUrl: string | string[] | undefined
}

const MainForm = ({ providers, redirectUrl }: MainFormProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-24 py-32 bg-white border rounded-lg">
      <h1>Te damos la bienvenida a Fial App</h1>
      <h2 className="mb-12 text-base font-bold text-center">
        Inicia sesión para acceder a la aplicación
      </h2>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="flex items-center justify-between h-12 space-x-2 bg-white border border-gray-300 rounded-md w-72 hover:bg-gray-100"
            onClick={() =>
              signIn('google', {
                callbackUrl: `${redirectUrl}/`
              })
            }
          >
            <GoogleSVG className="flex-1 w-6 h-6" />
            <span>Continuar con {provider.name}</span>
            <span className="flex-1"></span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default MainForm
