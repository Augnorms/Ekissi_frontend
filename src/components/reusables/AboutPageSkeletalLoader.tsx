

export const AboutPageSkeletalLoader = () => {
  return (
    <div className="w-full h-[100vh] overflow-auto relative">
      {
        /*background*/
        <div className="w-full h-[100vh] bg-slate-100 flex justify-center items-center">
          <div className="w-[40%] h-screen rounded bg-white"></div>
        </div>
        /*background*/
      }
      <div className="w-full h-screen absolute top-0 z-[5]">
        {/* Placeholder for top section */}
        <div className="w-full h-[45vh] flex">
          <div className="w-[50%] hidden lg:flex justify-center">
            {/* Placeholder for image */}
            <div className="w-[310px] h-[310px] animate-pulse bg-gray-300 rounded-full xl:ml-28"></div>
          </div>

          <div className="lg:w-[50%] flex justify-center">
            <div className="xl:w-[50%] rounded flex items-center justify-center p-5 pt-2 shadow-lg">
              <div>
                {/* Placeholder for text */}
                <div className="animate-pulse mb-5">
                  <div className="h-8 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
                {/* Placeholder for button */}
                <div className="h-10 w-24 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for bottom section */}
        <div className="w-full h-[45vh] flex justify-center p-10">
          <div className="lg:w-[70%] grid sm:grid-cols-1 lg:grid-cols-3 gap-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="p-8 shadow-lg hover:scale-[1.2] cursor-pointer bg-white"
              >
                {/* Placeholder for each card */}
                <div className="animate-pulse mb-4 h-6 bg-gray-300 rounded"></div>
                {/* Placeholder for each card */}
                <div className="animate-pulse h-20 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
