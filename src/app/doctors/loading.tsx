"use client";


const DoctorLoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="text-center mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="border rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorLoadingSkeleton; 