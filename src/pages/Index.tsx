import { useState } from "react";
import ConfettiEffect from "@/components/ConfettiEffect";
import giftImage from "@/assets/gift-selection.jpg";

const gifts = [
  { id: 1, name: "Gingerbread Man", reward: "$10 Freeplay", top: "52%", left: "12%", width: "18%", height: "14%" },
  { id: 2, name: "Candy Cane", reward: "$5 Add-on Next Deposit", top: "62%", left: "72%", width: "16%", height: "14%" },
  { id: 3, name: "Hot CoCo", reward: "$15 Add-on Next Deposit", top: "68%", left: "8%", width: "18%", height: "14%" },
  { id: 4, name: "Santa Hat", reward: "25% Match on Next Deposit", top: "22%", left: "72%", width: "18%", height: "14%" },
  { id: 5, name: "Snowman", reward: "$5 Freeplay", top: "48%", left: "72%", width: "16%", height: "14%" },
  { id: 6, name: "Christmas Tree", reward: "$3 Freeplay", top: "24%", left: "8%", width: "18%", height: "16%" },
  { id: 7, name: "The Flash", reward: "50% Bonus on Next Deposit", top: "32%", left: "30%", width: "40%", height: "45%" },
];

const Index = () => {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoveredGift, setHoveredGift] = useState<number | null>(null);

  const handleSelectGift = (id: number) => {
    if (selectedGift === null) {
      setSelectedGift(id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const selectedGiftData = gifts.find(g => g.id === selectedGift);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Confetti */}
      {showConfetti && <ConfettiEffect />}

      {/* Instruction */}
      <p className="text-muted-foreground mb-4 text-center text-lg">
        {selectedGift === null 
          ? "Tap a gift to reveal your prize! You can only pick ONE! 🎁" 
          : ""}
      </p>

      {/* Main Image Container */}
      <div className="relative w-full max-w-lg mx-auto">
        <img 
          src={giftImage} 
          alt="Instant Gaming - Pick Your Gift" 
          className="w-full h-auto rounded-2xl shadow-2xl"
        />

        {/* Clickable Hotspots */}
        {gifts.map((gift) => {
          const isSelected = selectedGift === gift.id;
          const isDisabled = selectedGift !== null && selectedGift !== gift.id;
          const isHovered = hoveredGift === gift.id;

          return (
            <button
              key={gift.id}
              onClick={() => !isDisabled && handleSelectGift(gift.id)}
              onMouseEnter={() => setHoveredGift(gift.id)}
              onMouseLeave={() => setHoveredGift(null)}
              disabled={isDisabled}
              className={`absolute rounded-full transition-all duration-300 ${
                isDisabled 
                  ? "opacity-30 cursor-not-allowed" 
                  : isSelected
                    ? "ring-4 ring-gold bg-gold/30 animate-pulse"
                    : isHovered
                      ? "bg-gold/40 ring-2 ring-gold scale-110 cursor-pointer"
                      : "bg-transparent hover:bg-gold/20 cursor-pointer"
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
            className="absolute z-20 bg-card/95 backdrop-blur-sm border border-gold rounded-lg px-3 py-2 pointer-events-none shadow-lg"
            style={{
              top: `calc(${gifts.find(g => g.id === hoveredGift)?.top} - 12%)`,
              left: gifts.find(g => g.id === hoveredGift)?.left,
              transform: "translateX(-10%)",
            }}
          >
            <p className="text-gold font-bold text-sm">{gifts.find(g => g.id === hoveredGift)?.name}</p>
            <p className="text-snow text-xs">Click to reveal!</p>
          </div>
        )}
      </div>

      {/* Selected Prize Banner */}
      {selectedGiftData && (
        <div className="mt-8 text-center animate-fade-in">
          <div className="inline-block bg-card/90 backdrop-blur-sm border-2 border-gold rounded-2xl px-8 py-6 shadow-[0_0_40px_hsl(45_100%_55%/0.3)]">
            <p className="text-muted-foreground text-sm mb-2">🎉 You selected</p>
            <h3 className="font-display text-2xl md:text-3xl text-gold tracking-wide">
              {selectedGiftData.name}
            </h3>
            <p className="text-snow text-xl font-bold mt-2">{selectedGiftData.reward}</p>
            <p className="text-muted-foreground text-sm mt-4">
              Present this to claim your reward! 🎄
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
