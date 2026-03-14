import { useState, useEffect } from "react";
import { Camera, Calendar, Coffee, Star, MapPin, Heart, Moon, Sun, Lock, Send } from "lucide-react";
import img1 from '/assets/img/1.jpeg';
import img2 from '/assets/img/2.jpeg';
import img3 from '/assets/img/3.jpeg';
import img4 from '/assets/img/4.jpeg';
import img5 from '/assets/img/5.jpeg';


// You can swap these unsplash URLs with the actual ones if needed.
const cardsData = [
    {
        id: 1,
        image: img1,
        title: "This Photo 📸",
        note: "This is my most favorite photo of us. We went out and ate at the cafe, but the thing is, for both times we went out, I just wished it was just us two without anyone else. IDK why that is, but I just wanted it to be like that. Just like people say in reels and stuff, you're a special one with or without conversation, yaar. ✨"
    },
    {
        id: 2,
        image: img2,
        title: "I Hope You Remember This 💭",
        note: "Remember all those endless conversations we had sometimes? We've talked about almost everything—well, maybe not everything, but a lot of things. I don't remember everything, but some things are important. And yaar, you're the best friend I'll always hold in my life because you've become a part of my routine, and I can't get you out of it. You're a sweet problem for me now. 🥺💖"
    },
    {
        id: 3,
        image: img3,
        title: "This Night 🌙",
        note: "I hope you remember this one. You see, I was never—I can't say it like that—but I was never desperate to meet a close friend in a crowd, to even put up an effort and search for them in that big crowd. The thing is, IDK, I was desperate enough to see you in person. IDK what got into me, but I wanted to see you, and when I saw you, I was happier than normally. Yeah, I had some thoughts... maybe I should just hug you or kiss you hehehehe, kidding. 🙈 But the thing is, I got to hold your hand, and it was enough for me that day. And that Spiderman keychain... I still have it, and I haven't lost it because I don't keep things safe, but the keychain is still safe with me. I just don't want to lose it yet—not just the keychain, but you too. 🕸️❤️"
    },
    {
        id: 4,
        image: img4,
        title: "Favourite 🌟",
        note: "This picture... this is the one thing which is my favorite more than anything. You look a lot more cute and stuff, and I have been obsessed with this pic for a long time. IDK yaar, you just look too good and I don't know what to do with you! 🥰"
    },
    {
        id: 5,
        image: img5,
        title: "Random Thoughts 🎈",
        note: "Looking back at old photos of us, IDK, I'm just surprised I have one friend who I can be so close to even now. It is true, because I always cut people off somewhere because I never want to lose my peace of mind—but I never cut you off. I make you cry and I hurt you a lot, but I'm sorry. I can't say it won't happen again, but I'll make sure that I'll try my best to not let it happen again. Even if it happens, I'll be there and see you cry, and I'll compromise and not run away like before. Maybe if you're in person, I'll even kiss you or hug you to make you feel cherished. I will do anything—not like to the extreme, but more than what I normally do for anyone—just to see you happy with me. 🥹🫂"
    }
];

const timelineData = [
    { icon: <Calendar size={18} strokeWidth={1.5} />, text: "I saw you first in school. You were my classmate who I didn't know properly." },
    { icon: <Coffee size={18} strokeWidth={1.5} />, text: "Then the next year, you became my best friend and you were so important to me during that time." },
    { icon: <Star size={18} strokeWidth={1.5} />, text: "These three years after school, I'm surprised we are still together. Damn, I want people to talk about us like, 'They're still together even after a long time.'" },
    { icon: <MapPin size={18} strokeWidth={1.5} />, text: "Now, I don't know what I should comprehend of us, and I don't want to get into anything. I like the closeness we have now, and the way you keep up with all my behaviors and my tantrums for kisses and stuff." },
];

const notesData = [
    { text: "You have this incredible way of making the world feel a little bit softer. Thank you for being the person I can always turn to, no matter what.", author: "Always here" },
    { text: "I don't know if I have spoiled your surprise or anything, but advance happy birthday gundu 💋", author: "With love" },
    { text: "I love you more, and thanks for being with me through all my troubles and my tantrums and everything I made you go through. Love you more and more and more.", author: "sinsu" },
    { text: "I'll make you cry more and irritate you more, but at the end I'll always be here just for you whenever you need me. And if you ever have a problem, just ask me if I have 8 minutes, I'll know you're in some sort of problem or not feeling well.", author: "sid" }
];

const sizeUpWords = ["Happy", "Birthday,", "My", "Dearest", "Best", "Friend", "Ever!"];

const moonSecretMessage = `I wanted to be a bit sneaky about this and welll if you found it out well read it ...!

"Ni enkooda enoda ela kastathulayum irunthu iruka idk if i have ever been with you in every situation youve went through.Youre more important to me than you think you are and I cant promise ill always stay but ill try to be here as long as i can and I love you more and i do expect that you will say that before i tell you this but yeah you dont like syaing it often and i like saying it way too often hehehehhe anyways. Im just a call and text away if we ever fight or anything. Bye bye. ILYSOM. ✨"`;

// SVG shapes for the background decoration
const StarOutline = () => (
    <svg className="absolute w-72 h-72 text-vintage-light-brown/20 transform -rotate-12 pointer-events-none" style={{ top: '15%', left: '5%' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const HeartOutline = () => (
    <svg className="absolute w-96 h-96 text-vintage-light-brown/20 transform rotate-12 pointer-events-none" style={{ top: '35%', right: '5%' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const PolaroidCard = ({ card, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const rotation = index % 2 === 0 ? "rotate-2" : "-rotate-2";

    return (
        <div
            className={`w-64 sm:w-[300px] h-[380px] sm:h-[420px] animate-fade-in relative transition-all duration-500 ${isFlipped ? `z-30 scale-105 md:scale-125 rotate-0 shadow-[0_20px_50px_rgba(0,0,0,0.4)]` : `z-10 hover:scale-[1.03] hover:rotate-0 hover:z-20 ${rotation}`}`}
            style={{ animationDelay: `${index * 150}ms` }}
        >
            <div className="card-wrapper w-full h-full" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`card-inner relative w-full h-full cursor-pointer rounded-sm ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    {/* Front */}
                    <div className="card-face absolute inset-0 bg-vintage-white p-4 sm:p-5 shadow-md border border-vintage-border/50 flex flex-col items-center">
                        <div className="tape"></div>
                        <div className="w-full aspect-square overflow-hidden bg-gray-100 mb-4 relative shrink-0 border-b border-l border-r border-vintage-border/30">
                            <div className="absolute inset-0 bg-vintage-brown/10 mix-blend-multiply z-10 pointer-events-none"></div>
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover sepia-[0.35] hover:sepia-0 transition-all duration-700"
                            />
                        </div>
                        <h3 className="text-3xl sm:text-4xl text-center text-vintage-text font-script mt-auto w-full px-2 truncate leading-normal">
                            {card.title}
                        </h3>
                    </div>
                    {/* Back */}
                    <div className="card-face card-back absolute inset-0 bg-vintage-paper p-6 sm:p-8 shadow-md border border-vintage-border/50 flex flex-col">
                        <div className="tape"></div>
                        <h3 className="text-2xl sm:text-3xl text-center text-vintage-brown font-script mb-4 shrink-0 border-b border-vintage-border/50 pb-2">
                            {card.title}
                        </h3>
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-lg sm:text-xl font-serif italic text-vintage-text/90 leading-relaxed whitespace-pre-wrap mt-2">
                                {card.note}
                            </p>
                        </div>
                        <div className="text-xs sm:text-sm font-script text-vintage-light-brown text-center mt-4 shrink-0">
                            Tap to flip back ↺
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EnvelopeModal = ({ type, onClose }) => {
    const [typedContent, setTypedContent] = useState("");

    let content = "";
    if (type === "blue") {
        content = Array(200).fill("I love you ❤️").join("\n");
    } else if (type === "pink") {
        content = Array(500).fill("😘").join(" ");
    } else if (type === "long-message") {
        content = `Here you can start writing your deeply personal, long message.
        
You can use as many paragraphs as you need. Type out all your memories, feelings, and the reasons why she means so much to you. 

She has waited exactly until her birthday to unlock this, so make it a wonderful read for her! ❤️

(Replace this text with everything you wanted to write in the deeply personal note!)`;
    }

    useEffect(() => {
        if (type !== 'long-message') return;
        setTypedContent('');
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex <= content.length) {
                setTypedContent(content.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 20);

        return () => clearInterval(typingInterval);
    }, [type, content]);

    if (!type) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-vintage-paper max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-vintage-border p-6 md:p-10 relative rounded-sm" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 bg-vintage-white/80 backdrop-blur text-vintage-text w-8 h-8 rounded-full flex items-center justify-center text-xl shadow-md border border-vintage-border hover:bg-vintage-brown hover:text-white transition-colors cursor-pointer z-[60]">
                    ✕
                </button>
                <div className="overflow-y-auto w-full h-full pr-4 mt-6">
                    {type === "long-message" ? (
                        <>
                            <h3 className="text-4xl md:text-5xl font-script text-vintage-brown mb-8 text-center border-b border-vintage-border pb-6">My Dearest,</h3>
                            <p className="text-xl md:text-2xl font-serif text-vintage-text whitespace-pre-wrap leading-relaxed inline-block">
                                {typedContent}
                                <span className="animate-pulse ml-1 text-vintage-brown">|</span>
                            </p>
                            {typedContent.length >= content.length && (
                                <div className="mt-12 text-right animate-fade-in">
                                    <p className="text-3xl font-script text-vintage-brown">With all my love,</p>
                                    <p className="text-2xl font-script text-vintage-text mt-2">Yours forever</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-2xl font-serif text-vintage-text whitespace-pre-wrap leading-loose text-center">
                            {content}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

const Envelope = ({ type, onClick }) => (
    <div
        onClick={onClick}
        className="relative w-40 h-28 bg-vintage-white border border-vintage-border shadow-md cursor-pointer hover:-translate-y-2 transition-transform duration-300 flex items-center justify-center rounded-sm mx-auto"
    >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-t-[56px] border-t-vintage-light-brown border-r-[80px] border-r-transparent border-l-[80px] border-l-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none border-b-[56px] border-b-vintage-paper border-r-[80px] border-r-transparent border-l-[80px] border-l-transparent"></div>

        <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Heart
                fill={type === "blue" ? "#3b82f6" : "#ec4899"}
                color={type === "blue" ? "#2563eb" : "#db2777"}
                size={32}
            />
        </div>
    </div>
);

const LockedGiftBox = ({ isBirthday, onClick }) => (
    <div
        onClick={isBirthday ? onClick : undefined}
        className={`relative w-48 h-48 md:w-56 md:h-56 bg-vintage-paper rounded-xl border-4 border-vintage-border shadow-2xl flex items-center justify-center mx-auto transition-all duration-500 transform ${!isBirthday ? 'cursor-not-allowed opacity-90' : 'cursor-pointer hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-4'}`}
    >
        {/* Box Lid styling */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-vintage-light-brown rounded-t-lg border-b-4 border-vintage-border/50 overflow-hidden">
            {/* Box lid ribbon */}
            <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-vintage-text opacity-10"></div>
        </div>

        {/* Box base ribbon */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-8 h-2/3 bg-vintage-text opacity-10 z-0"></div>

        <div className="absolute z-10 flex flex-col items-center gap-3 w-full">
            {!isBirthday ? (
                <>
                    <div className="w-16 h-16 bg-vintage-white rounded-full flex items-center justify-center shadow-md border border-vintage-border mb-2">
                        <Lock size={32} className="text-vintage-brown opacity-80" />
                    </div>
                    <span className="font-script text-xl md:text-2xl text-vintage-brown font-bold tracking-widest px-4 py-1.5 bg-vintage-white/95 rounded-full border border-vintage-border shadow-sm whitespace-nowrap">Sealed until April 28</span>
                </>
            ) : (
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-20 h-20 bg-vintage-white rounded-full flex items-center justify-center shadow-lg border-2 border-red-200 group-hover:border-red-400 transition-colors">
                        <Heart size={40} fill="#dc2626" color="#991b1b" className="animate-bounce" />
                    </div>
                    <span className="font-script text-2xl text-vintage-brown bg-vintage-white/95 px-6 py-2 rounded-full border border-vintage-border shadow-md transform group-hover:scale-110 transition-transform">Unlock Magic! ✨</span>
                </div>
            )}
        </div>
    </div>
);

const SecretMessageBox = () => {
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    if (sent) {
        return (
            <div className="max-w-md mx-auto p-8 bg-vintage-white border border-vintage-border shadow-md rounded-sm text-center animate-fade-in relative">
                <Heart className="mx-auto text-red-500 mb-4 animate-bounce" fill="currentColor" size={48} />
                <h3 className="text-3xl font-script text-vintage-brown mb-2">Saved to my heart! ❤️</h3>
                <p className="text-lg font-serif italic text-vintage-text/80">
                    Take a screenshot of what you wrote and send it to me on WhatsApp so I can read it! (Since this website is just for us and doesn't save text anywhere).
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto p-6 md:p-8 bg-vintage-white border border-vintage-border shadow-md rounded-sm relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-vintage-brown"></div>
            <div className="flex items-center gap-3 mb-6">
                <Send className="text-vintage-brown" size={24} />
                <h3 className="text-3xl font-script text-vintage-brown">A message for me...</h3>
            </div>
            <p className="text-lg font-serif italic text-vintage-text/80 mb-4">
                Since you've seen everything, do you have something to tell me?
            </p>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your thoughts here..."
                className="w-full h-32 bg-transparent border-2 border-vintage-light-brown focus:border-vintage-brown rounded-sm p-4 font-serif text-lg text-vintage-text outline-none resize-none mb-4 transition-colors"
            ></textarea>
            <button
                onClick={() => message.trim() && setSent(true)}
                className={`w-full py-3 rounded-sm font-serif italic text-xl transition-all shadow-md flex items-center justify-center gap-2
                    ${message.trim()
                        ? 'bg-vintage-brown text-white hover:bg-vintage-text hover:-translate-y-1 hover:shadow-lg cursor-pointer'
                        : 'bg-vintage-border text-vintage-text/50 cursor-not-allowed'
                    }`}
            >
                Send Secretly ✨
            </button>
        </div>
    )
}


const FloatAnimation = () => (
    <style>
        {`
        @keyframes floatUpFade {
            0% { transform: translateY(0) scale(0.5); opacity: 1; }
            100% { transform: translateY(-80px) scale(1.5); opacity: 0; }
        }
        .float-animation {
            animation: floatUpFade 1.2s forwards ease-out;
        }
        @keyframes expandFade {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes exitFade {
            0% { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
        }
        .greeting-enter {
            animation: expandFade 1s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .greeting-exit {
            animation: exitFade 1s forwards ease-in;
            animation-delay: 2.5s; 
        }

        /* Camera Flash Effect */
        @keyframes cameraFlash {
            0% { background-color: rgba(255, 255, 255, 0); }
            10% { background-color: rgba(255, 255, 255, 1); }
            20% { background-color: rgba(255, 255, 255, 1); }
            100% { background-color: rgba(255, 255, 255, 0); }
        }
        .camera-flash {
            animation: cameraFlash 1.5s ease-out forwards;
        }
        @keyframes polaroidSlideDown {
            0% { transform: translateY(-10vh); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        .polaroid-slide-down {
            animation: polaroidSlideDown 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Moon Secret Expand animation */
        @keyframes expandBounce {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-expand-bounce {
            animation: expandBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        `}
    </style>
);

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2026-04-28T00:00:00") - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (timeLeft[interval] === undefined) return null;
        return (
            <div key={interval} className="flex flex-col items-center mx-2 md:mx-4 bg-vintage-white p-4 md:p-6 shadow-md border border-vintage-border rounded-sm w-20 md:w-28">
                <span className="text-3xl md:text-5xl font-serif text-vintage-brown mb-2">{timeLeft[interval]}</span>
                <span className="text-sm md:text-lg font-script text-vintage-light-brown capitalize">{interval}</span>
            </div>
        );
    });

    return (
        <div className="flex justify-center flex-wrap gap-4 mt-8 w-full max-w-4xl">
            {timerComponents.length ? timerComponents : <span className="text-4xl font-script text-vintage-brown">Happy Birthday!! 🎈</span>}
        </div>
    );
};





const ConstellationPuzzle = () => {
    const [activeStars, setActiveStars] = useState([]);
    const stars = [
        { id: 1, x: 50, y: 80 },  // Bottom point
        { id: 2, x: 25, y: 55 },  // Mid left
        { id: 3, x: 15, y: 35 },  // Top left
        { id: 4, x: 35, y: 20 },  // Inner top left
        { id: 5, x: 50, y: 35 },  // Center dip
        { id: 6, x: 65, y: 20 },  // Inner top right
        { id: 7, x: 85, y: 35 },  // Top right
        { id: 8, x: 75, y: 55 },  // Mid right
    ];

    const handleStarClick = (id) => {
        if (!activeStars.includes(id)) {
            // Require clicking in order (1 -> 8)
            if (id === 1 || activeStars.includes(id - 1)) {
                setActiveStars([...activeStars, id]);
            }
        }
    };

    const isComplete = activeStars.length === stars.length;

    return (
        <div className="flex flex-col items-center w-full my-16 px-6">
            <h3 className="text-3xl md:text-4xl italic text-vintage-text mb-4 text-center">Connect The Stars ✨</h3>
            <p className="text-lg font-serif italic text-vintage-text/80 mb-8 max-w-md text-center">
                A tiny midnight puzzle just for you. Follow the numbers and connect the dots.
            </p>
            <div className="relative w-full max-w-lg aspect-[4/3] bg-vintage-paper rounded-md border-[6px] border-vintage-border overflow-hidden shadow-inner select-none cursor-crosshair mx-auto">
                <div className="absolute inset-0 bg-[#0f152e] opacity-95 transition-opacity duration-700 pointer-events-none"></div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {activeStars.map((starId, index) => {
                        if (index === 0) return null;
                        const prevStar = stars.find(s => s.id === activeStars[index - 1]);
                        const currStar = stars.find(s => s.id === starId);
                        return (
                            <line
                                key={`line-${starId}`}
                                x1={`${prevStar.x}%`} y1={`${prevStar.y}%`}
                                x2={`${currStar.x}%`} y2={`${currStar.y}%`}
                                stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4"
                                className="animate-fade-in"
                            />
                        );
                    })}
                    {isComplete && (
                        <line
                            x1={`${stars.find(s => s.id === 8).x}%`}
                            y1={`${stars.find(s => s.id === 8).y}%`}
                            x2={`${stars.find(s => s.id === 1).x}%`}
                            y2={`${stars.find(s => s.id === 1).y}%`}
                            stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4"
                            className="animate-fade-in"
                        />
                    )}
                </svg>
                {stars.map(star => {
                    const isActive = activeStars.includes(star.id);
                    const isNext = star.id === 1 ? activeStars.length === 0 : (activeStars.includes(star.id - 1) && !isActive);

                    return (
                        <div
                            key={star.id}
                            onClick={() => handleStarClick(star.id)}
                            className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full cursor-pointer z-10 flex flex-col items-center justify-center group pointer-events-auto`}
                            style={{ left: `${star.x}%`, top: `${star.y}%` }}
                        >
                            {(!isActive) && (
                                <span className={`text-[12px] font-script mb-1 transition-all duration-300 ${isNext ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] scale-110' : 'text-white/40'}`}>
                                    {star.id}
                                </span>
                            )}
                            <div className={`w-3 h-3 rounded-full transition-all duration-300
                                ${isActive ? 'bg-[#ffed4a] shadow-[0_0_20px_#ffed4a] scale-[1.7]'
                                    : isNext ? 'bg-white/90 shadow-[0_0_15px_#fff] scale-125 animate-pulse'
                                        : 'bg-white/40 group-hover:bg-white/70 group-hover:scale-110'}
                            `}></div>
                        </div>
                    );
                })}

                {isComplete && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#0f152e]/80 backdrop-blur-[2px] animate-fade-in z-20 transition-all duration-1000">
                        <Heart fill="#ec4899" color="#db2777" size={40} className="mb-6 animate-bounce" />
                        <p className="text-[#e2e8f0] font-script text-xl md:text-2xl text-center leading-relaxed drop-shadow-md lg:py-4 px-2 tracking-wide">
                            "youre my best friend and i woulndt be here without you idk . i wouldve been a mess if you werent around a youre a part of my life now and im just glad that youre still with me . I love you more"
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

const App = () => {
    const [selectedEnvelope, setSelectedEnvelope] = useState(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const [password, setPassword] = useState("");
    const [noClicks, setNoClicks] = useState(0);
    const [yesClicked, setYesClicked] = useState(false);
    const [showFinalKiss, setShowFinalKiss] = useState(false);
    const [clicks, setClicks] = useState([]);

    const [isMidnight, setIsMidnight] = useState(false);
    const [moonClicks, setMoonClicks] = useState(0);
    const [showMoonSecret, setShowMoonSecret] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    // Countdown check for locked envelope
    const checkBirthday = () => +new Date("2026-04-28T00:00:00") - +new Date() <= 0;
    const [isBirthday, setIsBirthday] = useState(checkBirthday());

    useEffect(() => {
        const timer = setInterval(() => {
            setIsBirthday(checkBirthday());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (isMidnight) {
            document.documentElement.classList.add('theme-midnight');
        } else {
            document.documentElement.classList.remove('theme-midnight');
        }
    }, [isMidnight]);

    const handleScreenClick = (e) => {
        const types = ['heart', 'kiss_face', 'kiss_mark'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const newClick = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            type: randomType
        };
        setClicks(prev => [...prev, newClick]);
        setTimeout(() => {
            setClicks(prev => prev.filter(click => click.id !== newClick.id));
        }, 1200);
    };



    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedCard(null);
                setSelectedEnvelope(null);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!isUnlocked) {
        return (
            <div className="min-h-screen bg-vintage-bg flex items-center justify-center p-6 text-vintage-text font-serif relative">
                <button
                    onClick={() => setIsMidnight(!isMidnight)}
                    className="absolute top-6 right-6 p-3 rounded-full bg-vintage-white border border-vintage-border shadow-md text-vintage-brown hover:scale-110 transition-transform cursor-pointer"
                >
                    {isMidnight ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <div className="max-w-md w-full text-center space-y-6 bg-vintage-white p-8 md:p-12 border border-vintage-border shadow-2xl rounded-sm relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-vintage-brown"></div>
                    <h2 className="text-5xl font-script text-vintage-brown mb-4">Secret Question 👀</h2>
                    <p className="text-xl md:text-2xl italic text-vintage-text/80 leading-relaxed mb-6 font-serif">
                        To enter this highly confidential space, answer me this:<br /><br />
                        "If you want to get in, what do I always ask for?"
                    </p>
                    <div className="pt-4">
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Type answer here..."
                            className="w-full text-center border-b-2 border-vintage-light-brown focus:border-vintage-brown outline-none bg-transparent py-2 text-3xl font-script text-vintage-brown placeholder-vintage-light-brown/50"
                            onKeyDown={(e) => {
                                const ans = password.toLowerCase().trim();
                                if (e.key === 'Enter' && (ans === 'kiss' || ans === '💋')) {
                                    setIsUnlocked(true);
                                    setShowFlash(true);
                                    setShowGreeting(true);
                                    setTimeout(() => setShowGreeting(false), 3500);
                                    setTimeout(() => setShowFlash(false), 2000);
                                }
                            }}
                        />
                    </div>
                    {(() => {
                        const ans = password.toLowerCase().trim();
                        return (ans !== 'kiss' && ans !== '💋' && password.length > 2) ? (
                            <p className="text-sm text-red-400 mt-2 font-serif italic">Nope... try again!</p>
                        ) : null;
                    })()}
                    <button
                        onClick={() => {
                            const ans = password.toLowerCase().trim();
                            if (ans === 'kiss' || ans === '💋') {
                                setIsUnlocked(true);
                                setShowFlash(true);
                                setShowGreeting(true);
                                setTimeout(() => setShowGreeting(false), 3500);
                                setTimeout(() => setShowFlash(false), 2000);
                            }
                        }}
                        className="mt-10 bg-vintage-brown text-white px-8 py-3 rounded-sm shadow hover:bg-vintage-text transition-colors font-serif italic text-xl cursor-pointer"
                    >
                        Unlock Magic 🗝️
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen bg-vintage-bg text-vintage-text relative overflow-x-hidden font-serif transition-colors duration-500 ${showFlash ? 'polaroid-slide-down' : ''}`}
            onClick={handleScreenClick}
        >
            {showFlash && <div className="fixed inset-0 z-[150] bg-white camera-flash pointer-events-none"></div>}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMidnight(!isMidnight);
                }}
                className="fixed top-6 right-6 z-[60] p-3 rounded-full bg-vintage-white border border-vintage-border shadow-md text-vintage-brown hover:scale-110 transition-transform cursor-pointer"
            >
                {isMidnight ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            {showGreeting && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-vintage-bg greeting-exit">
                    <div className="greeting-enter text-center px-4">
                        <h1 className="text-7xl md:text-9xl font-script text-vintage-brown mb-6 drop-shadow-sm">
                            Happy Birthday Thango 💋
                        </h1>
                        <p className="text-3xl md:text-4xl italic text-vintage-text/80 font-serif">
                            You're in... ✨
                        </p>
                    </div>
                </div>
            )}

            <FloatAnimation />
            {showMoonSecret && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowMoonSecret(false)}>
                    <div className="bg-[#0f152e] p-8 md:p-12 border border-vintage-light-brown shadow-[0_0_50px_rgba(255,255,255,0.1)] rounded-sm text-center max-w-md animate-expand-bounce relative overflow-hidden m-4" onClick={e => e.stopPropagation()}>
                        <Moon className="absolute top-[-30px] right-[-30px] text-white/5 opacity-50" size={150} />
                        <h3 className="text-4xl md:text-5xl font-script text-white mb-6 mt-2 relative z-10 drop-shadow-md">You found the secret! 🌠</h3>
                        <p className="text-xl font-serif italic text-white/90 leading-relaxed relative z-10 mb-8 whitespace-pre-wrap">
                            {moonSecretMessage}
                        </p>
                        <Heart fill="#ec4899" color="#db2777" size={40} className="mx-auto mb-6 relative z-10 animate-pulse" />
                        <button onClick={() => setShowMoonSecret(false)} className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-sm text-white font-serif transition-colors relative z-10 hover:scale-105 transform cursor-pointer">
                            Close 🌙
                        </button>
                    </div>
                </div>
            )}

            {clicks.map(click => (
                <div
                    key={click.id}
                    className="fixed pointer-events-none z-50 float-animation text-3xl"
                    style={{ left: click.x - 12, top: click.y - 12 }}
                >
                    {click.type === 'heart' && <Heart fill="#ec4899" color="#db2777" size={28} />}
                    {click.type === 'kiss_face' && <span>😘</span>}
                    {click.type === 'kiss_mark' && <span>💋</span>}
                </div>
            ))}

            <StarOutline />
            <HeartOutline />

            {/* Header Intro */}
            <header className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-center animate-fade-in relative z-10 flex flex-col items-center">
                {isMidnight && (
                    <>
                        {/* Decorative hidden moon trigger */}
                        <div
                            className="absolute top-10 left-10 md:top-20 md:left-20 z-[40] cursor-pointer transition-all duration-300 hover:scale-110"
                            style={{
                                opacity: 0.7 + (moonClicks * 0.05),
                                filter: `drop-shadow(0 0 ${15 + (moonClicks * 10)}px ${moonClicks === 0 ? 'rgba(255,255,255,0.4)' :
                                        moonClicks === 1 ? 'rgba(254, 240, 138, 0.5)' :
                                            moonClicks === 2 ? 'rgba(253, 224, 71, 0.6)' :
                                                moonClicks === 3 ? 'rgba(250, 204, 21, 0.8)' :
                                                    'rgba(234, 179, 8, 1)'
                                    })`
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                const newClicks = moonClicks + 1;
                                setMoonClicks(newClicks);
                                if (newClicks >= 5) {
                                    setShowMoonSecret(true);
                                    setTimeout(() => setMoonClicks(0), 500); // Reset after showing
                                }
                            }}
                            title="A lonely moon..."
                        >
                            <Moon
                                fill={
                                    moonClicks === 0 ? '#e2e8f0' :
                                        moonClicks === 1 ? '#fef08a' :
                                            moonClicks === 2 ? '#fde047' :
                                                moonClicks === 3 ? '#facc15' :
                                                    '#eab308'
                                }
                                color={
                                    moonClicks === 0 ? '#e2e8f0' :
                                        moonClicks === 1 ? '#fef08a' :
                                            moonClicks === 2 ? '#fde047' :
                                                moonClicks === 3 ? '#facc15' :
                                                    '#eab308'
                                }
                                size={70}
                                className="animate-pulse transition-colors duration-500"
                            />
                        </div>
                    </>
                )}

                <div className="flex items-center justify-center gap-6 mb-8 w-full max-w-xs mx-auto">
                    <div className="h-px bg-vintage-light-brown flex-1"></div>
                    <span className="font-script text-2xl text-vintage-brown whitespace-nowrap">April 28, 2026</span>
                    <div className="h-px bg-vintage-light-brown flex-1"></div>
                </div>

                <h1 className="text-6xl md:text-8xl mb-8 leading-tight text-vintage-text font-serif">
                    Happy Birthday,<br />
                    <span className="italic text-vintage-brown font-serif block mt-2">Best Friend.</span>
                </h1>

                <div className="flex justify-center mb-8">
                    <div className="h-px bg-vintage-border w-24"></div>
                </div>

                <p className="text-xl md:text-2xl text-vintage-text/80 italic max-w-2xl mx-auto leading-relaxed">
                    I know this is too soon to wish you for your birthday, but the thing is, I just wanted to wish you in person and to see your reaction IRL this time. I had to put some deep effort into this. I don't do this for anyone, but maybe you are special.
                </p>
                <img src="/assets/img/extra1.jpg" alt="cute drawing" className="mt-12 w-48 rounded-lg shadow-sm border border-vintage-border transform rotate-2 mx-auto" />
            </header>

            {/* Captured Moments */}
            <section className="max-w-6xl mx-auto px-6 py-20 animate-fade-in relative z-10" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-16 ml-4 md:ml-12">
                    <Camera className="text-vintage-brown" strokeWidth={1.5} size={28} />
                    <h2 className="text-3xl italic text-vintage-brown">Captured Moments</h2>
                </div>

                <div className="flex flex-wrap justify-center gap-10 md:gap-x-12 md:gap-y-16">
                    {cardsData.map((card, index) => (
                        <PolaroidCard key={card.id} card={card} index={index} />
                    ))}
                </div>
            </section>

            {/* Horizontal Divider */}
            <div className="max-w-4xl mx-auto h-px bg-vintage-border my-8"></div>

            {/* How It All Started Section */}
            <section className="max-w-4xl mx-auto px-6 py-24 animate-fade-in relative z-10" style={{ animationDelay: '400ms' }}>

                <div className="text-center mb-20 relative">
                    <h2 className="text-5xl md:text-6xl mb-4 text-vintage-text italic">How It All Started</h2>
                    <p className="font-script text-3xl text-vintage-brown">Tracing back the steps of our story...</p>
                    <img src="/assets/img/extra2.jpg" alt="petting head" className="w-40 mx-auto mt-8 rounded-sm shadow border border-vintage-border -rotate-3" />
                </div>

                <div className="relative max-w-2xl mx-auto flex flex-col items-center">
                    <div className="absolute left-1/2 md:left-24 top-0 bottom-0 w-px bg-vintage-light-brown/60 -translate-x-1/2 md:translate-x-0"></div>

                    <div className="w-full space-y-20">
                        {timelineData.map((item, i) => (
                            <div key={i} className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 w-full">

                                <div className="shrink-0 w-12 h-12 rounded-full border border-vintage-light-brown shadow-sm bg-vintage-paper flex items-center justify-center text-vintage-brown z-10 relative md:ml-[72px]">
                                    {item.icon}
                                </div>

                                <div className="text-center md:text-left flex-1 md:mt-2">
                                    <p className="text-2xl italic text-vintage-text/90 leading-relaxed font-serif max-w-md">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Full Screen Impact Image */}
            <section className="w-full mx-auto px-0 md:px-6 py-16 animate-fade-in relative z-10" style={{ animationDelay: '500ms' }}>
                <div className="w-full flex justify-center max-w-7xl mx-auto">
                    <img src="/assets/img/extra4.jpg" alt="kissing quote" className="w-full max-h-[85vh] object-cover md:object-contain rounded-none md:rounded-lg shadow-xl border-y-2 md:border-2 border-vintage-border/50 sepia-[0.1]" />
                </div>
            </section>

            {/* Horizontal Divider */}
            <div className="max-w-4xl mx-auto h-px bg-vintage-border my-8"></div>

            {/* Personal Notes Section */}
            <section className="max-w-5xl mx-auto px-6 py-24 animate-fade-in relative z-10" style={{ animationDelay: '600ms' }}>

                <div className="text-center mb-16">
                    <Heart className="mx-auto text-vintage-brown mb-5" strokeWidth={1.5} size={32} />
                    <h2 className="text-5xl md:text-6xl mb-4 italic text-vintage-text">Personal Notes</h2>
                    <p className="font-script text-3xl text-vintage-light-brown">A few words from the heart</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-10 w-full max-w-5xl mx-auto">
                    {notesData.map((note, i) => (
                        <div key={i} className="bg-vintage-white p-12 lg:p-16 shadow-sm border border-vintage-border/30 relative transform hover:-translate-y-1 transition duration-500">
                            <p className="font-script text-[1.8rem] leading-relaxed text-vintage-text mb-8">"{note.text}"</p>
                            <p className="font-script text-2xl text-vintage-light-brown text-right">— {note.author}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Countdown Section */}
            <section className="max-w-4xl mx-auto px-6 py-20 animate-fade-in relative z-10 flex flex-col items-center text-center" style={{ animationDelay: '700ms' }}>
                <h2 className="text-4xl md:text-5xl mb-6 italic text-vintage-text">The Countdown Begins...</h2>
                <p className="font-script text-3xl text-vintage-light-brown mb-4">Until the most special day 🎂</p>
                <CountdownTimer />

                <div className="mt-24 w-full flex flex-col items-center">
                    <h3 className="text-3xl md:text-4xl italic text-vintage-text mb-4">A Special Message for April 28</h3>
                    <p className="text-xl text-vintage-text/80 italic font-serif max-w-lg mb-10 leading-relaxed">
                        Don't forget to open this on your birthday... 🤫
                    </p>
                    <LockedGiftBox isBirthday={isBirthday} onClick={() => setSelectedEnvelope("long-message")} />
                </div>
            </section>

            {/* Horizontal Divider */}
            <div className="max-w-4xl mx-auto h-px bg-vintage-border my-8"></div>

            {/* Added Sections (Constellation) - Only in Midnight Mode */}
            {isMidnight && (
                <>
                    <section className="animate-fade-in relative z-10" style={{ animationDelay: '750ms' }}>
                        <ConstellationPuzzle />
                    </section>

                    {/* Horizontal Divider */}
                    <div className="max-w-4xl mx-auto h-px bg-vintage-border my-8"></div>
                </>
            )}

            {/* The Surprise Section */}
            <section className="max-w-4xl mx-auto px-6 pb-32 animate-fade-in relative z-10 text-center" style={{ animationDelay: '800ms' }}>

                <div className="flex flex-col items-center justify-center my-20 gap-8">
                    {sizeUpWords.map((word, i) => (
                        <div key={i}
                            className="bg-vintage-white border text-vintage-brown border-vintage-border shadow-sm transform hover:scale-105 transition-transform"
                            style={{
                                fontSize: `${1.5 + i * 0.6}rem`,
                                padding: `${0.5 + i * 0.2}rem ${1.5 + i * 0.4}rem`,
                                rotate: `${i % 2 === 0 ? '-2deg' : '2deg'}`,
                            }}>
                            <span className="font-script">{word}</span>
                        </div>
                    ))}
                </div>

                <p className="text-3xl font-serif italic text-vintage-text mb-12 max-w-2xl mx-auto leading-relaxed">
                    i know you hate em when repeated too many ties but i will repeat it for as long as i wish even if you hate it
                </p>

                <p className="text-2xl font-script text-vintage-brown mb-8 animate-bounce">
                    (Go ahead, open them...)
                </p>

                <div className="flex justify-center flex-wrap items-center gap-16 md:gap-32">
                    <Envelope type="blue" onClick={() => setSelectedEnvelope("blue")} />
                    <Envelope type="pink" onClick={() => setSelectedEnvelope("pink")} />
                </div>
            </section>

            <EnvelopeModal type={selectedEnvelope} onClose={() => setSelectedEnvelope(null)} />

            {/* The Kiss Section */}
            <div className="max-w-4xl mx-auto h-px bg-vintage-border my-8"></div>

            <section className="max-w-4xl mx-auto px-6 pb-32 animate-fade-in relative z-10 text-center flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl mb-8 italic text-vintage-text mt-6">Can I get a kiss? 🥺</h2>

                {showFinalKiss ? (
                    <div className="flex flex-col items-center animate-fade-in px-4">
                        <p className="text-3xl md:text-4xl font-script text-vintage-brown mb-4 drop-shadow-sm leading-relaxed max-w-2xl">
                            I'm sorry I ask for it, but you know I want it more. I just want it, and honestly, I thought we would have kissed already. 💋
                        </p>
                        <Heart fill="#ec4899" color="#db2777" size={56} className="animate-bounce mt-4" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full">
                        {noClicks >= 10 && (
                            <p className="text-2xl md:text-3xl font-script text-vintage-brown mb-10 drop-shadow-sm animate-fade-in">
                                There's no more way to say no, so just say yes, girl! 😭
                            </p>
                        )}

                        <div className="flex justify-center gap-8 relative h-32 w-full items-center mt-4">
                            <div className={`${yesClicked ? 'animate-heartbeat-fast' : ''}`}>
                                <button
                                    onClick={() => {
                                        setYesClicked(true);
                                        setTimeout(() => setShowFinalKiss(true), 1500);
                                    }}
                                    style={{ transform: `scale(${1 + noClicks * 0.15})` }}
                                    className="bg-vintage-brown text-white px-8 py-3 rounded-sm shadow hover:bg-vintage-text transition-all duration-300 font-serif italic text-xl cursor-pointer relative z-20"
                                >
                                    Yes
                                </button>
                            </div>

                            {noClicks < 10 && (
                                <button
                                    onClick={() => setNoClicks(prev => prev + 1)}
                                    className="absolute bg-vintage-white text-vintage-text border border-vintage-border px-8 py-3 rounded-sm shadow hover:bg-vintage-paper transition-all duration-300 font-serif italic text-xl cursor-pointer"
                                    style={{
                                        transform: `scale(${1 - noClicks * 0.1})`,
                                        right: '25%'
                                    }}
                                >
                                    No
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* Secret Message Box Section */}
            <div className="max-w-4xl mx-auto h-px bg-vintage-border my-8"></div>

            <section className="max-w-4xl mx-auto px-6 pb-40 animate-fade-in relative z-10" style={{ animationDelay: '900ms' }}>
                <SecretMessageBox />
            </section>

        </div>
    );
};

export default App;
