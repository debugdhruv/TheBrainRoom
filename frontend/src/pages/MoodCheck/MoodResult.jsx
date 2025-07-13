import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/useUser";
import { useMemo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BotIcon from "@/assets/icons/chat 3.svg";
import BackIcon from "@/assets/icons/back.svg";
import { moodQuestions } from "./moodData";
import { useXP } from "@/context/useXP";

export default function MoodResult() {
    const { userDetails } = useUser();

    const location = useLocation();
    const navigate = useNavigate();
    const { addXP } = useXP();

    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchMood = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/mood/today`, {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }), // ✅ good code
                    },
                });
                const data = await res.json();
                if (res.ok && data && data.scores) {
                    const scoresArray = [
                        data.scores.q1,
                        data.scores.q2,
                        data.scores.q3,
                        data.scores.q4,
                        data.scores.q5,
                    ];
                    setResponses(scoresArray);
                }
            } catch (err) {
                console.error("❌ Could not fetch today's mood result:", err);
            }
        };

        if (!location.state?.responses?.length) {
            fetchMood();
        } else {
            setResponses(location.state.responses);
        }
    }, [location.state]);

    const weightedScore = useMemo(() => {
        if (!responses.length || responses.length !== moodQuestions.length) return 0;

        let total = 0;
        let totalWeight = 0;
        for (let i = 0; i < responses.length; i++) {
            const { polarity, weight } = moodQuestions[i];
            const score = responses[i];
            const normalized = polarity === "negative" ? 10 - score : score;
            total += normalized * weight;
            totalWeight += weight;
        }

        return (total / totalWeight).toFixed(1);
    }, [responses]);

    const averageScore = weightedScore;

    // Arc length for the foreground arc
    const radius = 42;
    const arcLength = Math.PI * radius * 1.5; // 270° arc length
    const scoreRatio = Math.max(0, Math.min(averageScore / 10, 1)); // clamp between 0-1
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

    // XP reward for completing mood check
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];

        console.log("💡 CURRENT USER ID:", userDetails?._id || userDetails?.email);
        console.log("📜 XP HISTORY:", userDetails?.xpHistory);

        const alreadyGiven = userDetails?.xpHistory?.some(
            (entry) => entry.date === today && entry.action === "Completed Mood Check"
        );

        console.log("⚠️ Already Given?", alreadyGiven);

        if (!alreadyGiven) {
            console.log("🎯 XP BEING AWARDED");
            addXP(25, "Completed Mood Check", true);
        }
    }, [userDetails?.xpHistory, userDetails?._id, userDetails?.email, addXP]);

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
        {
            title: "5-minute breathing practice",
            source: "YouTube",
            link: "https://www.youtube.com/watch?v=aNXKjGFUlMs",
            thumbnail: "https://img.youtube.com/vi/aNXKjGFUlMs/mqdefault.jpg",
        },
        {
            title: "Declutter your mind before bed",
            source: "YouTube",
            link: "https://www.youtube.com/watch?v=ZToicYcHIOU",
            thumbnail: "https://img.youtube.com/vi/ZToicYcHIOU/mqdefault.jpg",
        },
        {
            title: "5-minute breathing practice",
            source: "YouTube",
            link: "https://www.youtube.com/watch?v=aNXKjGFUlMs",
            thumbnail: "https://img.youtube.com/vi/aNXKjGFUlMs/mqdefault.jpg",
        },
    ];

    const handleRetake = () => navigate("/dashboard/mood");
    const handleTalk = () => {

        navigate("/dashboard/bot", {
            state: {
                fromMoodResult: true,
                moodReport: {
                    score: averageScore,
                    mood: mood.label,
                },
            },
        });
    };

    return (
        <div className="w-full min-h-screen flex justify-center px-4 pb-20">
            <div className="flex flex-col justify-center w-full max-w-5xl gap-10">
                {/* Retake Button */}
                <div className="flex justify-start">
                    <Button
                        onClick={handleRetake}
                        disabled={false}
                        className="flex items-center gap-1 bg-purple-200 text-purple-600 font-semibold text-sm border border-zinc-100 px-4 py-2 rounded-md hover:bg-purple-100 disabled:opacity-30 shadow-none">
                        <img src={BackIcon} alt="Back" className="h-4 w-4" />
                        Retake Assessment
                    </Button>
                </div>

                {/* Top Score Card */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-10">
                    {/* Left: Score Meter */}
                    <div className="relative w-[170px] h-[180px]">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Background Arc */}
                            <path
                                d="M25,75 A40,40 0 1,1 75,75"
                                fill="none"
                                stroke="#f3e8ff"
                                strokeWidth="10"
                                strokeLinecap="round" />

                            {/* Foreground Arc */}
                            <path
                                d="M25,75 A40,40 0, 1, 1 75,75"
                                fill="none"
                                stroke="url(#grad)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={arcLength}
                                strokeDashoffset={(1 - scoreRatio) * arcLength}
                                style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />

                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#9333EA" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center mt-[-16px]">
                            <p className="text-xl font-bold text-purple-700">{averageScore}/10</p>
                        </div>
                    </div>

                    {/* Right: Mood Info */}
                    <div className="flex-1 mb-4 sm:mb-0">
                        <h2 className="text-2xl font-semibold text-slate-700 mb-2">{mood.label}</h2>
                        <p className="text-zinc-500 text-sm max-w-md">{mood.message}</p>
                    </div>
                </div>

                {/* Suggestions */}
                <div className="flex justify-between items-center mt-[-40px] mb-2">
                    <h3 className="text-xl font-semibold text-slate-700">Suggestions for you</h3>
                    <Button variant="link" className="text-purple-700 p-0 text-sm" onClick={() => navigate("/dashboard")}>
                        View all →
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-[-32px]">
                    {suggestions.map((sug, idx) => (
                        <a
                            key={idx}
                            href={sug.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                e.preventDefault();
                                addXP(50, "Followed AI suggestion");
                                setTimeout(() => {
                                    window.open(sug.link, "_blank", "noopener,noreferrer");
                                }, 1000);
                            }}
                            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                            <img src={sug.thumbnail} alt={sug.title} className="w-full aspect-video object-cover" />
                            <div className="p-2">
                                <h4 className="text-sm font-medium">{sug.title}</h4>
                                <p className="text-xs text-zinc-500">{sug.source}</p>
                            </div>
                        </a>
                    ))}
                </div>
                {/* Talk to Bot */}
                <div className="md:static fixed bottom-0 left-4 w-full px-4 py-3 bg-white border-t border-zinc-200 z-10">
                    <div className="max-w-2xl flex justify-center mx-auto">
                        <Button
                            onClick={handleTalk}
                            className="bg-gradient-to-r from-purple-700 to-zinc-700 text-white hover:from-purple-700 hover:to-pink-400 px-6 py-6 rounded-full text-base font-extrabold transition">
                            <img src={BotIcon} alt="Bot" className="h-6 w-6" />
                            Talk to Brain Bot
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}