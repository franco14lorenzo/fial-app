import { supabase } from 'src/lib/supabase'

const uploadFile = async (file: File, filePath: string, bucket: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (error) {
    console.log(error)
    return null
  }
  return data
}

export default uploadFile
