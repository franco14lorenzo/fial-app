import { createClient } from '@supabase/supabase-js'

const projectId = 'zsxqbrxszrvvdmphbdas' // your supabase project id

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeHFicnhzenJ2dmRtcGhiZGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ0MTU4NDAsImV4cCI6MTk4OTk5MTg0MH0.hwvqL9Va97-32FxOLy2qFcqi-_7VXLV4mM1albE_0aI'
)

export default function supabaseLoader({
  src,
  width,
  quality
}: {
  src: string
  width: number
  quality?: number
}) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${
    quality || 75
  }`
}
