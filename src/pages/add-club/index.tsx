import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import MainMap from '@/components/Screens/Home/MainMap'
import Link from 'next/link'
export default function AddClubPage() {
  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderBar />

      <main className="w-full h-full mx-auto max-w-7xl pt-[63px] min-h-screen flex flex-col md:flex-row items-center justify-start gap-6 md:gap-10 text-sm px-6">
        <div className="w-full md:w-1/2 flex flex-col items-start justify-start gap-4 md:h-[500px]">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-700 w-full mt-10 md:mt-0">
            Agrega tu Club.
          </h1>
          <h2 className=" text-indigo-600 font-bold text-3xl md:text-5xl w-full">
            Haz que sea parte de FialApp.
          </h2>
          <p className="text-slate-600 w-full md:mt-4 text-lg max-w-[40ch]">
            Si tu club no está en el mapa, puedes agregarlo para que los
            usuarios puedan encontrarlo y jugar en tus canchas.
          </p>
          <div className="flex flex-col items-start justify-start gap-1 w-full  md:mt-16">
            <p className="text-slate-600 w-full md:mt-4 text-sm font-semibold text-center mb-1">
              ¿Todo listo para agregar tu club?
            </p>
            <Link
              href="/add-club/form"
              className=" text-white font-bold py-2 px-4 rounded-full bg-gradient-to-tr from-indigo-700 via-indigo-900 to-indigo-500 hover:shadow-md hover:scale-105 transition-all duration-100 ease-in-out text-center w-48 mx-auto"
            >
              Agregar Club
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 rounded-lg overflow-hidden ">
          <MainMap />
        </div>
      </main>
    </>
  )
}
