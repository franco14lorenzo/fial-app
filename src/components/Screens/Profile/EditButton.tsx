import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import uploadFile from '@/services/uploadFile'
import { trpc } from '@/utils/trpc'

const schema = z.object({
  image: z.any(),
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(20)
})

type Schema = z.infer<typeof schema>

const EditButton = () => {
  const [newImage, setNewImage] = useState<string | null>(null)
  const {
    isSuccess: isUpdateImageSuccess,
    data: updateImageData,
    mutate: mutateUpdateImage
  } = trpc.users.updateImage.useMutation()
  const {
    isSuccess: isUpdateInfoSuccess,
    data: updateInfoData,
    mutate: mutateUpdateInfo
  } = trpc.users.updateInfo.useMutation()

  useEffect(() => {
    if (isUpdateImageSuccess) {
      const username = updateImageData?.username
      fetch(
        `/api/revalidate?secret=KN3p=JQ1p4ijZFuWK92w0vepaPkWb92aJ0n816um=ho=&path=/profile/${username}`
      ).then(() => {
        window.location.replace(`/profile/${username}`)
      })
    }
    if (isUpdateInfoSuccess) {
      const username = updateInfoData?.username
      fetch(
        `/api/revalidate?secret=KN3p=JQ1p4ijZFuWK92w0vepaPkWb92aJ0n816um=ho=&path=/profile/${username}`
      ).then(() => {
        window.location.replace(`/profile/${username}`)
      })
    }
  }, [
    isUpdateImageSuccess,
    updateImageData,
    isUpdateInfoSuccess,
    updateInfoData
  ])

  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const { register, handleSubmit, watch } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: session?.user.image ?? '',
      username: session?.user.username,
      name: session?.user.name ?? ''
    }
  })

  const watchImage = watch('image')

  useEffect(() => {
    if (watchImage && watchImage[0] instanceof File) {
      const file = watchImage[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [watchImage])

  const onSubmit = async (data: Schema) => {
    if (data.image[0] instanceof File) {
      const userId = session?.user.id
      const file = data.image[0]
      const filePath = `${userId}/${uuidv4()}.${file.name.split('.').pop()}`
      const bucket = 'avatars'
      const fileName = await uploadFile(file, filePath, bucket)

      userId &&
        fileName &&
        mutateUpdateImage({ id: userId, image: `avatars/${fileName.path}` })
    }
    console.log('update info')
    console.log(data.name, session?.user.name)

    if (
      data.username !== session?.user.username ||
      data.name !== session?.user.name
    ) {
      console.log('update info')
      mutateUpdateInfo({
        id: session?.user.id as string,
        username: data.username,
        name: data.name
      })
    }
  }

  const handleClick = () => {
    setIsOpen(true)
  }
  return (
    <>
      <button
        className="px-4 py-2 text-sm font-medium text-white rounded-full bg-emerald-500 hover:bg-emerald-600"
        onClick={handleClick}
      >
        Editar
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 dark:bg-gray-darkMode/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-left">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col items-center justify-between w-full h-full max-w-5xl p-4 m-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-black-darkMode">
                  <Dialog.Title className="flex items-center justify-between w-full p-2 border-b">
                    <span className="text-xl font-medium leading-6 text-gray-900 dark:text-white-darkMode">
                      Editar perfil
                    </span>
                    <button
                      type="button"
                      className="p-1 rounded-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="text-gray-500 w-7 h-7" />
                    </button>
                  </Dialog.Title>
                  <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
                    <form
                      className="flex flex-col items-center justify-center w-full h-full space-y-4"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
                        <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
                          <div className="relative flex items-center justify-center w-full h-full gap-4">
                            <label
                              htmlFor="image"
                              className="text-base font-medium text-gray-900 w-52 dark:text-white-darkMode"
                            >
                              Imagen de perfil
                            </label>
                            <div className="flex-1">
                              <div className="mx-auto w-fit">
                                <label
                                  htmlFor="image"
                                  className="relative first-line:rounded-full hover:cursor-pointer"
                                >
                                  <Image
                                    src={newImage || session?.user.image || ''}
                                    alt="Avatar of the user"
                                    width={150}
                                    height={150}
                                    className="object-cover object-center rounded-full aspect-square"
                                  />
                                  <div className="absolute flex items-center justify-center w-8 h-8 bg-white border rounded-full hover:bg-gray-100 bottom-2 right-2">
                                    <PencilSquareIcon className="w-5 h-5 text-gray-700" />
                                  </div>
                                </label>
                                <input
                                  type="file"
                                  id="image"
                                  className="hidden"
                                  {...register('image')}
                                  /* onChange={(e) => {
                                   
                                  }} */
                                />
                              </div>
                            </div>
                          </div>
                          <label
                            htmlFor="username"
                            className="flex items-center justify-center w-full h-full gap-4 my-2"
                          >
                            <span className="text-base font-medium text-gray-900 w-52 dark:text-white-darkMode">
                              Nombre de usuario
                            </span>
                            <input
                              type="text"
                              id="username"
                              className="flex-1 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md "
                              {...register('username', {
                                required: 'Este campo es requerido'
                              })}
                            />
                          </label>
                          <label
                            htmlFor="name"
                            className="flex items-center justify-center w-full h-full gap-4 my-2"
                          >
                            <span className="text-base font-medium text-gray-900 w-52 dark:text-white-darkMode">
                              Nombre
                            </span>
                            <input
                              type="text"
                              id="name"
                              className="flex-1 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md "
                              {...register('name', {
                                required: 'Este campo es requerido'
                              })}
                            />
                          </label>
                          <div className="flex items-center justify-center w-full h-full gap-4 my-2">
                            <button
                              type="submit"
                              className="px-4 py-2 text-sm font-medium text-white rounded-full bg-emerald-500 hover:bg-emerald-600"
                            >
                              Guardar
                            </button>
                            <button
                              type="button"
                              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600"
                              onClick={() => setIsOpen(false)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default EditButton
