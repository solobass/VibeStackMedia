export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">404 - Page Not Found</h2>
      <p className="text-slate-600 mb-4">
        The page you're looking for doesn't exist.
      </p>
      <a href="/" className="text-sky-600 hover:underline">
        Return to homepage
      </a>
    </div>
  )
}

