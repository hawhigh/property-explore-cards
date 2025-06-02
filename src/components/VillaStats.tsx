
interface VillaStatsProps {
  bedrooms: number;
  maxGuests: number;
  pricePerNight: number;
  rating: number;
}

const VillaStats = ({ bedrooms, maxGuests, pricePerNight, rating }: VillaStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
      <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{bedrooms}</div>
        <div className="text-sm md:text-base text-gray-600">Bedrooms</div>
      </div>
      <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{maxGuests}</div>
        <div className="text-sm md:text-base text-gray-600">Max Guests</div>
      </div>
      <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">€{pricePerNight}</div>
        <div className="text-sm md:text-base text-gray-600">Per Night</div>
      </div>
      <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{rating}★</div>
        <div className="text-sm md:text-base text-gray-600">Guest Rating</div>
      </div>
    </div>
  );
};

export default VillaStats;
