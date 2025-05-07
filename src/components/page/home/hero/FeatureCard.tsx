import Image from "next/image";
import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  imageUrl,
  delay,
}) => {
  return (
    <div
      className="feature-card-container"
      style={{
        animationDelay: `${delay * 200}ms`,
        opacity: 0,
        animation: "fadeIn 0.8s ease-out forwards",
        animationDelay: `${delay * 200}ms`,
      }}
    >
      <div className="feature-card h-64 w-full">
        {/* Front of card */}
        <div className="feature-card-face feature-card-front p-6 bg-black/60 backdrop-blur-sm rounded-xl h-full flex flex-col items-center justify-center border border-white/10">
          <div className="animate-pulse-glow bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5">
            <div className="text-white">{icon}</div>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-gray-300 text-center">{description}</p>
        </div>

        {/* Back of card */}
        <div className="feature-card-face feature-card-back h-full rounded-xl overflow-hidden border border-orange-500/50">
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              height={300}
              width={300}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 flex flex-col items-center justify-end p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
              <p className="text-white/90 text-sm bg-black/40 p-2 rounded-lg">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
