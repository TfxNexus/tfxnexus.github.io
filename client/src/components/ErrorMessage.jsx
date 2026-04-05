export function ErrorMessage({ message }) {
  return (
    <div className="text-center py-16 text-red-400">
      <p>{message || 'Something went wrong. Please try again.'}</p>
    </div>
  )
}
