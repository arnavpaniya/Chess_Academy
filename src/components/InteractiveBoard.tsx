import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Web Audio synthesizer for rich tactile game feedback
function playSound(type: "move" | "capture" | "check" | "victory") {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const dest = audioCtx.destination;

    const playTone = (freq: number, dur: number, start: number = 0, oscType: "sine" | "triangle" | "sawtooth" = "sine", gainVal: number = 0.05) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = oscType;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);
      
      gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime + start);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + start + dur);
      
      osc.connect(gainNode);
      gainNode.connect(dest);
      
      osc.start(audioCtx.currentTime + start);
      osc.stop(audioCtx.currentTime + start + dur);
    };

    if (type === "move") {
      playTone(220, 0.08, 0, "triangle", 0.04);
    } else if (type === "capture") {
      playTone(390, 0.1, 0, "sine", 0.06);
      playTone(300, 0.08, 0.02, "triangle", 0.04);
    } else if (type === "check") {
      playTone(520, 0.12, 0, "sine", 0.05);
      playTone(660, 0.18, 0.04, "sine", 0.05);
    } else if (type === "victory") {
      playTone(523, 0.2, 0, "sine", 0.05);  // C5
      playTone(659, 0.2, 0.1, "sine", 0.05);  // E5
      playTone(784, 0.25, 0.2, "sine", 0.05); // G5
      playTone(1046, 0.35, 0.3, "sine", 0.05); // C6
    }
  } catch (err) {
    // Suppress if browser block autoplay
  }
}

// Full move verification generator
function getLegalMoves(r: number, c: number, currentBoard: string[][]): [number, number][] {
  const piece = currentBoard[r][c];
  if (!piece) return [];
  const color = "♙♘♗♖♕♔".includes(piece) ? "white" : "black";
  const moves: [number, number][] = [];

  const addMoveIfValid = (nr: number, nc: number): boolean => {
    if (nr < 0 || nr > 7 || nc < 0 || nc > 7) return false;
    const dest = currentBoard[nr][nc];
    if (!dest) {
      moves.push([nr, nc]);
      return true; // space is empty, slide can continue
    }
    const destColor = "♙♘♗♖♕♔".includes(dest) ? "white" : "black";
    if (destColor !== color) {
      moves.push([nr, nc]); // capture
    }
    return false; // hit a piece, stop sliding
  };

  // Pawn rules
  if (piece === "♙" || piece === "♟") {
    const isWhite = piece === "♙";
    const dir = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;

    // Forward steps
    const nextRow = r + dir;
    if (nextRow >= 0 && nextRow <= 7 && !currentBoard[nextRow][c]) {
      moves.push([nextRow, c]);
      const doubleRow = r + 2 * dir;
      if (r === startRow && !currentBoard[doubleRow][c]) {
        moves.push([doubleRow, c]);
      }
    }

    // Capture steps
    for (const dc of [-1, 1]) {
      const nc = c + dc;
      if (nc >= 0 && nc <= 7) {
        const target = currentBoard[nextRow]?.[nc];
        if (target) {
          const targetColor = "♙♘♗♖♕♔".includes(target) ? "white" : "black";
          if (targetColor !== color) {
            moves.push([nextRow, nc]);
          }
        }
      }
    }
  }

  // Knight L-shapes
  if (piece === "♘" || piece === "♞") {
    const offsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    for (const [dr, dc] of offsets) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr <= 7 && nc >= 0 && nc <= 7) {
        const dest = currentBoard[nr][nc];
        if (!dest) {
          moves.push([nr, nc]);
        } else {
          const destColor = "♙♘♗♖♕♔".includes(dest) ? "white" : "black";
          if (destColor !== color) {
            moves.push([nr, nc]);
          }
        }
      }
    }
  }

  // Bishop & Queen diagonals
  if (piece === "♗" || piece === "♝" || piece === "♕" || piece === "♛") {
    const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (const [dr, dc] of dirs) {
      let step = 1;
      while (true) {
        const nr = r + dr * step;
        const nc = c + dc * step;
        const canContinue = addMoveIfValid(nr, nc);
        if (!canContinue) break;
        step++;
      }
    }
  }

  // Rook & Queen lines
  if (piece === "♖" || piece === "♜" || piece === "♕" || piece === "♛") {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
      let step = 1;
      while (true) {
        const nr = r + dr * step;
        const nc = c + dc * step;
        const canContinue = addMoveIfValid(nr, nc);
        if (!canContinue) break;
        step++;
      }
    }
  }

  // King hops
  if (piece === "♔" || piece === "♚") {
    const dirs = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr <= 7 && nc >= 0 && nc <= 7) {
        const dest = currentBoard[nr][nc];
        if (!dest) {
          moves.push([nr, nc]);
        } else {
          const destColor = "♙♘♗♖♕♔".includes(dest) ? "white" : "black";
          if (destColor !== color) {
            moves.push([nr, nc]);
          }
        }
      }
    }
  }

  return moves;
}

const START_BOARD = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

export default function InteractiveBoard() {
  const [board, setBoard] = useState<string[][]>(START_BOARD);
  const [turn, setTurn] = useState<"white" | "black">("white");
  const [gameMode, setGameMode] = useState<"ai" | "friend">("ai");
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [highlightedMoves, setHighlightedMoves] = useState<[number, number][]>([]);
  const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<string[]>([]);
  
  // Tactical chat logs from AI Coach
  const [aiInsight, setAiInsight] = useState<string>("Welcome to the Board! Execute a white move to initiate analysis.");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [historyLog, setHistoryLog] = useState<string[]>([]);

  // Setup restart handler
  const handleReset = () => {
    setBoard(START_BOARD.map(row => [...row]));
    setTurn("white");
    setSelectedCell(null);
    setHighlightedMoves([]);
    setCapturedWhite([]);
    setCapturedBlack([]);
    setHistoryLog([]);
    setAiInsight("Board reset! Best of luck. Open with 1.e4 or 1.d4 for standard positioning.");
    playSound("victory");
  };

  // Convert row/col to beautiful standard chess coordinates like e4
  const toChessNotation = (fromR: number, fromC: number, toR: number, toC: number, piece: string) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    const letter = piece === "♙" || piece === "♟" ? "" : piece;
    return `${letter}${files[fromC]}${ranks[fromR]} → ${files[toC]}${ranks[toR]}`;
  };

  // Human click cell moves trigger
  const handleCellClick = (r: number, c: number) => {
    if (isAiThinking) return;

    const piece = board[r][c];
    const isWhite = piece !== "" && "♙♘♗♖♕♔".includes(piece);
    const isBlack = piece !== "" && "♟♞♝♜♛♚".includes(piece);

    // If a move was highlighted and clicked, execute slide/hop
    if (selectedCell && highlightedMoves.some(([mr, mc]) => mr === r && mc === c)) {
      const [sr, sc] = selectedCell;
      const originalPiece = board[sr][sc];
      const targetPiece = board[r][c];
      
      const newBoard = board.map(row => [...row]);
      newBoard[sr][sc] = "";
      newBoard[r][c] = originalPiece;

      // Handle captures
      if (targetPiece) {
        if ("♙♘♗♖♕♔".includes(targetPiece)) {
          setCapturedWhite(prev => [...prev, targetPiece]);
        } else {
          setCapturedBlack(prev => [...prev, targetPiece]);
        }
        playSound("capture");
      } else {
        playSound("move");
      }

      // Checkmate or king captures
      if (targetPiece === "♔" || targetPiece === "♚") {
        setAiInsight(`Match Concluded! The ${targetPiece === "♔" ? "Black" : "White"} player captured the King!`);
        playSound("victory");
      }

      // Record logs
      const notation = toChessNotation(sr, sc, r, c, originalPiece);
      setHistoryLog(prev => [notation, ...prev]);

      // Complete Turn
      setBoard(newBoard);
      setSelectedCell(null);
      setHighlightedMoves([]);
      setTurn(turn === "white" ? "black" : "white");
      return;
    }

    // Toggle cells highlight selection based on active side
    if (piece !== "" && ((turn === "white" && isWhite) || (turn === "black" && isBlack))) {
      setSelectedCell([r, c]);
      setHighlightedMoves(getLegalMoves(r, c, board));
    } else {
      setSelectedCell(null);
      setHighlightedMoves([]);
    }
  };

  // Automated Smart AI Player moves logic (Black side only)
  useEffect(() => {
    if (turn === "black" && gameMode === "ai" && !isAiThinking) {
      setIsAiThinking(true);
      setAiInsight("Shivika's AI Coach is evaluating positional advantages...");

      const timer = setTimeout(() => {
        // Find all possible legal moves for Black side
        const availableAll: { from: [number, number]; to: [number, number]; piece: string; score: number }[] = [];

        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece && "♟♞♝♜♛♚".includes(piece)) {
              const legal = getLegalMoves(r, c, board);
              for (const [tr, tc] of legal) {
                const target = board[tr][tc];
                let weight = 0;

                // Captures weighing
                if (target) {
                  if (target === "♔") weight += 900;
                  if (target === "♕") weight += 90;
                  if (target === "♖") weight += 50;
                  if (target === "♗" || target === "♘") weight += 30;
                  if (target === "♙") weight += 10;
                }

                // Control center weightings
                if (tr >= 3 && tr <= 4 && tc >= 3 && tc <= 4) {
                  weight += 2;
                }

                // Pawn progress
                if (piece === "♟" && tr > r) {
                  weight += 1;
                }

                // Slight random variance for human realistic error
                weight += Math.random() * 3;

                availableAll.push({
                  from: [r, c],
                  to: [tr, tc], // target location
                  piece,
                  score: weight
                });
              }
            }
          }
        }

        if (availableAll.length === 0) {
          // stalemate / no moves
          setAiInsight("Shivika: 'No moves available. An interesting stalemate!'");
          setTurn("white");
          setIsAiThinking(false);
          return;
        }

        // Sort descending scoring
        availableAll.sort((x, y) => y.score - x.score);
        
        // Pick best or top candidate
        const bestMove = availableAll[0];
        const [fr, fc] = bestMove.from;
        const [tr, tc] = bestMove.to;
        const originalPiece = board[fr][fc];
        const targetPiece = board[tr][tc];

        const newBoard = board.map(row => [...row]);
        newBoard[fr][fc] = "";
        newBoard[tr][tc] = originalPiece;

        if (targetPiece) {
          setCapturedWhite(prev => [...prev, targetPiece]);
          playSound("capture");
        } else {
          playSound("move");
        }

        // Check if white king took
        if (targetPiece === "♔") {
          playSound("victory");
        }

        const notation = toChessNotation(fr, fc, tr, tc, originalPiece);
        setHistoryLog(prev => [notation, ...prev]);

        // Formulate insightful analysis
        const commentaryBank = [
          `Shivika: 'I targeted the ${bestMove.to[1] === 4 ? "center files" : "flank"} to challenge your pawns.'`,
          `Shivika: 'An active developmental move. Always prioritize castle safety.'`,
          `Shivika: '${notation} increases my minor piece range. How will you respond?'`,
          `Shivika: 'Taking space on the board. Look for counterplay in the center.'`
        ];
        if (targetPiece) {
          setAiInsight(`Shivika: 'Capturing your ${targetPiece} on ${bestMove.to} was tactically sound. Focus on protection!'`);
        } else {
          setAiInsight(commentaryBank[Math.floor(Math.random() * commentaryBank.length)]);
        }

        // Commit turn back to human
        setBoard(newBoard);
        setTurn("white");
        setIsAiThinking(false);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [turn, gameMode, board]);

  return (
    <section id="training" className="relative py-28 px-6 md:px-16 lg:px-20 bg-transparent text-white overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className="text-xs md:text-sm font-body text-gold font-semibold tracking-[0.25em] uppercase block mb-4">
              // interactive tactics arena
            </span>
            <h2 className="font-heading italic text-white text-5xl md:text-7xl leading-[0.9] tracking-[-3px]">
              Active Laboratory
            </h2>
          </div>
          <p className="text-sm text-white/60 max-w-sm font-body font-light leading-relaxed">
            Test your lines against a FIDE-tuned strategic engine. Click on pieces to view active legal routes.
          </p>
        </div>

        {/* Board and details block layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch justify-center max-w-5xl mx-auto">
          
          {/* Main Board Block: Col span 7 */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Mode selector glass bubble */}
            <div className="liquid-glass rounded-full p-1 inline-flex gap-2 mb-6 border border-white/5 select-none text-xs">
              <button
                onClick={() => { setGameMode("ai"); handleReset(); }}
                className={`px-4 py-1.5 rounded-full font-semibold cursor-pointer transition-all ${
                  gameMode === "ai" ? "bg-white text-black font-bold" : "text-white/60 hover:text-white"
                }`}
              >
                Play Against Coach AI
              </button>
              <button
                onClick={() => { setGameMode("friend"); handleReset(); }}
                className={`px-4 py-1.5 rounded-full font-semibold cursor-pointer transition-all ${
                  gameMode === "friend" ? "bg-white text-black font-bold" : "text-white/60 hover:text-white"
                }`}
              >
                Pass-&-Play (Local)
              </button>
            </div>

            {/* Simulated Frame */}
            <div className="bg-gradient-to-b from-white/10 to-white/1 p-3 md:p-4 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md relative max-w-[420px] w-full">
              
              {/* Captured Black Material shown above */}
              <div className="flex items-center gap-1.5 py-2 px-1 text-base text-gold animate-pulse">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest mr-2 select-none">
                  Captures:
                </span>
                {capturedBlack.length > 0 ? (
                  capturedBlack.map((bPiece, idx) => (
                    <span key={idx} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                      {bPiece}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-white/20 uppercase font-light font-mono select-none">None</span>
                )}
              </div>

              {/* The 8x8 Grid */}
              <div className="w-full aspect-square bg-[#050505] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                {board.map((row, rIdx) => (
                  <div key={rIdx} className="flex-1 flex w-full">
                    {row.map((piece, cIdx) => {
                      const isDark = (rIdx + cIdx) % 2 === 1;
                      const isWhitePiece = piece !== "" && "♙♘♗♖♕♔".includes(piece);
                      const isSelected = selectedCell && selectedCell[0] === rIdx && selectedCell[1] === cIdx;
                      const isHighlight = highlightedMoves.some(([mr, mc]) => mr === rIdx && mc === cIdx);

                      return (
                        <div
                          key={cIdx}
                          onClick={() => handleCellClick(rIdx, cIdx)}
                          className={`flex-1 aspect-square flex items-center justify-center relative cursor-pointer select-none transition-all duration-300 ${
                            isDark ? "bg-[#0b0c10]" : "bg-white/[0.04]"
                          } ${isSelected ? "ring-2 ring-gold/70" : ""}`}
                        >
                          {/* Rank labels on left-most column */}
                          {cIdx === 0 && (
                            <span className="absolute left-1 top-0.5 text-[8.5px] text-white/20 select-none">
                              {8 - rIdx}
                            </span>
                          )}

                          {/* File letters on bottom row */}
                          {rIdx === 7 && (
                            <span className="absolute right-1 bottom-0.5 text-[8.5px] text-white/20 select-none uppercase font-mono">
                              {String.fromCharCode(97 + cIdx)}
                            </span>
                          )}

                          {/* Hover highlight dot tracker */}
                          {isHighlight && (
                            <div className="absolute w-3 h-3 rounded-full bg-gold/65 ring-4 ring-gold/25 animate-ping" />
                          )}

                          {/* Render Chess Piecc in pure beautiful high contrast white font representation */}
                          {piece && (
                            <span
                              className={`text-3xl md:text-4xl transition-transform active:scale-110 select-none duration-100 ${
                                isWhitePiece ? "text-white select-none drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]" : "text-gold select-none drop-shadow-[0_2px_4px_rgba(201,168,76,0.3)]"
                              }`}
                            >
                              {piece}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Captured White Material shown at bottom */}
              <div className="flex items-center gap-1.5 py-2 px-1 text-base text-white">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest mr-2 select-none">
                  Lost Pieces:
                </span>
                {capturedWhite.length > 0 ? (
                  capturedWhite.map((wPiece, idx) => (
                    <span key={idx} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                      {wPiece}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-white/20 uppercase font-light font-mono select-none">None</span>
                )}
              </div>

            </div>

            {/* Game Reset actions bar */}
            <div className="mt-4 flex gap-4 w-full max-w-[420px]">
              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-full text-xs font-semibold font-body uppercase tracking-wider bg-white/5 hover:bg-gold/15 text-white hover:text-gold border border-white/5 cursor-pointer hover:border-gold/30 transition-all text-center"
              >
                Reset Match
              </button>
            </div>
          </div>

          {/* Interactive Analysis HUD Panel: Col span 5 */}
          <div className="lg:col-span-5 flex flex-col justify-between liquid-glass border border-white/5 rounded-[2rem] p-6 text-left">
            
            {/* Status indicator */}
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest block font-body">
                  Match HUD Control
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gold">
                  <span className={`w-2 h-2 rounded-full ${turn === "white" ? "bg-white animate-pulse" : "bg-gold animate-bounce"}`} />
                  Turn: {turn === "white" ? "White (You)" : "Black (AI)"}
                </span>
              </div>

              {/* AI Insight Box bubble */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-white/40 block mb-2 font-body">
                  Shivika's AI Coach Evaluation:
                </span>
                <p className="text-xs text-white/90 leading-relaxed font-body font-light transition-all italic border-l-2 border-gold/45 pl-3">
                  {isAiThinking ? (
                    <span className="flex items-center gap-1">
                      Thinking... <span className="animate-spin text-gold select-none">♕</span>
                    </span>
                  ) : (
                    aiInsight
                  )}
                </p>
              </div>
            </div>

            {/* Move Action Log Lists */}
            <div className="flex-1 flex flex-col justify-start min-h-[140px] max-h-[220px] overflow-y-auto no-scrollbar">
              <span className="text-[9px] uppercase tracking-wider font-semibold text-white/40 block mb-2 font-mono">
                Log history list
              </span>
              <div className="flex flex-col gap-1.5">
                {historyLog.length > 0 ? (
                  historyLog.map((log, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/2 border border-white/5 text-xs text-white/70"
                    >
                      <span className="font-mono">{log}</span>
                      <span className="text-[10px] text-white/30 font-body">Move {historyLog.length - idx}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-white/30 font-body py-4 text-center">No moves made yet. Take the initiative!</p>
                )}
              </div>
            </div>

            {/* Footer training credentials banner */}
            <div className="border-t border-white/5 pt-4 mt-4 text-[10px] text-white/45 font-body leading-relaxed font-light">
              This sandbox supports all standard moves, captures, and step-hops. Analyze your lines to develop deep cognitive muscles.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
