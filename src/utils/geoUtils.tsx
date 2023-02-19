interface Position {
  lat: number
  lng: number
}

export const getUserPosition = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        resolve({ lat, lng })
      },
      (error) => {
        reject(error)
      }
    )
  })
}
