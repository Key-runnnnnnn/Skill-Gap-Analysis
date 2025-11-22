"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-700 mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={reset}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
