import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Brain, Target, Compass, Sparkles, Sliders, Users, Flame, Info, Check, Play, HelpCircle } from "lucide-react";

// Social icons matching UI design
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MessageSquare } from "lucide-react";

interface ShivikaProfileProps {
  onStartJourney: () => void;
}

export default function ShivikaProfile({ onStartJourney }: ShivikaProfileProps) {
  // Booking trivia states
  const [activeTriviaQuestion, setActiveTriviaQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [triviaFinished, setTriviaFinished] = useState(false);
  const [isPlayingTrivia, setIsPlayingTrivia] = useState(false);

  const triviaQuestions = [
    {
      q: "Which piece can move in any number of vacant squares in a straight line or diagonally?",
      options: ["King", "Rook", "Queen", "Bishop"],
      correct: 2,
      explanation: "The Queen is the most powerful piece in chess, combining the powers of the Rook and Bishop!"
    },
    {
      q: "What is it called when a player cannot make any legal moves and their king is NOT in check?",
      options: ["Checkmate", "Stalemate", "Draw by Repetition", "Resignation"],
      correct: 1,
      explanation: "A Stalemate results in an immediate draw, saving many difficult endgame positions!"
    },
    {
      q: "In what year was the famous Légal's Mate first played in Paris?",
      options: ["1750", "1850", "1920", "2001"],
      correct: 0,
      explanation: "Kermur Sire de Légal played this beautiful 7-move queen sacrifice around 1750!"
    }
  ];

  const handleAnswerSelect = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowFeedback(true);
    if (idx === triviaQuestions[activeTriviaQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (activeTriviaQuestion < triviaQuestions.length - 1) {
      setActiveTriviaQuestion(activeTriviaQuestion + 1);
    } else {
      setTriviaFinished(true);
    }
  };

  const restartTrivia = () => {
    setActiveTriviaQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setTriviaFinished(false);
    setIsPlayingTrivia(true);
  };

  return (
    <section id="academy-profile" className="relative max-w-7xl mx-auto py-24 px-6 md:px-16 lg:px-20 z-10 border-b border-white/5 space-y-28 select-none text-left">
      
      {/* SECTION B: WELCOME TO SHIVIKA ROHILLA CHESS ACADEMY (SRCA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Editorial Context & Story */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs md:text-sm font-body text-gold font-semibold tracking-[0.25em] uppercase block">
            We transform you into a skilled professional
          </span>
          
          <h2 className="font-heading italic text-white text-4xl md:text-6xl leading-[0.95] tracking-[-2px] mb-4">
            WELCOME TO SHIVIKA ROHILLA CHESS ACADEMY (SRCA) !
          </h2>
          
          <div className="space-y-4 font-body font-light text-sm md:text-base text-white/80 leading-relaxed max-w-xl">
            <p>
              SRCA was founded with a vision to provide everything related to chess under one roof—from professional coaching and tournaments to corporate workshops and team-building events.
            </p>
            <p>
              Our goal is to nurture talent, inspire passion, and build a thriving chess community in Delhi. By combining expertise, innovation, and dedication, we aim to create a legacy of chess in Delhi, empowering players of all ages to achieve excellence on and off the board.
            </p>
            <p className="font-medium text-white/95">
              Join us to learn, grow, and become part of a movement that's redefining chess culture in India!
            </p>
            <p className="italic text-gold border-l-2 border-gold/40 pl-4 py-1 text-sm bg-gold/5 max-w-lg rounded-r-lg">
              "Chess is more than a game; it's a journey of growth, strategy, and endless possibilities."
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/60 mt-1.5 not-italic">
                - WIM Shivika Rohilla
              </span>
            </p>
          </div>
        </div>

        {/* Right Side: Angled Photograph Layout */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden group bg-gradient-to-b from-[#1a1711] via-[#0a0a0a] to-[#12110d] clay-card">
            
            {/* The Image itself with high artistic values */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-[2] pointer-events-none" />
            <img
              src="/ChatGPT_Image_May_21__2026__11_38_34_PM-removebg-preview.png"
              alt="WIM Shivika Rohilla"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto h-[90%] max-w-full object-contain origin-bottom group-hover:scale-[1.03] transition-transform duration-1000 z-[1]"
              referrerPolicy="no-referrer"
            />

            {/* Custom abstract background chess shapes for premium touch */}
            <div className="absolute inset-0 pointer-events-none z-[1] opacity-35 bg-transparent" />
            
            {/* Floating Top-Right Instagram Logo Link Component */}
            <a
              href="https://www.instagram.com/shivikarohillaofficial?utm_source=qr&igsh=MWh3bmUxMTZpaGFzeg=="
              target="_blank"
              rel="noreferrer"
              className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black hover:scale-110 active:scale-95 transition-all text-white shadow-xl z-10 cursor-pointer"
              title="Follow WIM Shivika Rohilla on Instagram"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            {/* Floating Banner Label: WIM Shivika Rohilla */}
            <div className="absolute bottom-6 left-6 right-6 z-[3] flex flex-col items-start gap-3">
              <div className="bg-black/90 border border-white/10 backdrop-blur-md rounded-2xl p-5 w-full shadow-2xl">
                <span className="text-[10px] text-gold font-body uppercase tracking-[0.2em] font-semibold block mb-1">
                  Founder & Head Coach
                </span>
                <h4 className="font-heading italic text-white text-2xl leading-none">
                  WIM Shivika Rohilla
                </h4>
                <p className="text-xs text-white/50 mt-1 font-body">
                  Woman International Master | India's Leading Female Trainer
                </p>
                
                {/* Action Trigger inside the Photo Box - Stylized clay-btn-gold */}
                <button
                  onClick={onStartJourney}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-body font-bold transition-all cursor-pointer scale-100 active:scale-95 clay-btn-gold"
                >
                  <Flame className="w-4 h-4 fill-current animate-pulse text-black" />
                  <span>START YOUR JOURNEY</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION A: SIDE-BY-SIDE STATS, TRIVIA & MENTAL TEST MODULE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-stretch">
        
        {/* Left Side Section: Stress Trivia (Mental toughness) - col-span-6 */}
        <div className="lg:col-span-6 liquid-glass border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-gold/15 transition-colors relative overflow-hidden bg-gradient-to-br from-white/[0.01] to-transparent">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-400 bg-amber-400/5 border border-amber-400/20 font-body uppercase tracking-wider">
                Stress Trivia
              </span>
            </div>
            
            <h3 className="font-heading italic text-white text-3xl md:text-5xl leading-none tracking-tight">
              Inspire Strength, <br />Empower Success
            </h3>

            <p className="font-body font-light text-xs md:text-sm text-white/80 leading-relaxed">
              At SRCA, we believe true success comes from a balance of mental strength, resilience, and emotional well-being. The **Stress Test** isn't about pushing limits—it's about unlocking potential and preparing for challenges with confidence and clarity.
            </p>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold text-white/55 uppercase tracking-wide">
                Our expert sports psychologist plays a vital role in this journey, helping players:
              </p>
              <ul className="space-y-3 font-body font-light text-xs md:text-sm text-white/75">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>Build mental toughness and focus under pressure.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>Develop strategies to handle stress in high-stakes situations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>Cultivate a positive mindset for success on and off the board.</span>
                </li>
              </ul>
            </div>

            <p className="font-body font-light text-xs text-white/50 leading-relaxed pt-2">
              Whether you're a player striving to perform at your best or a parent ensuring your child's growth, we recommend experiencing the Stress Test to inspire strength and empower success. Join us at SRCA to unlock a brighter, balanced future!
            </p>
          </div>

          {/* Parents / Children Dynamic Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={onStartJourney}
              className="flex-1 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gold hover:bg-gold/90 text-black shadow-lg shadow-gold/5 cursor-pointer text-center select-none duration-200"
            >
              FOR PARENTS
            </button>
            <button
              onClick={onStartJourney}
              className="flex-1 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider border border-white/20 hover:border-gold hover:text-gold text-white bg-white/2 hover:bg-gold/5 cursor-pointer text-center select-none duration-200"
            >
              FOR CHILDREN
            </button>
          </div>
        </div>

        {/* Right Side Section: Live Chess Trivia Block - col-span-5 */}
        <div className="lg:col-span-5 liquid-glass-strong border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-gold/5 to-transparent">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-gold bg-gold/5 border border-gold/20 font-body uppercase tracking-wider">
                Chess Trivia
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Live Challenge Available" />
            </div>

            <h3 className="font-heading italic text-white text-3xl md:text-4xl leading-tight tracking-tight">
              Chess Trivia: Outsmart, Checkmate, and Win Big!
            </h3>

            <p className="font-body font-light text-xs md:text-sm text-white/70 leading-relaxed">
              Dive into the world of chess with the Shivika Rohilla Chess Academy (SRCA) Trivia Challenge! Unlock exclusive discounts on our freshers, beginners, and related chess programs while sharpening your skills. fun facts, expert insights, and rewards await!
            </p>

            {/* NEAT DYNAMIC STATS INSIDE */}
            <div className="grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4 my-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gold/10 rounded-xl">
                  <Flame className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white tracking-tight">148.2K</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block">Chess Sessions</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 rounded-xl">
                  <Users className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white tracking-tight">3085+</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block">Online Enrollment</span>
                </div>
              </div>
            </div>

            {/* DYNAMIC INTERACTIVE GAME COMPONENT */}
            <div className="border border-white/5 bg-black/40 rounded-2xl p-4 relative min-h-[140px] flex flex-col justify-between">
              {!isPlayingTrivia ? (
                <div className="text-center py-4 space-y-3">
                  <HelpCircle className="w-8 h-8 text-gold/60 mx-auto animate-bounce" />
                  <p className="text-xs font-semibold text-white/90">
                    Crack the Chess Code: Solve Trivia, Score Discounts!
                  </p>
                  <p className="text-[10px] text-white/50 font-light px-4">
                    Solve our quick master trivia to verify tactical reflexes.
                  </p>
                  <button
                    onClick={() => setIsPlayingTrivia(true)}
                    className="mt-2 text-[10px] font-semibold text-gold hover:underline flex items-center gap-1 mx-auto cursor-pointer"
                  >
                    Play Trivia, Win Discounts!
                  </button>
                </div>
              ) : triviaFinished ? (
                <div className="text-center py-4 space-y-3">
                  <span className="text-[10px] uppercase text-gold tracking-widest font-semibold block">★ Challenge Completed ★</span>
                  <p className="text-sm font-semibold text-white">
                    You Scored: <span className="text-gold text-lg font-bold">{score}/{triviaQuestions.length}</span>
                  </p>
                  <p className="text-xs text-white/60">
                    Show this scorecard during evaluation to receive extra enroll tokens!
                  </p>
                  <div className="flex gap-2 justify-center pt-2">
                    <button
                      onClick={onStartJourney}
                      className="px-4 py-2 bg-gold text-black rounded-lg text-[10px] font-bold cursor-pointer"
                    >
                      Redeem Discount
                    </button>
                    <button
                      onClick={restartTrivia}
                      className="px-4 py-2 border border-white/20 rounded-lg text-[10px] cursor-pointer text-white"
                    >
                      Play Again
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Trivia Step Slider */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-semibold">
                      Question {activeTriviaQuestion + 1} of {triviaQuestions.length}
                    </span>
                    <span className="text-[10px] text-gold font-bold font-mono">Score: {score}</span>
                  </div>
                  
                  <p className="text-xs font-medium text-white/95 leading-normal">
                    {triviaQuestions[activeTriviaQuestion].q}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {triviaQuestions[activeTriviaQuestion].options.map((opt, i) => {
                      let btnBg = "bg-white/5 border-white/5";
                      if (selectedAnswer !== null) {
                        if (i === triviaQuestions[activeTriviaQuestion].correct) {
                          btnBg = "bg-emerald-400/20 border-emerald-400/40 text-emerald-400";
                        } else if (i === selectedAnswer) {
                          btnBg = "bg-rose-500/20 border-rose-500/40 text-rose-500";
                        } else {
                          btnBg = "bg-white/1 border-white/2 opacity-30";
                        }
                      }
                      return (
                        <button
                          key={i}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleAnswerSelect(i)}
                          className={`px-3 py-2 border rounded-xl text-[11px] font-medium text-left cursor-pointer transition-all ${btnBg}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showFeedback && (
                    <div className="space-y-3 border-t border-white/5 pt-3">
                      <p className="text-[10px] text-white/60 leading-relaxed italic">
                        {triviaQuestions[activeTriviaQuestion].explanation}
                      </p>
                      <button
                        onClick={nextQuestion}
                        className="w-full py-1.5 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg text-[10px] font-semibold transition-all cursor-pointer"
                      >
                        {activeTriviaQuestion === triviaQuestions.length - 1 ? "Finish Trivia" : "Next Tactician Step"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={restartTrivia}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-body font-semibold bg-gold hover:bg-gold/90 text-black shadow-lg shadow-gold/5 transition-all mt-6 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START CHESS TRIVIA</span>
          </button>
        </div>

        {/* Far Right Corner element: Circular social media dock - col-span-1 */}
        <div className="lg:col-span-1 flex lg:flex-col justify-center items-center gap-4 py-4 md:py-0 border-t lg:border-t-0 lg:border-l border-white/5">
          <span className="hidden lg:block text-[9px] uppercase tracking-[0.3em] font-semibold text-white/30 vertical-text py-2">
            Socials Connect
          </span>
          
          <a
            href="https://www.facebook.com/profile.php?id=61559885038853"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center hover:scale-110 hover:-translate-y-1 text-black shadow-lg shadow-gold/5 transition-all cursor-pointer"
            title="Facebook"
          >
            <Facebook className="w-5 h-5 fill-current text-current" />
          </a>

          <a
            href="https://x.com/ChessShivi46473?t=T63X2qFgay2WqroAs7amsw&s=09"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center hover:scale-110 hover:-translate-y-1 text-black shadow-lg shadow-gold/5 transition-all cursor-pointer"
            title="Twitter / X"
          >
            <Twitter className="w-5 h-5 fill-current text-current" />
          </a>

          <a
            href="https://www.instagram.com/shivikarohillaofficial?utm_source=qr&igsh=MWh3bmUxMTZpaGFzeg=="
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center hover:scale-110 hover:-translate-y-1 text-black shadow-lg shadow-gold/5 transition-all cursor-pointer"
            title="Instagram"
          >
            <Instagram className="w-5 h-5 text-black" />
          </a>

          <a
            href="https://www.linkedin.com/company/sr-chess-academy/"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center hover:scale-110 hover:-translate-y-1 text-black shadow-lg shadow-gold/5 transition-all cursor-pointer"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5 fill-current text-current" />
          </a>

          <a
            href="https://youtu.be/39wamHswcB8"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center hover:scale-110 hover:-translate-y-1 text-black shadow-lg shadow-gold/5 transition-all cursor-pointer"
            title="YouTube"
          >
            <Youtube className="w-5 h-5 text-black" />
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=917042854007"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center hover:scale-110 hover:-translate-y-1 text-black shadow-lg shadow-gold/5 transition-all cursor-pointer"
            title="WhatsApp"
          >
            <MessageSquare className="w-5 h-5 fill-current text-current" />
          </a>
        </div>
        
      </div>
      
    </section>
  );
}
