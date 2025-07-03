export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
      {/* <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmx5d3pqMWlrdmpvNnY0MzRuc2ZrcjRkZjRra25wcjNvd3o2aWhwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lnaIzsFXSAss5osoy3/giphy.gif" alt="404 Prank GIF" className="w-[900px] h-auto mb-6" /> */}
      <p className="text-[200px] -mt-32 sm:-mt-32 sm:text-[600px] flex flex-col justify-center items-center font-normal animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500">
        404
      </p>
      <p className="text-zinc-500 sm:-mt-32 text-md">You’ve clearly taken the scenic route...
        <br /> there's nothing here, buddy 👀</p>
      <a href="/login" className="mt-4 inline-block px-6 py-3 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition">
      Take Me Home
      </a>
    </div>
  );
}