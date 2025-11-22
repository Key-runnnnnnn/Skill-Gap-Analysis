export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <p className="text-2xl text-gray-700 mb-8">Page not found</p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
