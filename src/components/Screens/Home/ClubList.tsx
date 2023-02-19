import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { CLUBS } from '@/constants/mocks'
import type { Club } from '@/types'

const ClubList = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section
      className={`w-full max-w-7xl mx-auto flex flex-col flex-1 justify-start items-center  bg-white shadow shadow-black/20 rounded-t-3xl fixed  z-10 min-h-[calc(100vh-60px)] overflow-y-auto transition-all duration-200 ease-in-out
    ${isOpen ? 'top-[62px]' : 'top-[calc(100%-110px)]'}`}
    >
      {isOpen ? (
        <button className="" onClick={() => setIsOpen(!isOpen)}>
          <ChevronDownIcon className="w-6 h-6 text-gray-500 my-[6px]" />
        </button>
      ) : (
        <button
          className="w-10 h-1 my-4 bg-gray-400 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
      <SearchClub setIsOpen={setIsOpen} />

      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 h-[calc(100vh-63px)] overflow-y-auto">
        {CLUBS.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </section>
  )
}

export default ClubList

const SearchClub = ({
  setIsOpen
}: {
  setIsOpen: (isOpen: boolean) => void
}) => {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="flex flex-row items-center justify-between w-full h-12 pl-4 pr-1 bg-white border rounded-full shadow-sm">
        <input
          type="text"
          className="flex-1 px-2 py-1 text-sm text-gray-600 bg-transparent border-none focus:outline-none"
          placeholder="Buscar clubes"
          onFocus={() => setIsOpen(true)}
        />
        <button className="flex flex-row items-center justify-center w-10 h-10 text-gray-400 rounded-full bg-emerald-500 hover:bg-emerald-600 ">
          <MagnifyingGlassIcon className="flex-1 w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}

const ClubCard = ({ club }: { club: Club }) => {
  return (
    <article className="flex flex-col flex-1 gap-4 p-4 overflow-hidden bg-white rounded-lg shadow-lg md:flex-row h-[400px] md:h-60">
      <div className="w-full bg-gray-200 rounded-lg h-52 md:w-52"></div>
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{club.name}</h2>
          <p className="text-sm text-gray-600">Lujan de Cuyo, Mendoza</p>
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
  )
}
