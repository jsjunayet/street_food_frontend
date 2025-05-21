const Category = () => {
  return (
    <div>
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-4">
            How StreetGrub Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover, share, and enjoy the best street food experiences around
            you with our simple process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-[#FFFBF1] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6b35] text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Discover Spots</h3>
            <p className="text-gray-600">
              Browse through our curated list of street food spots or search for
              specific cuisines.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-[#FFFBF1] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6B35] text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Rate & Review</h3>
            <p className="text-gray-600">
              Share your experiences by rating and reviewing the spots
              you&apos;ve visited.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-[#FFFBF1] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6B35] text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Share Discoveries</h3>
            <p className="text-gray-600">
              Found a hidden gem? Add new spots to our platform and help others
              discover great food.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
