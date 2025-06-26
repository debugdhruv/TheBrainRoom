import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import BotIcon from "@/assets/icons/chat 2.svg";

export default function MoodResult() {
    const location = useLocation();
    const navigate = useNavigate();

    console.log("📦 Location state:", location.state);

    const responses = useMemo(() => {
        return location.state?.responses?.length ? location.state.responses : [];
    }, [location.state]);

    const averageScore = useMemo(() => {
        if (!responses.length) return 0;
        const sum = responses.reduce((acc, val) => acc + val, 0);
        return (sum / responses.length).toFixed(1);
    }, [responses]);

    const moodMap = [
        { label: "Depressed", message: "It’s okay to not be okay. You’re not alone." },
        { label: "Anxious", message: "Breathe. It’s just a bad moment, not a bad life." },
        { label: "Stressed", message: "Slow down. Your peace matters too." },
        { label: "Neutral", message: "You’re doing alright. Keep checking in with yourself." },
        { label: "Calm", message: "Peace looks good on you. Keep nurturing it." },
    ];

    const getMood = (score) => {
        if (score < 3) return moodMap[0];
        if (score < 5) return moodMap[1];
        if (score < 6.5) return moodMap[2];
        if (score < 8) return moodMap[3];
        return moodMap[4];
    };

    const mood = getMood(averageScore);

    const suggestions = [
        {
            title: "5-minute breathing practice",
            source: "YouTube",
            link: "https://www.youtube.com/watch?v=aNXKjGFUlMs",
            thumbnail: "https://img.youtube.com/vi/aNXKjGFUlMs/mqdefault.jpg",
        },
        {
            title: "Grounding techniques to reduce anxiety",
            source: "Article",
            link: "https://www.healthline.com/health/grounding-techniques",
            thumbnail: "https://source.unsplash.com/400x200/?mindfulness",
        },
        {
            title: "Declutter your mind before bed",
            source: "YouTube",
            link: "https://www.youtube.com/watch?v=ZToicYcHIOU",
            thumbnail: "https://img.youtube.com/vi/ZToicYcHIOU/mqdefault.jpg",
        },
    ];

    const handleRetake = () => navigate("/dashboard/mood");
    const handleTalk = () => navigate("/dashboard/bot");

    return (
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-10 pb-20">
            {/* Top Score Card */}
            <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Left: Score Meter */}
                <div className="relative w-[180px] h-[180px] bg-gradient-to-tr from-purple-100 to-slate-100 rounded-full flex items-center justify-center shadow-inner">
                    <div className="absolute w-[160px] h-[160px] bg-white rounded-full flex flex-col items-center justify-center text-center">
                        <p className="text-xl font-bold text-slate-700">{averageScore}/10</p>
                        <p className="text-sm text-zinc-500">Your Score</p>
                    </div>
                </div>

                {/* Right: Mood Info */}
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-slate-700 mb-2">{mood.label}</h2>
                    <p className="text-zinc-500 text-sm max-w-md">{mood.message}</p>

                    <Button
                        variant="ghost"
                        onClick={handleRetake}
                        className="mt-4 text-purple-600 hover:underline"
                    >
                        ← Retake Assessment
                    </Button>
                </div>
            </div>

            {/* Suggestions */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-slate-700">Suggestions for you</h3>
                    <Button variant="link" className="text-purple-700 p-0 text-sm" onClick={() => navigate("/dashboard")}>
                        View all →
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suggestions.map((sug, idx) => (
                        <a
                            key={idx}
                            href={sug.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                        >
                            <img src={sug.thumbnail} alt={sug.title} className="w-full aspect-video object-cover" />
                            <div className="p-4">
                                <h4 className="text-sm font-medium">{sug.title}</h4>
                                <p className="text-xs text-zinc-500">{sug.source}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Talk to Bot */}
            <div className="w-full flex justify-center mt-10">
                <Button
                    onClick={handleTalk}
                    className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white"
                >
                    <img src={BotIcon} alt="Bot" className="h-5 w-5" />
                    Talk to Brain Bot
                </Button>
            </div>
        </div>
    );
}