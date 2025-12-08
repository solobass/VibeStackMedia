'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="bg-sky-600 text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  )
}

