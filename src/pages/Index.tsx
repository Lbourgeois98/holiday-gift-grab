import { useState } from "react";
import ConfettiEffect from "@/components/ConfettiEffect";
import giftImage from "@/assets/gift-selection.jpg";

const gifts = [
  { id: 1, name: "Gingerbread Man", reward: "$10 Freeplay", top: "50%", left: "5%", width: "20%", height: "12%" },
  { id: 2, name: "Candy Cane", reward: "$5 Add-on Next Deposit", top: "58%", left: "75%", width: "20%", height: "15%" },
  { id: 3, name: "Hot CoCo", reward: "$15 Add-on Next Deposit", top: "65%", left: "5%", width: "20%", height: "15%" },
  { id: 4, name: "Santa Hat", reward: "25% Match on Next Deposit", top: "18%", left: "72%", width: "22%", height: "15%" },
  { id: 5, name: "Snowman", reward: "$5 Freeplay", top: "42%", left: "75%", width: "20%", height: "14%" },
  { id: 6, name: "Christmas Tree", reward: "$3 Freeplay", top: "22%", left: "3%", width: "22%", height: "18%" },
  { id: 7, name: "The Flash", reward: "50% Bonus on Next Deposit", top: "28%", left: "25%", width: "50%", height: "50%" },
];

const LightningBolt = ({ style }: { style: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    className="absolute w-12 h-12 md:w-16 md:h-16 text-gold animate-lightning drop-shadow-[0_0_15px_hsl(45_100%_55%)]"
    style={style}
    fill="currentColor"
  >
    <path d="M13 0L0 14h9v10l13-14h-9z" />
  </svg>
);

const Index = () => {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoveredGift, setHoveredGift] = useState<number | null>(null);
  const [lightningPos, setLightningPos] = useState<{ top: string; left: string } | null>(null);

  const handleSelectGift = (id: number, top: string, left: string) => {
    if (selectedGift === null) {
      setSelectedGift(id);
      setLightningPos({ top, left });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const selectedGiftData = gifts.find(g => g.id === selectedGift);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Confetti */}
      {showConfetti && <ConfettiEffect />}

      {/* Instruction */}
      <p className="text-muted-foreground mb-2 sm:mb-4 text-center text-sm sm:text-base md:text-lg px-2">
        {selectedGift === null 
          ? "Tap a gift to reveal your prize! You can only pick ONE! 🎁" 
          : ""}
      </p>

      {/* Main Image Container - responsive sizing */}
      <div className="relative w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-lg lg:max-w-xl mx-auto">
        <img 
          src={giftImage} 
          alt="Instant Gaming - Pick Your Gift" 
          className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl"
        />

        {/* Lightning Bolt Effect */}
        {lightningPos && (
          <LightningBolt 
            style={{ 
              top: lightningPos.top, 
              left: lightningPos.left,
              transform: "translate(-50%, -50%)",
            }} 
          />
        )}

        {/* Clickable Hotspots */}
        {gifts.map((gift) => {
          const isSelected = selectedGift === gift.id;
          const isDisabled = selectedGift !== null && selectedGift !== gift.id;
          const isHovered = hoveredGift === gift.id;

          return (
            <button
              key={gift.id}
              onClick={() => !isDisabled && handleSelectGift(gift.id, gift.top, gift.left)}
              onMouseEnter={() => setHoveredGift(gift.id)}
              onMouseLeave={() => setHoveredGift(null)}
              disabled={isDisabled}
              className={`absolute rounded-full transition-all duration-300 ${
                isDisabled 
                  ? "opacity-20 cursor-not-allowed" 
                  : isSelected
                    ? "bg-transparent"
                    : isHovered
                      ? "bg-ice-blue/30 shadow-[0_0_20px_hsl(195_100%_70%/0.6)] scale-110 cursor-pointer"
                      : "bg-transparent hover:bg-ice-blue/20 cursor-pointer"
              }`}
              style={{
                top: gift.top,
                left: gift.left,
                width: gift.width,
                height: gift.height,
              }}
              aria-label={`Select ${gift.name}`}
            />
          );
        })}

        {/* Hover Tooltip */}
        {hoveredGift && selectedGift === null && (
          <div 
            className="absolute z-20 bg-card/95 backdrop-blur-sm border border-gold rounded-lg px-2 py-1 sm:px-3 sm:py-2 pointer-events-none shadow-lg whitespace-nowrap"
            style={{
              top: `calc(${gifts.find(g => g.id === hoveredGift)?.top} - 10%)`,
              left: gifts.find(g => g.id === hoveredGift)?.left,
              transform: "translateX(-10%)",
            }}
          >
            <p className="text-gold font-bold text-xs sm:text-sm">{gifts.find(g => g.id === hoveredGift)?.name}</p>
            <p className="text-snow text-[10px] sm:text-xs">Click to reveal!</p>
          </div>
        )}
      </div>

      {/* Selected Prize Banner */}
      {selectedGiftData && (
        <div className="mt-4 sm:mt-6 md:mt-8 text-center px-2 w-full max-w-md animate-fade-in">
          <div className="bg-card/90 backdrop-blur-sm border-2 border-gold rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 shadow-[0_0_40px_hsl(45_100%_55%/0.3)]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl sm:text-2xl">⚡</span>
              <p className="text-muted-foreground text-xs sm:text-sm">You selected</p>
              <span className="text-xl sm:text-2xl">⚡</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-gold tracking-wide">
              {selectedGiftData.name}
            </h3>
            <p className="text-snow text-lg sm:text-xl font-bold mt-2">{selectedGiftData.reward}</p>
            <p className="text-muted-foreground text-xs sm:text-sm mt-3 sm:mt-4">
              Present this to claim your reward! 🎄
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
