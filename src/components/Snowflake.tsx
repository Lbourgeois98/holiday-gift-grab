import { useEffect, useState } from "react";

interface SnowflakeProps {
  delay: number;
}

const Snowflake = ({ delay }: SnowflakeProps) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle({
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${8 + Math.random() * 6}s`,
      opacity: 0.3 + Math.random() * 0.5,
      fontSize: `${8 + Math.random() * 12}px`,
    });
  }, [delay]);

  return (
    <div
      className="fixed text-snow pointer-events-none animate-snow z-0"
      style={style}
    >
      ❄
    </div>
  );
};

export default Snowflake;
