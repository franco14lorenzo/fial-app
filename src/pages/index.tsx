import Head from 'next/head'
import HeaderBar from '@/components/Layout/HeaderBar'
import MainMap from '@/components/Screens/Home/MainMap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const CLUBS = [
  {
    id: 1,
    name: 'Lujan Padel',
    lat: -33.041526,
    lng: -68.885302
  },
  {
    id: 2,
    name: 'Vistalba Padel',
    lat: -33.019867,
    lng: -68.912848
  },
  {
    id: 3,
    name: 'Padel Banco Mendoza',
    lat: -32.986816,
    lng: -68.867393
  }
]

export default function Home() {
  return (
    <>
      <Head>
        <title>FialApp</title>
        <meta name="description" content="Fial App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar />
      <main className="w-full h-full mx-auto max-w-7xl pt-[63px]">
        <section className="fixed z-0 w-full h-full mx-auto max-w-7xl">
          <MainMap />
        </section>
        <section className="w-full max-w-7xl mx-auto  bg-white shadow shadow-black/20 rounded-t-3xl absolute top-[540px] z-10">
          <div className="w-10 h-1 mx-auto my-4 bg-gray-400 rounded-full"></div>
          <h1 className="px-4 text-2xl font-bold text-center text-gray-800">
            Clubes de Padel cercanos
          </h1>
          <div className="w-full h-full p-4">
            <div className="flex flex-row items-center justify-between w-full h-12 pl-4 pr-1 bg-white border rounded-full shadow-sm">
              <input
                type="text"
                className="flex-1 px-2 py-1 text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                placeholder="Buscar clubes"
              />
              <div className="flex flex-row items-center justify-center w-10 h-10 text-gray-400 bg-gray-100 rounded-full">
                <MagnifyingGlassIcon className="flex-1 w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="grid w-full h-full grid-cols-1 gap-4 p-4 bg-white sm:grid-cols-2 md:grid-cols-3">
            {CLUBS.map((club) => (
              <article
                key={club.id}
                className="flex flex-col gap-4 p-4 overflow-hidden bg-white rounded-lg shadow-lg md:flex-row"
              >
                <div className="w-full bg-gray-200 rounded-lg h-52 sm:w-52"></div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {club.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Lujan de Cuyo, Mendoza
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-600">Canchas</p>
                      <p className="text-sm text-gray-600">Precio</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-600">4</p>
                      <p className="text-sm text-gray-600">$ 500</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            {CLUBS.map((club) => (
              <article
                key={club.id}
                className="flex flex-col gap-4 p-4 overflow-hidden bg-white rounded-lg shadow-lg md:flex-row"
              >
                <div className="w-full bg-gray-200 rounded-lg h-52 sm:w-52"></div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {club.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Lujan de Cuyo, Mendoza
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-600">Canchas</p>
                      <p className="text-sm text-gray-600">Precio</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-600">4</p>
                      <p className="text-sm text-gray-600">$ 500</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
