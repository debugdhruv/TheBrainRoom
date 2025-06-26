export default function MoodLoader() {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center text-center space-y-6">
      <div className="w-64 h-2 bg-zinc-200 rounded-full overflow-hidden">
        <div className="h-full bg-purple-600 animate-loaderBar" />
      </div>
      <p className="text-zinc-500 text-sm">Generating your mood report...</p>
    </div>
  );
}