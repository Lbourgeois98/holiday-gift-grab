import { useState } from "react";
import GiftCard from "@/components/GiftCard";
import Snowflake from "@/components/Snowflake";
import ConfettiEffect from "@/components/ConfettiEffect";

const gifts = [
  { id: 1, icon: "🧑‍🍳", name: "Gingerbread Man", reward: "$10 Freeplay" },
  { id: 2, icon: "🍬", name: "Candy Cane", reward: "$5 Add-on Next Deposit" },
  { id: 3, icon: "☕", name: "Hot CoCo", reward: "$15 Add-on Next Deposit" },
  { id: 4, icon: "🎅", name: "Santa Hat", reward: "25% Match on Next Deposit" },
  { id: 5, icon: "⛄", name: "Snowman", reward: "$5 Freeplay" },
  { id: 6, icon: "🎄", name: "Christmas Tree", reward: "$3 Freeplay" },
  { id: 7, icon: "⚡", name: "The Flash", reward: "50% Bonus on Next Deposit" },
];

const Index = () => {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSelectGift = (id: number) => {
    if (selectedGift === null) {
      setSelectedGift(id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const selectedGiftData = gifts.find(g => g.id === selectedGift);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,hsl(195_100%_70%/0.1)_0%,transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(200_60%_20%/0.8)_0%,transparent_70%)]" />
      
      {/* Snowflakes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Snowflake key={i} delay={i * 0.5} />
      ))}

      {/* Confetti */}
      {showConfetti && <ConfettiEffect />}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="font-display text-5xl md:text-7xl text-ice-blue text-glow-ice tracking-wider mb-2">
            INSTANT GAMING
          </h1>
          <h2 className="font-display text-3xl md:text-5xl text-gold text-glow-gold tracking-wide">
            PICK YOUR GIFT!
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            {selectedGift === null 
              ? "Choose wisely - you can only pick ONE gift! 🎁" 
              : "Congratulations on your prize! 🎉"}
          </p>
        </header>

        {/* Gift Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {gifts.map((gift) => (
            <GiftCard
              key={gift.id}
              icon={gift.icon}
              name={gift.name}
              reward={gift.reward}
              isSelected={selectedGift === gift.id}
              isDisabled={selectedGift !== null && selectedGift !== gift.id}
              onSelect={() => handleSelectGift(gift.id)}
            />
          ))}
        </div>

        {/* Selected Prize Banner */}
        {selectedGiftData && (
          <div className="mt-10 text-center">
            <div className="inline-block bg-card/80 backdrop-blur-sm border-2 border-gold rounded-2xl px-8 py-6 shadow-[0_0_40px_hsl(45_100%_55%/0.3)]">
              <p className="text-muted-foreground text-sm mb-2">You selected</p>
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

        {/* Footer */}
        <footer className="text-center mt-12 text-muted-foreground text-sm">
          <p>Happy Holidays from Instant Gaming! 🎅⚡</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
