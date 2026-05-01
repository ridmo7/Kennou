import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-8xl font-extrabold bg-gradient-to-br from-coral to-amber bg-clip-text text-transparent mb-4">404</p>
        <h1 className="text-2xl font-extrabold mb-2">Page not found</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-br from-coral to-amber text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
