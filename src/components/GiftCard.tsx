import { useState } from "react";
import { cn } from "@/lib/utils";

interface GiftCardProps {
  icon: string;
  name: string;
  reward: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}

const GiftCard = ({ icon, name, reward, isSelected, isDisabled, onSelect }: GiftCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="perspective-1000">
      <div
        onClick={() => !isDisabled && !isSelected && onSelect()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative w-full h-44 cursor-pointer transition-all duration-700 preserve-3d",
          isSelected && "rotate-y-180",
          isDisabled && !isSelected && "opacity-40 cursor-not-allowed",
          !isDisabled && !isSelected && isHovered && "animate-shake scale-105"
        )}
      >
        {/* Front - Gift Box */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rounded-2xl p-4 flex flex-col items-center justify-center",
            "bg-gradient-to-b from-christmas-red to-secondary border-4 border-gold/50",
            "shadow-lg transition-shadow duration-300",
            isHovered && !isDisabled && "shadow-[0_0_30px_hsl(45_100%_55%/0.5)]"
          )}
        >
          {/* Ribbon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-full bg-gold/80 rounded-sm" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-6 bg-gold/80 rounded-sm" />
          
          {/* Bow */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gold shadow-lg" />
              <div className="absolute -left-4 top-1 w-6 h-4 rounded-full bg-gold -rotate-45" />
              <div className="absolute -right-4 top-1 w-6 h-4 rounded-full bg-gold rotate-45" />
            </div>
          </div>

          {/* Icon preview */}
          <span className="text-5xl mt-6 drop-shadow-lg animate-float">{icon}</span>
          <p className="text-snow font-semibold mt-2 text-sm text-center">{name}</p>
          
          {!isDisabled && (
            <p className="text-gold text-xs mt-1 animate-sparkle">Click to open!</p>
          )}
        </div>

        {/* Back - Revealed Prize */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-4 flex flex-col items-center justify-center",
            "bg-gradient-to-b from-christmas-green to-accent border-4 border-gold",
            isSelected && "animate-reveal-glow"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(45_100%_55%/0.2)_0%,transparent_70%)]" />
          <span className="text-5xl drop-shadow-lg mb-2">🎉</span>
          <span className="text-4xl drop-shadow-lg">{icon}</span>
          <h3 className="text-snow font-display text-xl mt-3 tracking-wide">{name}</h3>
          <p className="text-gold font-bold text-center mt-2 text-sm px-2">{reward}</p>
          <div className="mt-2 px-3 py-1 bg-gold/20 rounded-full">
            <span className="text-snow text-xs font-semibold">CLAIMED!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
