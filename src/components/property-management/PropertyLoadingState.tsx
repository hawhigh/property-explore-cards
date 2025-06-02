
const PropertyLoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
      ))}
    </div>
  );
};

export default PropertyLoadingState;
