export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4 py-12">
      <img src="path/to/your/gif.gif" alt="404 Prank GIF" className="max-w-sm mb-6" />
      <h1 className="text-4xl font-bold text-purple-700">404 - Page Not Found</h1>
      <p className="text-zinc-500 mt-2">You’ve wandered off the mental map, explorer 🧠</p>
      <a href="/dashboard" className="mt-6 inline-block px-6 py-3 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition">
        Take Me Home
      </a>
    </div>
  );
}