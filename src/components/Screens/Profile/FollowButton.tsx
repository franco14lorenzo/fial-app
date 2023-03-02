const FollowButton = () => {
  const handleClick = () => {
    console.log('Follow button clicked')
  }
  return (
    <button
      className="px-4 py-2 text-sm font-medium text-white rounded-full bg-emerald-500 hover:bg-emerald-600"
      onClick={handleClick}
    >
      Seguir
    </button>
  )
}

export default FollowButton
